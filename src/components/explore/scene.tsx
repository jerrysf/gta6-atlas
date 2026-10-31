"use client";

/* eslint-disable react-hooks/immutability -- imperative Three.js updates inside useFrame/effects are the R3F model */

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import {
  exploreIslands,
  explorePois,
  exploreRings,
  exploreStashes,
  terrainHeight,
} from "@/data/explore";

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

function ScaledIslands() {
  return (
    <group>
      {exploreIslands.map((isl) => {
        const col = ISLAND_COLORS[isl.kind];
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
            <mesh position={[0, isl.y + 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <circleGeometry args={[0.985, 56]} />
              <meshStandardMaterial color={col.top} roughness={0.9} />
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
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const m = ref.current;
    if (!m) return;
    const t = clock.getElapsedTime();
    (m.material as THREE.MeshStandardMaterial).emissiveIntensity =
      0.25 + Math.sin(t * 0.6) * 0.06;
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
      <planeGeometry args={[1800, 1800]} />
      <meshStandardMaterial
        color="#0a2b42"
        emissive="#0e4a66"
        emissiveIntensity={0.25}
        metalness={0.55}
        roughness={0.3}
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

function CityBlocks() {
  const body = useRef<THREE.InstancedMesh>(null);
  const lit = useRef<THREE.InstancedMesh>(null);

  const { bodies, lits } = useMemo(() => {
    const rnd = mulberry32(2026);
    const bodies: { x: number; z: number; h: number; w: number; c: THREE.Color }[] = [];
    const lits: { x: number; z: number; h: number; w: number; c: THREE.Color }[] = [];
    const zones = [
      { cx: 85, cz: -15, rx: 105, rz: 125, density: 0.8, maxH: 46, count: 240 },
      { cx: -150, cz: -50, rx: 160, rz: 140, density: 0.18, maxH: 14, count: 70 },
      { cx: -305, cz: -195, rx: 55, rz: 65, density: 0.45, maxH: 12, count: 45 },
    ];
    for (const zone of zones) {
      for (let i = 0; i < zone.count; i++) {
        const x = zone.cx + (rnd() * 2 - 1) * zone.rx * 0.85;
        const z = zone.cz + (rnd() * 2 - 1) * zone.rz * 0.85;
        if (!insideIsland(x, z, zone, 0.8)) continue;
        const center =
          1 - Math.min(1, Math.hypot(x - zone.cx, z - zone.cz) / Math.max(zone.rx, zone.rz));
        const h = 4 + rnd() * zone.maxH * (0.3 + center);
        const w = 3 + rnd() * 5;
        const isLit = rnd() < 0.3;
        const palette = [
          new THREE.Color("#3d4a5c"),
          new THREE.Color("#4a576a"),
          new THREE.Color("#354052"),
          new THREE.Color("#566377"),
        ];
        const litPalette = [
          new THREE.Color("#ff5ad2"),
          new THREE.Color("#5adfff"),
          new THREE.Color("#ffd25a"),
        ];
        (isLit ? lits : bodies).push({
          x,
          z,
          h,
          w,
          c: isLit
            ? litPalette[Math.floor(rnd() * litPalette.length)]
            : palette[Math.floor(rnd() * palette.length)],
        });
      }
    }
    return { bodies, lits };
  }, []);

  useEffect(() => {
    const dummy = new THREE.Object3D();
    const place = (
      mesh: THREE.InstancedMesh | null,
      list: { x: number; z: number; h: number; w: number; c: THREE.Color }[],
      yBase: number
    ) => {
      if (!mesh) return;
      list.forEach((b, i) => {
        dummy.position.set(b.x, yBase + b.h / 2, b.z);
        dummy.scale.set(b.w, b.h, b.w);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
        mesh.setColorAt(i, b.c);
      });
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
      mesh.count = list.length;
    };
    place(body.current, bodies, 2.4);
    place(lit.current, lits, 2.4);
  }, [bodies, lits]);

  return (
    <group>
      <instancedMesh ref={body} args={[undefined, undefined, 360]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ffffff" roughness={0.8} metalness={0.2} />
      </instancedMesh>
      <instancedMesh ref={lit} args={[undefined, undefined, 120]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#ffffff" fog={false} toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

/* ---------- vegetation ---------- */

function Vegetation() {
  const trunks = useRef<THREE.InstancedMesh>(null);
  const crowns = useRef<THREE.InstancedMesh>(null);

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
      dummy.position.y = y + 4.4 * t.s;
      dummy.updateMatrix();
      crowns.current?.setMatrixAt(i, dummy.matrix);
    });
    if (trunks.current) {
      trunks.current.count = spots.length;
      trunks.current.instanceMatrix.needsUpdate = true;
    }
    if (crowns.current) {
      crowns.current.count = spots.length;
      crowns.current.instanceMatrix.needsUpdate = true;
    }
  }, [spots]);

  return (
    <group>
      <instancedMesh ref={trunks} args={[undefined, undefined, 250]}>
        <cylinderGeometry args={[0.35, 0.5, 3.4, 5]} />
        <meshStandardMaterial color="#3d2f22" roughness={1} />
      </instancedMesh>
      <instancedMesh ref={crowns} args={[undefined, undefined, 250]}>
        <coneGeometry args={[2.2, 3.6, 6]} />
        <meshStandardMaterial color="#2e5230" roughness={1} />
      </instancedMesh>
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
      <Stars radius={900} depth={60} count={2600} factor={5} fade speed={0.4} />

      <Ocean />
      <ScaledIslands />
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
    </Canvas>
  );
}
