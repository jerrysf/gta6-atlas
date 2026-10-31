import * as THREE from "three";

// Procedural canvas textures — everything is generated at runtime, no
// external image assets needed.

function rng(seed: number) {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function canvasTex(
  size: number,
  draw: (g: CanvasRenderingContext2D, size: number) => void,
  repeat = 1
): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  draw(g, size);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeat, repeat);
  t.anisotropy = 4;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** Building facade — rows of windows, some warm-lit, a few neon. Top band
 * stays dark so roofs read as rooftops from the air. */
export function facadeTexture(seed: number, base: string): THREE.CanvasTexture {
  const rand = rng(seed);
  return canvasTex(256, (g, S) => {
    g.fillStyle = base;
    g.fillRect(0, 0, S, S);
    // subtle vertical grime
    for (let i = 0; i < 30; i++) {
      g.fillStyle = `rgba(0,0,0,${0.04 + rand() * 0.08})`;
      const w = 4 + rand() * 22;
      g.fillRect(rand() * S, 0, w, S);
    }
    // dark roof band (top 16% of texture = top of face)
    g.fillStyle = "rgba(6,10,16,0.95)";
    g.fillRect(0, 0, S, S * 0.16);
    // window grid
    const cols = 6;
    const rows = 11;
    const cw = S / cols;
    const rh = (S * 0.8) / rows;
    const litColors = ["#ffd9a0", "#fff3d6", "#ffd25a", "#ff9d5a", "#a0e8ff", "#ffb0f0"];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const wx = x * cw + cw * 0.22;
        const wy = S * 0.18 + y * rh + rh * 0.22;
        const ww = cw * 0.56;
        const wh = rh * 0.56;
        const roll = rand();
        if (roll < 0.34) {
          // lit window
          g.fillStyle = litColors[Math.floor(rand() * litColors.length)];
          g.fillRect(wx, wy, ww, wh);
        } else if (roll < 0.5) {
          // dim ambient window
          g.fillStyle = "rgba(140,170,200,0.28)";
          g.fillRect(wx, wy, ww, wh);
        } else {
          // dark window
          g.fillStyle = "rgba(4,8,14,0.9)";
          g.fillRect(wx, wy, ww, wh);
        }
      }
    }
  });
}

/** Noise-mottled ground texture per biome kind. */
export function groundTexture(kind: string): THREE.CanvasTexture {
  const palettes: Record<string, string[]> = {
    city: ["#3a4048", "#333a42", "#424a54", "#2c333b"],
    mainland: ["#33482e", "#2c3f28", "#3d5234", "#29402a", "#4a4136"],
    swamp: ["#243626", "#1d2c1f", "#2e4028", "#22301f", "#1a261c"],
    keys: ["#6b6148", "#5d5440", "#756b50", "#524a38", "#686051"],
    mountain: ["#3d4750", "#333c45", "#46525c", "#2c343c", "#505c68"],
  };
  const pal = palettes[kind] ?? palettes.mainland;
  const rand = rng(kind.length * 7919 + 13);
  return canvasTex(
    256,
    (g, S) => {
      g.fillStyle = pal[0];
      g.fillRect(0, 0, S, S);
      for (let i = 0; i < 900; i++) {
        g.fillStyle = pal[Math.floor(rand() * pal.length)];
        g.globalAlpha = 0.25 + rand() * 0.45;
        const s = 2 + rand() * (kind === "city" ? 9 : 14);
        g.fillRect(rand() * S, rand() * S, s, s * (0.4 + rand()));
      }
      g.globalAlpha = 1;
      // faint block grid for city streets
      if (kind === "city") {
        g.strokeStyle = "rgba(12,16,22,0.55)";
        g.lineWidth = 2;
        for (let i = 0; i <= 4; i++) {
          g.beginPath();
          g.moveTo((S / 4) * i, 0);
          g.lineTo((S / 4) * i, S);
          g.stroke();
          g.beginPath();
          g.moveTo(0, (S / 4) * i);
          g.lineTo(S, (S / 4) * i);
          g.stroke();
        }
      }
    },
    kind === "city" ? 3 : 5
  );
}

/** Water normal map — Sobel normals from value noise. */
export function waterNormalTexture(): THREE.CanvasTexture {
  const S = 256;
  const rand = rng(4242);
  const h = new Float32Array(S * S);
  // octave-ish blob noise
  const blobs: { x: number; y: number; r: number; a: number }[] = [];
  for (let i = 0; i < 260; i++)
    blobs.push({ x: rand() * S, y: rand() * S, r: 8 + rand() * 30, a: rand() * 2 - 1 });
  for (let y = 0; y < S; y++)
    for (let x = 0; x < S; x++) {
      let v = 0;
      for (const b of blobs) {
        const dx = Math.min(Math.abs(x - b.x), S - Math.abs(x - b.x));
        const dy = Math.min(Math.abs(y - b.y), S - Math.abs(y - b.y));
        const d = Math.hypot(dx, dy);
        if (d < b.r) v += b.a * (1 - d / b.r);
      }
      h[y * S + x] = v;
    }
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const g = c.getContext("2d")!;
  const img = g.createImageData(S, S);
  for (let y = 0; y < S; y++)
    for (let x = 0; x < S; x++) {
      const xm = (x - 1 + S) % S;
      const xp = (x + 1) % S;
      const ym = (y - 1 + S) % S;
      const yp = (y + 1) % S;
      const dx = h[y * S + xp] - h[y * S + xm];
      const dy = h[yp * S + x] - h[ym * S + x];
      const inv = 1 / Math.hypot(dx * 2.4, dy * 2.4, 1);
      const i = (y * S + x) * 4;
      img.data[i] = (-dx * 2.4 * inv * 0.5 + 0.5) * 255;
      img.data[i + 1] = (-dy * 2.4 * inv * 0.5 + 0.5) * 255;
      img.data[i + 2] = inv * 255;
      img.data[i + 3] = 255;
    }
  g.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(9, 9);
  return t;
}

/** Vertical sky gradient dome — dusk over Leonida. */
export function makeSkyMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: {
      top: { value: new THREE.Color("#0a1830") },
      mid: { value: new THREE.Color("#1d2a4a") },
      horizon: { value: new THREE.Color("#4a3560") },
      glow: { value: new THREE.Color("#ff8a5a") },
      sunDir: { value: new THREE.Vector3(0.55, 0.18, -0.42).normalize() },
    },
    vertexShader: /* glsl */ `
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vDir;
      uniform vec3 top; uniform vec3 mid; uniform vec3 horizon; uniform vec3 glow;
      uniform vec3 sunDir;
      void main() {
        float h = clamp(vDir.y, -0.12, 1.0);
        vec3 col = mix(horizon, mid, smoothstep(0.0, 0.32, h));
        col = mix(col, top, smoothstep(0.3, 0.9, h));
        float sun = pow(max(dot(normalize(vDir), sunDir), 0.0), 18.0);
        col += glow * sun * 0.85;
        float band = exp(-abs(vDir.y) * 9.0);
        col += glow * band * 0.22;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
}

/** Soft radial glow sprite (sun / haze). */
export function glowTexture(inner: string, outer: string): THREE.CanvasTexture {
  return canvasTex(128, (g, S) => {
    const grd = g.createRadialGradient(S / 2, S / 2, 2, S / 2, S / 2, S / 2);
    grd.addColorStop(0, inner);
    grd.addColorStop(0.35, inner);
    grd.addColorStop(1, outer);
    g.fillStyle = grd;
    g.fillRect(0, 0, S, S);
  });
}

/** Fluffy cloud sprite. */
export function cloudTexture(seed: number): THREE.CanvasTexture {
  const rand = rng(seed);
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 128;
  const g = c.getContext("2d")!;
  for (let i = 0; i < 22; i++) {
    const x = 40 + rand() * 176;
    const y = 50 + rand() * 40;
    const r = 14 + rand() * 30;
    const grd = g.createRadialGradient(x, y, 1, x, y, r);
    grd.addColorStop(0, `rgba(210,220,240,${0.16 + rand() * 0.2})`);
    grd.addColorStop(1, "rgba(210,220,240,0)");
    g.fillStyle = grd;
    g.fillRect(x - r, y - r, r * 2, r * 2);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** Palm frond crown — crossed alpha planes read as a palm from any angle. */
export function frondTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  g.translate(64, 64);
  const rand = rng(99);
  for (let f = 0; f < 7; f++) {
    const a = (f / 7) * Math.PI * 2 + rand() * 0.4;
    g.save();
    g.rotate(a);
    for (let s = 0; s < 9; s++) {
      const t = s / 9;
      g.strokeStyle = `rgba(${40 + t * 60},${110 + t * 40},${50 + t * 40},${0.9 - t * 0.4})`;
      g.lineWidth = 3.5 * (1 - t * 0.7);
      g.beginPath();
      g.moveTo(0, 0);
      g.quadraticCurveTo(t * 58, -6 - t * 14, t * 62, 10 + t * 22);
      g.stroke();
    }
    g.restore();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** Asphalt road strip with center dashes. */
export function roadTexture(): THREE.CanvasTexture {
  const t = canvasTex(128, (g, S) => {
    g.fillStyle = "#14181f";
    g.fillRect(0, 0, S, S);
    const rand = rng(7);
    for (let i = 0; i < 120; i++) {
      g.fillStyle = `rgba(255,255,255,${rand() * 0.03})`;
      g.fillRect(rand() * S, rand() * S, 2, 2);
    }
    g.fillStyle = "rgba(230,200,120,0.85)";
    g.fillRect(S / 2 - 2, 0, 4, S * 0.45);
    g.fillRect(S / 2 - 2, S * 0.55, 4, S * 0.45);
  });
  t.repeat.set(1, 10);
  return t;
}
