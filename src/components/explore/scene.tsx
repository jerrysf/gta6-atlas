"use client";

/* eslint-disable react-hooks/immutability -- imperative Three.js updates inside useFrame/effects are the R3F model */

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import {
  exploreIslands,
  explorePois,
  exploreRings,
  exploreStashes,
  terrainHeight,
} from "@/data/explore";
import {
  cloudTexture,
  facadeTexture,
  frondTexture,
  glowTexture,
  groundTexture,
  makeSkyMaterial,
  roadTexture,
  waterNormalTexture,
} from "@/components/explore/textures";

/* ---------- helpers ---------- */

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeLabelTexture(text: string, found: boolean): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 96;
  const g = c.getContext("2d")!;
  g.fillStyle = "rgba(4,10,18,0.72)";
  const r = 20;
  g.beginPath();
  g.roundRect(6, 10, 500, 76, r);
  g.fill();
  g.strokeStyle = found ? "#B6F34A" : "rgba(140,170,220,0.5)";
  g.lineWidth = 3;
  g.stroke();
  g.font = "600 40px system-ui, sans-serif";
  g.fillStyle = found ? "#B6F34A" : "#dfe9ff";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText(found ? `✓ ${text}` : text, 256, 50, 480);
  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 4;
  return tex;
}

const ISLAND_COLORS: Record<string, { top: string; side: string }> = {
  city: { top: "#2c3540", side: "#1a222c" },
  mainland: { top: "#2a3a2c", side: "#18251b" },
  swamp: { top: "#243526", side: "#15211a" },
  keys: { top: "#4a4636", side: "#2c291f" },
  mountain: { top: "#333d46", side: "#1e262d" },
};

/* ---------- terrain ---------- */

const islandTopMats = new Map<string, THREE.MeshStandardMaterial>();

function ScaledIslands() {
  return (
    <group>
      {exploreIslands.map((isl) => {
        const col = ISLAND_COLORS[isl.kind];
        let mat = islandTopMats.get(isl.kind);
        if (!mat) {
          mat = new THREE.MeshStandardMaterial({
            map: groundTexture(isl.kind),
            roughness: 0.92,
          });
          islandTopMats.set(isl.kind, mat);
        }
        return (
          <group
            key={isl.id}
            position={[isl.cx, 0, isl.cz]}
            scale={[isl.rx, 1, isl.rz]}
          >
            <mesh position={[0, isl.y / 2 - 0.4, 0]}>
              <cylinderGeometry args={[1, 1.06, isl.y + 1, 56]} />
              <meshStandardMaterial color={col.side} roughness={0.95} />
            </mesh>
            <mesh
              position={[0, isl.y + 0.08, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              material={mat}
            >
              <circleGeometry args={[0.985, 56]} />
            </mesh>
          </group>
        );
      })}
      {/* Mount Kalaga peak */}
      <mesh position={[-175, 3, -400]}>
        <coneGeometry args={[68, 58, 40]} />
        <meshStandardMaterial color="#3a4a55" roughness={0.9} />
      </mesh>
      <mesh position={[-175, 48, -400]}>
        <coneGeometry args={[24, 26, 32]} />
        <meshStandardMaterial color="#5c707e" roughness={0.85} />
      </mesh>
    </group>
  );
}

/* ---------- water & sky ---------- */

function Ocean() {
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const normalMap = useMemo(() => waterNormalTexture(), []);
  useFrame((st) => {
    normalMap.offset.x = (st.clock.elapsedTime * 0.012) % 1;
    normalMap.offset.y = (st.clock.elapsedTime * 0.009) % 1;
  });
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[2600, 2600]} />
      <meshStandardMaterial
        ref={mat}
        color="#16405c"
        roughness={0.12}
        metalness={0.72}
        normalMap={normalMap}
        normalScale={new THREE.Vector2(0.65, 0.65)}
      />
    </mesh>
  );
}

/* ---------- city buildings ---------- */

function insideIsland(
  x: number,
  z: number,
  isl: { cx: number; cz: number; rx: number; rz: number },
  margin = 1
) {
  const dx = (x - isl.cx) / (isl.rx * margin);
  const dz = (z - isl.cz) / (isl.rz * margin);
  return dx * dx + dz * dz < 1;
}

const facadeMats = new Map<string, THREE.MeshStandardMaterial>();
function facadeMat(color: string) {
  let m = facadeMats.get(color);
  if (!m) {
    const tex = facadeTexture(31 + facadeMats.size * 97, color);
    m = new THREE.MeshStandardMaterial({
      map: tex,
      emissiveMap: tex,
      emissive: new THREE.Color("#ffffff"),
      emissiveIntensity: 0.9,
      roughness: 0.7,
      metalness: 0.2,
    });
    facadeMats.set(color, m);
  }
  return m;
}

function CityBlocks() {
  const groups = useMemo(() => {
    const rng = mulberry32(2026);
    const perMat = new Map<string, [number, number, number, number, number][]>();
    const tones = ["#232b38", "#2b3446", "#1d2531", "#34304a", "#223040", "#2a2f3a"];
    const counts: Record<string, number> = {
      city: 240, mainland: 55, keys: 10, swamp: 6, mountain: 0,
    };
    for (const isl of exploreIslands) {
      const n = counts[isl.kind] ?? 0;
      if (n <= 0) continue;
      for (let i = 0; i < n; i++) {
        const a = rng() * Math.PI * 2;
        const d = Math.sqrt(rng()) * 0.82;
        const x = isl.cx + Math.cos(a) * isl.rx * d;
        const z = isl.cz + Math.sin(a) * isl.rz * d;
        const h =
          isl.kind === "city"
            ? 7 + rng() * rng() * 30
            : isl.kind === "mainland"
              ? 4 + rng() * 9
              : 3 + rng() * 5;
        const w = 2.4 + rng() * 4.4;
        const key = tones[Math.floor(rng() * tones.length)];
        const arr = perMat.get(key) ?? [];
        arr.push([x, isl.y + h / 2, z, w, h]);
        perMat.set(key, arr);
      }
    }
    return [...perMat.entries()];
  }, []);

  const refs = useRef<(THREE.InstancedMesh | null)[]>([]);
  const capRefs = useRef<(THREE.InstancedMesh | null)[]>([]);
  useEffect(() => {
    const m4 = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const up = new THREE.Vector3(0, 1, 0);
    groups.forEach(([, arr], gi) => {
      const mesh = refs.current[gi];
      const caps = capRefs.current[gi];
      arr.forEach(([x, y, z, w, h], i) => {
        const yaw = (i * 1.3) % Math.PI;
        q.setFromAxisAngle(up, yaw);
        m4.compose(
          new THREE.Vector3(x, y, z),
          q,
          new THREE.Vector3(w, h, w * (0.7 + ((i * 7) % 10) / 16))
        );
        mesh?.setMatrixAt(i, m4);
        // dark roof cap slab
        m4.compose(
          new THREE.Vector3(x, y + h / 2 + 0.18, z),
          q,
          new THREE.Vector3(w * 1.03, 0.36, w * (0.7 + ((i * 7) % 10) / 16) * 1.03)
        );
        caps?.setMatrixAt(i, m4);
      });
      if (mesh) mesh.instanceMatrix.needsUpdate = true;
      if (caps) caps.instanceMatrix.needsUpdate = true;
    });
  }, [groups]);

  return (
    <group>
      {groups.map(([tone, arr], gi) => (
        <group key={tone}>
          <instancedMesh
            ref={(m) => {
              refs.current[gi] = m;
            }}
            args={[undefined, undefined, arr.length]}
            material={facadeMat(tone)}
          >
            <boxGeometry args={[1, 1, 1]} />
          </instancedMesh>
          <instancedMesh
            ref={(m) => {
              capRefs.current[gi] = m;
            }}
            args={[undefined, undefined, arr.length]}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#0c1017" roughness={0.95} />
          </instancedMesh>
        </group>
      ))}
    </group>
  );
}

/* ---------- vegetation ---------- */

function Vegetation() {
  const trunks = useRef<THREE.InstancedMesh>(null);
  const crowns = useRef<(THREE.InstancedMesh | null)[]>([null, null, null]);
  const frond = useMemo(() => frondTexture(), []);

  const spots = useMemo(() => {
    const rnd = mulberry32(77);
    const out: { x: number; z: number; s: number; swampy: boolean }[] = [];
    for (const isl of exploreIslands) {
      if (isl.kind === "city" || isl.kind === "mountain") continue;
      const n = isl.kind === "keys" ? 14 : isl.kind === "swamp" ? 90 : 70;
      for (let i = 0; i < n; i++) {
        const x = isl.cx + (rnd() * 2 - 1) * isl.rx;
        const z = isl.cz + (rnd() * 2 - 1) * isl.rz;
        if (!insideIsland(x, z, isl, 0.92)) continue;
        out.push({ x, z, s: 0.7 + rnd() * 1.4, swampy: isl.kind === "swamp" });
      }
    }
    return out;
  }, []);

  useEffect(() => {
    const dummy = new THREE.Object3D();
    spots.forEach((t, i) => {
      const y = terrainHeight(t.x, t.z);
      dummy.position.set(t.x, y + 1.6 * t.s, t.z);
      dummy.scale.setScalar(t.s);
      dummy.updateMatrix();
      trunks.current?.setMatrixAt(i, dummy.matrix);
      // three crossed planes per crown
      for (let k = 0; k < 3; k++) {
        dummy.position.set(t.x, y + 4.6 * t.s, t.z);
        dummy.rotation.set(0, (k * Math.PI) / 3, 0);
        dummy.scale.setScalar(t.s);
        dummy.updateMatrix();
        crowns.current[k]?.setMatrixAt(i, dummy.matrix);
      }
      dummy.rotation.set(0, 0, 0);
    });
    if (trunks.current) {
      trunks.current.count = spots.length;
      trunks.current.instanceMatrix.needsUpdate = true;
    }
    for (const m of crowns.current)
      if (m) {
        m.count = spots.length;
        m.instanceMatrix.needsUpdate = true;
      }
  }, [spots]);

  return (
    <group>
      <instancedMesh ref={trunks} args={[undefined, undefined, 250]}>
        <cylinderGeometry args={[0.35, 0.5, 3.4, 5]} />
        <meshStandardMaterial color="#3d2f22" roughness={1} />
      </instancedMesh>
      {[0, 1, 2].map((k) => (
        <instancedMesh
          key={k}
          ref={(m) => {
            crowns.current[k] = m;
          }}
          args={[undefined, undefined, 250]}
        >
          <planeGeometry args={[7, 7]} />
          <meshStandardMaterial
            map={frond}
            transparent
            alphaTest={0.08}
            side={THREE.DoubleSide}
            roughness={1}
            color="#9fd08a"
          />
        </instancedMesh>
      ))}
    </group>
  );
}

/* ---------- POI beacons ---------- */

function Beacon({
  poi,
  found,
}: {
  poi: { slug: string; name: string; x: number; z: number };
  found: boolean;
}) {
  const beam = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  const y = terrainHeight(poi.x, poi.z);

  const labelTex = useMemo(
    () => makeLabelTexture(poi.name, found),
    [poi.name, found]
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ring.current && !found) {
      const s = 1 + 0.18 * Math.sin(t * 2.4);
      ring.current.scale.setScalar(s);
      (ring.current.material as THREE.MeshBasicMaterial).opacity =
        0.5 + 0.3 * Math.sin(t * 2.4);
    }
    if (beam.current && !found) {
      (beam.current.material as THREE.MeshBasicMaterial).opacity =
        0.16 + 0.08 * Math.sin(t * 1.8);
    }
  });

  return (
    <group position={[poi.x, y, poi.z]}>
      <mesh ref={beam} position={[0, 30, 0]}>
        <cylinderGeometry args={[2.2, 3.4, 60, 16, 1, true]} />
        <meshBasicMaterial
          color={found ? "#B6F34A" : "#ff4fd8"}
          transparent
          opacity={found ? 0.06 : 0.2}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={ring} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.6, 0]}>
        <ringGeometry args={[6, 8, 40]} />
        <meshBasicMaterial
          color={found ? "#B6F34A" : "#ff4fd8"}
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      <sprite position={[0, 20, 0]} scale={[26, 4.9, 1]}>
        <spriteMaterial map={labelTex} transparent depthWrite={false} />
      </sprite>
      {found && (
        <pointLight
          position={[0, 8, 0]}
          color="#B6F34A"
          intensity={30}
          distance={50}
        />
      )}
    </group>
  );
}

/* ---------- golden rings ---------- */

function GoldenRing({
  ring,
  collected,
}: {
  ring: { id: string; x: number; z: number; y: number; hint: string };
  collected: boolean;
}) {
  const g = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const m = g.current;
    if (!m) return;
    const t = clock.getElapsedTime();
    m.rotation.y = t * 0.9;
    m.position.y = ring.y + Math.sin(t * 1.6) * 0.8;
  });
  if (collected) return null;
  return (
    <group ref={g} position={[ring.x, ring.y, ring.z]}>
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[8, 0.9, 10, 36]} />
        <meshBasicMaterial color="#ffd25a" fog={false} toneMapped={false} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[8, 0.35, 8, 36]} />
        <meshBasicMaterial color="#fff3c4" fog={false} toneMapped={false} />
      </mesh>
      <pointLight color="#ffd25a" intensity={14} distance={40} />
    </group>
  );
}

/* ---------- hidden stashes ---------- */

function Stash({
  stash,
  collected,
}: {
  stash: { id: string; x: number; z: number; label: string };
  collected: boolean;
}) {
  const g = useRef<THREE.Group>(null);
  const y = terrainHeight(stash.x, stash.z);
  useFrame(({ clock }) => {
    const m = g.current;
    if (!m) return;
    const t = clock.getElapsedTime();
    m.rotation.y = t * 1.4;
    m.position.y = y + 1.6 + Math.sin(t * 2.2) * 0.35;
  });
  if (collected) return null;
  return (
    <group ref={g} position={[stash.x, y + 1.6, stash.z]}>
      <mesh>
        <boxGeometry args={[2.2, 2.2, 2.2]} />
        <meshBasicMaterial color="#5adfff" fog={false} toneMapped={false} />
      </mesh>
      <mesh>
        <boxGeometry args={[2.8, 2.8, 2.8]} />
        <meshBasicMaterial
          color="#5adfff"
          transparent
          opacity={0.18}
          depthWrite={false}
        />
      </mesh>
      <pointLight color="#5adfff" intensity={16} distance={36} />
    </group>
  );
}

/* ---------- airboat & camera ---------- */

const SPAWN = { x: 30, z: 150, heading: Math.PI };
const WALK_SPAWN = { x: 60, z: -10, yaw: Math.PI };

interface DiscoveryRefs {
  foundRef: RefObject<Set<string>>;
  ringsRef: RefObject<Set<string>>;
  stashesRef: RefObject<Set<string>>;
}
interface DiscoveryCbs {
  onDiscover: (slug: string) => void;
  onRing: (id: string) => void;
  onStash: (id: string) => void;
}

function runDiscovery(
  x: number,
  z: number,
  y: number,
  refs: DiscoveryRefs,
  cbs: DiscoveryCbs
) {
  const found = refs.foundRef.current;
  if (found) {
    for (const p of explorePois) {
      if (found.has(p.slug)) continue;
      const dx = x - p.x;
      const dz = z - p.z;
      if (dx * dx + dz * dz < 42 * 42) {
        found.add(p.slug);
        cbs.onDiscover(p.slug);
      }
    }
  }
  const rings = refs.ringsRef.current;
  if (rings) {
    for (const r of exploreRings) {
      if (rings.has(r.id)) continue;
      const dx = x - r.x;
      const dz = z - r.z;
      const dy = y - r.y;
      if (dx * dx + dz * dz + dy * dy < 12 * 12) {
        rings.add(r.id);
        cbs.onRing(r.id);
      }
    }
  }
  const stashes = refs.stashesRef.current;
  if (stashes) {
    for (const sh of exploreStashes) {
      if (stashes.has(sh.id)) continue;
      const dx = x - sh.x;
      const dz = z - sh.z;
      if (dx * dx + dz * dz < 26 * 26) {
        stashes.add(sh.id);
        cbs.onStash(sh.id);
      }
    }
  }
}

function Airboat({
  active,
  keysRef,
  foundRef,
  ringsRef,
  stashesRef,
  camModeRef,
  pausedRef,
  posRef,
  onDiscover,
  onRing,
  onStash,
}: {
  active: boolean;
  keysRef: RefObject<Record<string, boolean>>;
  foundRef: RefObject<Set<string>>;
  ringsRef: RefObject<Set<string>>;
  stashesRef: RefObject<Set<string>>;
  camModeRef: RefObject<number>;
  pausedRef: RefObject<boolean>;
  posRef: RefObject<{
    x: number;
    z: number;
    heading: number;
    speed: number;
    alt: number;
  }>;
  onDiscover: (slug: string) => void;
  onRing: (id: string) => void;
  onStash: (id: string) => void;
}) {
  const boat = useRef<THREE.Group>(null);
  const fan = useRef<THREE.Mesh>(null);
  const wake = useRef<THREE.Mesh>(null);
  const s = useRef({
    x: SPAWN.x,
    z: SPAWN.z,
    y: 2,
    heading: SPAWN.heading,
    speed: 0,
    lift: 0,
  });

  useFrame(({ camera, clock }, rawDt) => {
    const dt = Math.min(rawDt, 0.05);
    const st = s.current;
    const k = keysRef.current ?? {};
    if (pausedRef.current || !active) return;

    if (k["KeyR"]) {
      st.x = SPAWN.x;
      st.z = SPAWN.z;
      st.heading = SPAWN.heading;
      st.speed = 0;
      st.lift = 0;
      k["KeyR"] = false;
    }

    const throttle = (k["KeyW"] ? 1 : 0) - (k["KeyS"] ? 0.55 : 0);
    const turn = (k["KeyA"] ? 1 : 0) - (k["KeyD"] ? 1 : 0);
    const MAX = 58;

    st.speed += (throttle * MAX - st.speed) * Math.min(1, dt * 1.5);
    const turnAuthority = Math.min(1, Math.abs(st.speed) / 14 + 0.25);
    st.heading += turn * 1.7 * turnAuthority * dt * (st.speed < -0.5 ? -1 : 1);

    st.x += Math.sin(st.heading) * st.speed * dt;
    st.z += Math.cos(st.heading) * st.speed * dt;
    st.x = THREE.MathUtils.clamp(st.x, -480, 480);
    st.z = THREE.MathUtils.clamp(st.z, -480, 480);

    if (k["Space"]) st.lift = Math.min(42, st.lift + dt * 40);
    else if (k["ShiftLeft"] || k["ShiftRight"])
      st.lift = Math.max(0, st.lift - dt * 55);

    const groundY = terrainHeight(st.x, st.z) + 1.7;
    const targetY = groundY + st.lift;
    st.y += (targetY - st.y) * Math.min(1, dt * 4);

    const g = boat.current;
    if (g) {
      g.position.set(st.x, st.y, st.z);
      const targetTilt = -turn * 0.25 * turnAuthority;
      const bob = Math.sin(clock.getElapsedTime() * 3) * 0.015 * (1 + Math.abs(st.speed) / MAX);
      g.rotation.set(0, st.heading, 0);
      g.rotation.z = targetTilt + bob;
      g.rotation.x = -st.speed * 0.0015;
    }
    if (fan.current) fan.current.rotation.z += dt * (4 + Math.abs(st.speed) * 0.55);

    // wake trail — visible when moving fast and close to the surface
    if (wake.current) {
      const nearSurface = st.lift < 2;
      const strength = nearSurface
        ? Math.min(1, Math.abs(st.speed) / MAX)
        : 0;
      (wake.current.material as THREE.MeshBasicMaterial).opacity =
        strength * 0.28;
      wake.current.scale.set(1, 1, 0.4 + strength * 1.6);
      wake.current.position.y = terrainHeight(st.x, st.z) + 0.3 - st.y;
    }

    if (posRef.current) {
      posRef.current.x = st.x;
      posRef.current.z = st.z;
      posRef.current.heading = st.heading;
      posRef.current.speed = st.speed;
      posRef.current.alt = st.y;
    }

    // chase camera — modes: 0 near, 1 far, 2 top-down survey
    const fx = Math.sin(st.heading);
    const fz = Math.cos(st.heading);
    const mode = camModeRef.current ?? 0;
    if (mode === 2) {
      camera.position.lerp(
        new THREE.Vector3(st.x - fx * 4, st.y + 95, st.z - fz * 4),
        1 - Math.exp(-dt * 3)
      );
      camera.lookAt(st.x, st.y, st.z);
    } else {
      const dist = mode === 1 ? 52 : 34;
      const height = mode === 1 ? 22 : 14;
      const camX = st.x - fx * dist;
      const camZ = st.z - fz * dist;
      const camY = st.y + height + Math.abs(st.speed) * 0.05;
      camera.position.lerp(
        new THREE.Vector3(camX, camY, camZ),
        1 - Math.exp(-dt * 3.2)
      );
      camera.lookAt(st.x + fx * 16, st.y + 2, st.z + fz * 16);
    }

    runDiscovery(
      st.x,
      st.z,
      st.y,
      { foundRef, ringsRef, stashesRef },
      { onDiscover, onRing, onStash }
    );
  });

  return (
    <group ref={boat} position={[SPAWN.x, 2, SPAWN.z]} rotation={[0, SPAWN.heading, 0]}>
      {/* hull */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[4.2, 0.9, 7]} />
        <meshStandardMaterial color="#b8552e" roughness={0.6} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.95, -1.4]}>
        <boxGeometry args={[3.4, 0.5, 3.4]} />
        <meshStandardMaterial color="#8a3f22" roughness={0.7} />
      </mesh>
      {/* seat */}
      <mesh position={[0, 1.5, -0.9]}>
        <boxGeometry args={[1.4, 1, 1.2]} />
        <meshStandardMaterial color="#1d232b" roughness={0.9} />
      </mesh>
      {/* fan cage */}
      <mesh position={[0, 2.6, 2.9]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.7, 0.22, 8, 20]} />
        <meshStandardMaterial color="#22282f" roughness={0.5} metalness={0.6} />
      </mesh>
      <group position={[0, 2.6, 2.9]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh ref={fan}>
          <boxGeometry args={[0.5, 3.1, 0.12]} />
          <meshStandardMaterial color="#c8cfd8" roughness={0.4} metalness={0.7} />
        </mesh>
      </group>
      <mesh position={[0, 1.7, 2.9]}>
        <boxGeometry args={[0.35, 1.8, 0.35]} />
        <meshStandardMaterial color="#22282f" roughness={0.6} />
      </mesh>
      {/* wake trail */}
      <mesh
        ref={wake}
        position={[0, -1.2, 6]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[3.4, 8]} />
        <meshBasicMaterial
          color="#bfe8ff"
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>
      {/* running light */}
      <pointLight position={[0, 2, -3.6]} color="#B6F34A" intensity={6} distance={16} />
    </group>
  );
}

/* ---------- first-person street roam ---------- */

function WalkRig({
  active,
  keysRef,
  foundRef,
  ringsRef,
  stashesRef,
  pausedRef,
  posRef,
  onDiscover,
  onRing,
  onStash,
}: {
  active: boolean;
  keysRef: RefObject<Record<string, boolean>>;
  foundRef: RefObject<Set<string>>;
  ringsRef: RefObject<Set<string>>;
  stashesRef: RefObject<Set<string>>;
  pausedRef: RefObject<boolean>;
  posRef: RefObject<{
    x: number;
    z: number;
    heading: number;
    speed: number;
    alt: number;
  }>;
  onDiscover: (slug: string) => void;
  onRing: (id: string) => void;
  onStash: (id: string) => void;
}) {
  const st = useRef({
    x: WALK_SPAWN.x,
    z: WALK_SPAWN.z,
    y: 0,
    yaw: WALK_SPAWN.yaw,
    pitch: 0,
    lift: 0,
    speed: 0,
  });
  const drag = useRef<{ x: number; y: number } | null>(null);
  const lamp = useRef<THREE.PointLight>(null);
  useEffect(() => {
    const cvs = document.querySelector("canvas");
    if (!cvs) return;
    const down = (e: PointerEvent) => {
      drag.current = { x: e.clientX, y: e.clientY };
      cvs.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      const d = drag.current;
      if (!d || !active) return;
      st.current.yaw -= (e.clientX - d.x) * 0.0052;
      st.current.pitch = THREE.MathUtils.clamp(
        st.current.pitch - (e.clientY - d.y) * 0.0038,
        -1.25,
        1.25
      );
      d.x = e.clientX;
      d.y = e.clientY;
    };
    const up = () => {
      drag.current = null;
    };
    cvs.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      cvs.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [active]);

  useFrame(({ camera }, rawDt) => {
    if (!active || pausedRef.current) return;
    const dt = Math.min(rawDt, 0.05);
    const w = st.current;
    const k = keysRef.current ?? {};

    if (k["KeyR"]) {
      w.x = WALK_SPAWN.x;
      w.z = WALK_SPAWN.z;
      w.yaw = WALK_SPAWN.yaw;
      w.pitch = 0;
      w.lift = 0;
      k["KeyR"] = false;
    }

    // altitude — Space lifts into "aerial view", Shift brings you back down
    if (k["Space"]) w.lift = Math.min(60, w.lift + dt * 34);
    else if (k["ShiftLeft"] || k["ShiftRight"])
      w.lift = Math.max(0, w.lift - dt * 48);

    const flying = w.lift > 0.5;
    const onWater = terrainHeight(w.x, w.z) < 0.6;
    const SPEED = flying ? 46 : onWater ? 5.5 : 20;

    const f = { x: Math.sin(w.yaw), z: Math.cos(w.yaw) };
    const r = { x: Math.sin(w.yaw + Math.PI / 2), z: Math.cos(w.yaw + Math.PI / 2) };
    let mx = 0;
    let mz = 0;
    if (k["KeyW"]) {
      mx += f.x;
      mz += f.z;
    }
    if (k["KeyS"]) {
      mx -= f.x;
      mz -= f.z;
    }
    if (k["KeyA"]) {
      mx += r.x;
      mz += r.z;
    }
    if (k["KeyD"]) {
      mx -= r.x;
      mz -= r.z;
    }
    const len = Math.hypot(mx, mz);
    w.speed = len > 0 ? SPEED : 0;
    if (len > 0) {
      w.x += (mx / len) * SPEED * dt;
      w.z += (mz / len) * SPEED * dt;
      w.x = THREE.MathUtils.clamp(w.x, -480, 480);
      w.z = THREE.MathUtils.clamp(w.z, -480, 480);
    }

    const eyeY = terrainHeight(w.x, w.z) + 2.4 + w.lift;
    w.y += (eyeY - w.y) * Math.min(1, dt * 8);

    camera.position.set(w.x, w.y, w.z);
    camera.rotation.order = "YXZ";
    camera.rotation.y = w.yaw + Math.PI;
    camera.rotation.x = w.pitch;
    camera.rotation.z = 0;

    if (posRef.current) {
      posRef.current.x = w.x;
      posRef.current.z = w.z;
      posRef.current.heading = w.yaw;
      posRef.current.speed = w.speed;
      posRef.current.alt = w.y;
    }

    // headlamp — keeps street-level view readable at night
    if (lamp.current) {
      lamp.current.position.set(
        w.x + f.x * 4,
        w.y + 1,
        w.z + f.z * 4
      );
    }

    runDiscovery(
      w.x,
      w.z,
      w.y,
      { foundRef, ringsRef, stashesRef },
      { onDiscover, onRing, onStash }
    );
  });

  return (
    <pointLight
      ref={lamp}
      color="#cfe6ff"
      intensity={active ? 60 : 0}
      distance={70}
      decay={1.6}
    />
  );
}

/* ---------- atmosphere ---------- */

function SkyDome() {
  const mat = useMemo(() => makeSkyMaterial(), []);
  return (
    <mesh material={mat} renderOrder={-10}>
      <sphereGeometry args={[1500, 24, 16]} />
    </mesh>
  );
}

const SUN_POS = new THREE.Vector3(0.55, 0.18, -0.42).normalize().multiplyScalar(1100);

function SunGlow() {
  const tex = useMemo(() => glowTexture("rgba(255,190,120,1)", "rgba(255,120,60,0)"), []);
  return (
    <sprite position={SUN_POS} scale={[560, 560, 1]}>
      <spriteMaterial map={tex} transparent depthWrite={false} fog={false} />
    </sprite>
  );
}

function Clouds() {
  const group = useRef<THREE.Group>(null);
  const tex = useMemo(() => cloudTexture(17), []);
  const tex2 = useMemo(() => cloudTexture(41), []);
  const spots = useMemo(() => {
    const rnd = mulberry32(555);
    const out: { x: number; y: number; z: number; s: number; t: number }[] = [];
    for (let i = 0; i < 16; i++)
      out.push({
        x: (rnd() * 2 - 1) * 900,
        y: 150 + rnd() * 160,
        z: (rnd() * 2 - 1) * 900,
        s: 120 + rnd() * 180,
        t: rnd(),
      });
    return out;
  }, []);
  useFrame((st, dt) => {
    group.current?.children.forEach((c, i) => {
      c.position.x += dt * (2.4 + (i % 3));
      if (c.position.x > 1000) c.position.x = -1000;
    });
    void st;
  });
  return (
    <group ref={group}>
      {spots.map((c, i) => (
        <sprite key={i} position={[c.x, c.y, c.z]} scale={[c.s, c.s * 0.45, 1]}>
          <spriteMaterial
            map={c.t > 0.5 ? tex : tex2}
            transparent
            opacity={0.4}
            color="#93a7c8"
            depthWrite={false}
          />
        </sprite>
      ))}
    </group>
  );
}

/** Asphalt strips across Vice City. */
function Roads() {
  const tex = useMemo(() => roadTexture(), []);
  const vc = exploreIslands.find((i) => i.kind === "city");
  if (!vc) return null;
  const strips: { x: number; z: number; w: number; l: number; rot: number }[] = [
    { x: vc.cx - vc.rx * 0.25, z: vc.cz, w: 7, l: vc.rz * 1.55, rot: 0 },
    { x: vc.cx + vc.rx * 0.22, z: vc.cz + vc.rz * 0.05, w: 7, l: vc.rz * 1.4, rot: 0 },
    { x: vc.cx, z: vc.cz - vc.rz * 0.3, w: 7, l: vc.rx * 1.5, rot: Math.PI / 2 },
    { x: vc.cx, z: vc.cz + vc.rz * 0.32, w: 7, l: vc.rx * 1.45, rot: Math.PI / 2 },
  ];
  return (
    <group>
      {strips.map((r, i) => (
        <mesh
          key={i}
          position={[r.x, vc.y + 0.16, r.z]}
          rotation={[-Math.PI / 2, 0, r.rot]}
        >
          <planeGeometry args={[r.w, r.l]} />
          <meshStandardMaterial map={tex} roughness={0.85} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- exported scene ---------- */

export function ExploreScene({
  mode,
  found,
  ringsFound,
  stashesFound,
  keysRef,
  foundRef,
  ringsRef,
  stashesRef,
  camModeRef,
  pausedRef,
  posRef,
  onDiscover,
  onRing,
  onStash,
}: {
  mode: "boat" | "walk";
  found: Set<string>;
  ringsFound: Set<string>;
  keysRef: RefObject<Record<string, boolean>>;
  foundRef: RefObject<Set<string>>;
  ringsRef: RefObject<Set<string>>;
  posRef: RefObject<{
    x: number;
    z: number;
    heading: number;
    speed: number;
    alt: number;
  }>;
  camModeRef: RefObject<number>;
  pausedRef: RefObject<boolean>;
  stashesRef: RefObject<Set<string>>;
  stashesFound: Set<string>;
  onDiscover: (slug: string) => void;
  onRing: (id: string) => void;
  onStash: (id: string) => void;
}) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ fov: 62, position: [30, 30, 200] }}
      gl={{ antialias: true, preserveDrawingBuffer: true }}
      onCreated={({ gl }) => gl.setClearColor("#070d18")}
    >
      <fog attach="fog" args={["#0a1524", 140, 780]} />
      <ambientLight intensity={0.72} color="#8fb3d9" />
      <hemisphereLight args={["#4a6b99", "#101826", 0.9]} />
      <directionalLight position={[260, 200, -160]} intensity={1.6} color="#ffb37a" />
      <directionalLight position={[-200, 120, 240]} intensity={0.35} color="#5adfff" />
      <SkyDome />
      <SunGlow />
      <Clouds />
      <Stars radius={900} depth={60} count={2600} factor={5} fade speed={0.4} />

      <Ocean />
      <ScaledIslands />
      <Roads />
      <CityBlocks />
      <Vegetation />
      {explorePois.map((p) => (
        <Beacon key={p.slug} poi={p} found={found.has(p.slug)} />
      ))}
      {exploreRings.map((r) => (
        <GoldenRing key={r.id} ring={r} collected={ringsFound.has(r.id)} />
      ))}
      {exploreStashes.map((sh) => (
        <Stash key={sh.id} stash={sh} collected={stashesFound.has(sh.id)} />
      ))}
      <WalkRig
        active={mode === "walk"}
        keysRef={keysRef}
        foundRef={foundRef}
        ringsRef={ringsRef}
        stashesRef={stashesRef}
        pausedRef={pausedRef}
        posRef={posRef}
        onDiscover={onDiscover}
        onRing={onRing}
        onStash={onStash}
      />
      <Airboat
        active={mode === "boat"}
        keysRef={keysRef}
        foundRef={foundRef}
        ringsRef={ringsRef}
        stashesRef={stashesRef}
        camModeRef={camModeRef}
        pausedRef={pausedRef}
        posRef={posRef}
        onDiscover={onDiscover}
        onRing={onRing}
        onStash={onStash}
      />
      <EffectComposer multisampling={2}>
        <Bloom
          intensity={0.65}
          luminanceThreshold={0.72}
          luminanceSmoothing={0.28}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}
