"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Circle,
  Compass,
  List,
  Play,
  RotateCcw,
  X,
} from "lucide-react";
import { exploreIslands, explorePois, exploreRings } from "@/data/explore";
import { ExploreScene } from "@/components/explore/scene";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "gta6-explore-v1";

interface BoatPos {
  x: number;
  z: number;
  heading: number;
  speed: number;
  alt: number;
}

function loadProgress(): { pois: Set<string>; rings: Set<string> } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { pois: new Set(), rings: new Set() };
    const d = JSON.parse(raw) as { pois?: string[]; rings?: string[] };
    return { pois: new Set(d.pois ?? []), rings: new Set(d.rings ?? []) };
  } catch {
    return { pois: new Set(), rings: new Set() };
  }
}

/* ---------- HUD widgets ---------- */

const COMPASS_POINTS: [number, string][] = [
  [0, "N"],
  [45, "NE"],
  [90, "E"],
  [135, "SE"],
  [180, "S"],
  [225, "SW"],
  [270, "W"],
  [315, "NW"],
];

function CompassStrip({ posRef }: { posRef: React.RefObject<BoatPos> }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let raf = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      const c = ref.current;
      if (!c) return;
      const g = c.getContext("2d");
      if (!g) return;
      const W = c.width;
      const H = c.height;
      g.clearRect(0, 0, W, H);
      const heading = posRef.current?.heading ?? 0;
      // heading → degrees, 0 = forward +z?? our heading: forward = (sin h, cos h); h=PI faces -z = north
      const deg = ((180 - (heading * 180) / Math.PI) % 360 + 360) % 360;
      const pxPerDeg = W / 120; // show 120° of compass
      g.font = "600 11px ui-monospace, monospace";
      g.textAlign = "center";
      // ticks every 15°
      for (let d = -60; d <= 60; d += 15) {
        const a = (deg + d + 360) % 360;
        const x = W / 2 + d * pxPerDeg;
        const isMajor = a % 45 === 0;
        g.fillStyle = isMajor ? "rgba(182,243,74,0.9)" : "rgba(148,163,184,0.45)";
        g.fillRect(x - 0.5, isMajor ? 6 : 12, 1.4, isMajor ? 8 : 5);
        if (isMajor) {
          const label = COMPASS_POINTS.find(([dd]) => dd === a)?.[1];
          if (label) {
            g.fillStyle = "rgba(226,232,240,0.9)";
            g.fillText(label, x, H - 6);
          }
        }
      }
      // center caret
      g.fillStyle = "#B6F34A";
      g.beginPath();
      g.moveTo(W / 2, 0);
      g.lineTo(W / 2 - 4, 6);
      g.lineTo(W / 2 + 4, 6);
      g.closePath();
      g.fill();
      // heading degrees
      g.fillStyle = "rgba(182,243,74,0.9)";
      g.font = "700 10px ui-monospace, monospace";
      g.fillText(`${Math.round(deg)}°`, W / 2, H - 22);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [posRef]);
  return (
    <canvas
      ref={ref}
      width={240}
      height={40}
      className="h-10 w-60"
      aria-hidden="true"
    />
  );
}

function Instruments({ posRef }: { posRef: React.RefObject<BoatPos> }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let raf = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      const c = ref.current;
      if (!c) return;
      const g = c.getContext("2d");
      if (!g) return;
      const W = c.width;
      const H = c.height;
      g.clearRect(0, 0, W, H);
      const pos = posRef.current;
      const spd = Math.abs(pos?.speed ?? 0);
      const alt = pos?.alt ?? 0;
      const spdP = Math.min(1, spd / 58);
      const altP = Math.min(1, alt / 46);
      // speed bar
      g.font = "600 9px ui-monospace, monospace";
      g.textAlign = "left";
      g.fillStyle = "rgba(148,163,184,0.7)";
      g.fillText("SPD", 0, 10);
      g.fillStyle = "rgba(30,41,59,0.9)";
      g.fillRect(28, 4, W - 70, 6);
      const grad = g.createLinearGradient(28, 0, W - 42, 0);
      grad.addColorStop(0, "#B6F34A");
      grad.addColorStop(1, "#5ADFFF");
      g.fillStyle = grad;
      g.fillRect(28, 4, (W - 70) * spdP, 6);
      g.fillStyle = "#e2e8f0";
      g.textAlign = "right";
      g.fillText(`${Math.round(spd)}`, W - 30, 10);
      g.fillStyle = "rgba(148,163,184,0.7)";
      g.fillText("kn", W - 12, 10);
      // altitude bar
      g.textAlign = "left";
      g.fillText("ALT", 0, 28);
      g.fillStyle = "rgba(30,41,59,0.9)";
      g.fillRect(28, 22, W - 70, 6);
      g.fillStyle = alt > 20 ? "#ffd25a" : "#5ADFFF";
      g.fillRect(28, 22, (W - 70) * altP, 6);
      g.fillStyle = "#e2e8f0";
      g.textAlign = "right";
      g.fillText(`${Math.round(alt)}`, W - 30, 28);
      g.fillStyle = "rgba(148,163,184,0.7)";
      g.fillText("m", W - 12, 28);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [posRef]);
  return (
    <canvas
      ref={ref}
      width={200}
      height={34}
      className="h-[34px] w-[200px]"
      aria-hidden="true"
    />
  );
}

function Minimap({
  posRef,
  found,
  ringsFound,
}: {
  posRef: React.RefObject<BoatPos>;
  found: Set<string>;
  ringsFound: Set<string>;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let raf = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      const c = ref.current;
      if (!c) return;
      const g = c.getContext("2d");
      if (!g) return;
      const W = c.width;
      const toMap = (x: number, z: number) => [
        ((x + 480) / 960) * W,
        ((z + 480) / 960) * W,
      ];
      g.clearRect(0, 0, W, W);
      g.fillStyle = "rgba(6,18,30,0.92)";
      g.fillRect(0, 0, W, W);
      g.fillStyle = "#1d3323";
      for (const isl of exploreIslands) {
        const [px, pz] = toMap(isl.cx, isl.cz);
        g.beginPath();
        g.ellipse(px, pz, (isl.rx / 960) * W, (isl.rz / 960) * W, 0, 0, Math.PI * 2);
        g.fill();
      }
      for (const r of exploreRings) {
        if (ringsFound.has(r.id)) continue;
        const [px, pz] = toMap(r.x, r.z);
        g.strokeStyle = "#ffd25a";
        g.lineWidth = 1.4;
        g.beginPath();
        g.arc(px, pz, 3, 0, Math.PI * 2);
        g.stroke();
      }
      for (const p of explorePois) {
        const [px, pz] = toMap(p.x, p.z);
        g.fillStyle = found.has(p.slug) ? "#B6F34A" : "#ff4fd8";
        g.beginPath();
        g.arc(px, pz, 2.2, 0, Math.PI * 2);
        g.fill();
      }
      const pos = posRef.current;
      if (pos) {
        const [px, pz] = toMap(pos.x, pos.z);
        g.save();
        g.translate(px, pz);
        g.rotate(-pos.heading);
        g.fillStyle = "#ffffff";
        g.shadowColor = "#B6F34A";
        g.shadowBlur = 6;
        g.beginPath();
        g.moveTo(0, -5.5);
        g.lineTo(3.6, 4.4);
        g.lineTo(-3.6, 4.4);
        g.closePath();
        g.fill();
        g.restore();
      }
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [posRef, found, ringsFound]);
  return (
    <div className="relative">
      <canvas
        ref={ref}
        width={168}
        height={168}
        className="size-32 rounded-md sm:size-40"
        aria-label="Minimap"
      />
      <span className="pointer-events-none absolute inset-0 rounded-md border border-lime-300/25" />
      <span className="pointer-events-none absolute left-1 top-1 font-mono text-[8px] uppercase tracking-widest text-lime-300/70">
        Leonida
      </span>
    </div>
  );
}

const KEY_ROWS: { keys: string; action: string }[] = [
  { keys: "W / S", action: "Throttle forward / reverse" },
  { keys: "A / D", action: "Steer the fan boat" },
  { keys: "Space", action: "Climb — fly over terrain" },
  { keys: "Shift", action: "Descend" },
  { keys: "R", action: "Reset position" },
];

export function ExploreGame() {
  const [started, setStarted] = useState(false);
  const [saved] = useState(loadProgress);
  const [found, setFound] = useState<Set<string>>(saved.pois);
  const [ringsFound, setRingsFound] = useState<Set<string>>(saved.rings);
  const [splash, setSplash] = useState<{
    name: string;
    blurb: string;
    kind: "poi" | "ring";
  } | null>(null);
  const [showList, setShowList] = useState(false);
  const [webglOk] = useState(() => {
    try {
      const c = document.createElement("canvas");
      return !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      return false;
    }
  });
  const keysRef = useRef<Record<string, boolean>>({});
  const foundRef = useRef<Set<string>>(saved.pois);
  const ringsRef = useRef<Set<string>>(saved.rings);
  const posRef = useRef<BoatPos>({ x: 30, z: 150, heading: Math.PI, speed: 0, alt: 0 });
  const splashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isTouch] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      keysRef.current[e.code] = true;
      if (["Space", "ArrowUp", "ArrowDown"].includes(e.code)) e.preventDefault();
    };
    const up = (e: KeyboardEvent) => {
      keysRef.current[e.code] = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  const persist = useCallback(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          pois: [...foundRef.current],
          rings: [...ringsRef.current],
        })
      );
    } catch {
      /* storage unavailable */
    }
  }, []);

  const showSplash = useCallback(
    (name: string, blurb: string, kind: "poi" | "ring") => {
      setSplash({ name, blurb, kind });
      if (splashTimer.current) clearTimeout(splashTimer.current);
      splashTimer.current = setTimeout(() => setSplash(null), 3800);
    },
    []
  );

  const onDiscover = useCallback(
    (slug: string) => {
      const poi = explorePois.find((p) => p.slug === slug);
      if (!poi) return;
      setFound(new Set(foundRef.current));
      persist();
      showSplash(poi.name, poi.blurb, "poi");
    },
    [persist, showSplash]
  );

  const onRing = useCallback(
    (id: string) => {
      const ring = exploreRings.find((r) => r.id === id);
      setRingsFound(new Set(ringsRef.current));
      persist();
      showSplash("Golden Ring", ring ? ring.hint : "Ring collected", "ring");
    },
    [persist, showSplash]
  );

  const allFound = found.size === explorePois.length;
  const totalPct = Math.round(
    ((found.size + ringsFound.size) /
      (explorePois.length + exploreRings.length)) *
      100
  );

  return (
    <div className="relative h-[calc(100vh-4rem)] min-h-[540px] w-full overflow-hidden bg-[#070d18]">
      {webglOk ? (
        <ExploreScene
          found={found}
          ringsFound={ringsFound}
          keysRef={keysRef}
          foundRef={foundRef}
          ringsRef={ringsRef}
          posRef={posRef}
          onDiscover={onDiscover}
          onRing={onRing}
        />
      ) : (
        <div className="flex h-full items-center justify-center p-8 text-center text-muted-foreground">
          Your browser could not create a WebGL context — the 3D Explorer needs
          hardware acceleration enabled.
        </div>
      )}

      {/* cinematic overlays */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(2,6,12,0.55) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.6) 3px)",
        }}
      />

      {started && (
        <>
          {/* top-center compass */}
          <div className="pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 rounded-md border border-border/60 bg-black/50 px-2 backdrop-blur">
            <CompassStrip posRef={posRef} />
          </div>

          {/* top-left mission widget */}
          <div className="pointer-events-none absolute left-4 top-4 space-y-2">
            <div className="relative overflow-hidden rounded-md border border-lime-300/30 bg-black/55 px-4 py-3 backdrop-blur">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime-300/70 to-transparent" />
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-lime-300/80">
                Leonida Tour
              </p>
              <div className="mt-1.5 flex items-end gap-3">
                <p className="font-display text-3xl leading-none tracking-wide text-brand">
                  {totalPct}
                  <span className="text-base text-muted-foreground">%</span>
                </p>
                <div className="pb-0.5 font-mono text-[10px] leading-tight text-muted-foreground">
                  <p>
                    <span className="text-foreground">{found.size}</span>/
                    {explorePois.length} locations
                  </p>
                  <p>
                    <span className="text-amber-300">{ringsFound.size}</span>/
                    {exploreRings.length} rings
                  </p>
                </div>
              </div>
              <div className="mt-2 h-1 w-44 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-brand to-cyan-400 transition-all duration-500"
                  style={{ width: `${totalPct}%` }}
                />
              </div>
            </div>
            <p className="max-w-[240px] rounded bg-black/40 px-2 py-1 font-mono text-[9px] leading-relaxed text-slate-400 backdrop-blur">
              Fan-made stylized diorama — not the official map.
            </p>
          </div>

          {/* instruments bottom-left */}
          <div className="pointer-events-none absolute bottom-4 left-4 rounded-md border border-border/60 bg-black/50 px-3 py-2 backdrop-blur">
            <Instruments posRef={posRef} />
            <div className="mt-1 hidden gap-3 font-mono text-[9px] text-slate-500 sm:flex">
              <span>
                <b className="text-slate-300">WASD</b> drive
              </span>
              <span>
                <b className="text-slate-300">SPC</b> climb
              </span>
              <span>
                <b className="text-slate-300">SHF</b> dive
              </span>
              <span>
                <b className="text-slate-300">R</b> reset
              </span>
            </div>
          </div>

          {/* minimap bottom-right */}
          <div className="pointer-events-none absolute bottom-4 right-4">
            <Minimap posRef={posRef} found={found} ringsFound={ringsFound} />
          </div>

          {/* action buttons top-right */}
          <div className="absolute right-4 top-4 flex gap-2">
            <button
              onClick={() => setShowList((v) => !v)}
              className="flex items-center gap-2 rounded-md border border-border/70 bg-black/55 px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-slate-300 backdrop-blur transition-colors hover:border-lime-300/60 hover:text-brand"
            >
              <List className="size-4" />
              Field Log
            </button>
            <button
              onClick={() => {
                keysRef.current["KeyR"] = true;
              }}
              className="flex items-center gap-2 rounded-md border border-border/70 bg-black/55 px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-slate-300 backdrop-blur transition-colors hover:border-lime-300/60 hover:text-brand"
            >
              <RotateCcw className="size-4" />
              Reset
            </button>
          </div>

          {/* center reticle */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="size-1.5 rounded-full bg-white/50 shadow-[0_0_6px_rgba(255,255,255,0.6)]" />
          </div>
        </>
      )}

      {/* GTA-style discovery splash */}
      {splash && started && (
        <div
          key={splash.name + splash.blurb}
          className="pointer-events-none absolute bottom-24 left-6 sm:left-10"
        >
          <p
            className={cn(
              "font-mono text-[10px] uppercase tracking-[0.35em]",
              splash.kind === "ring" ? "text-amber-300" : "text-brand"
            )}
            style={{ animation: "fadeIn 0.3s ease-out" }}
          >
            {splash.kind === "ring" ? "Ring collected" : "Location discovered"}
          </p>
          <p
            className="mt-1 font-display text-5xl tracking-wide text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] sm:text-6xl"
            style={{ animation: "fadeIn 0.35s ease-out" }}
          >
            {splash.name}
          </p>
          <p className="mt-1 max-w-xs text-xs leading-relaxed text-slate-300 drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
            {splash.blurb}
          </p>
        </div>
      )}

      {/* field log panel */}
      {showList && started && (
        <div className="absolute bottom-4 right-4 top-16 w-64 overflow-y-auto rounded-md border border-border/70 bg-black/70 p-3 backdrop-blur-md sm:right-auto sm:left-4 sm:w-72">
          <div className="mb-3 flex items-center justify-between border-b border-border/60 pb-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-lime-300/80">
              Field Log
            </p>
            <button
              onClick={() => setShowList(false)}
              className="text-slate-400 hover:text-foreground"
              aria-label="Close field log"
            >
              <X className="size-4" />
            </button>
          </div>
          <ul className="space-y-0.5">
            {explorePois.map((p, i) => {
              const ok = found.has(p.slug);
              return (
                <li
                  key={p.slug}
                  className={cn(
                    "flex items-center gap-2.5 rounded px-2 py-1.5 text-xs",
                    ok ? "text-brand" : "text-slate-400"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-4 shrink-0 items-center justify-center rounded-sm border",
                      ok ? "border-brand bg-brand/20" : "border-slate-700"
                    )}
                  >
                    {ok && <Check className="size-3" />}
                  </span>
                  <span className="font-mono text-[9px] text-slate-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {p.name}
                </li>
              );
            })}
          </ul>
          <p className="mt-3 border-t border-border/60 pt-2 font-mono text-[9px] uppercase tracking-widest text-amber-300/80">
            Golden rings — {ringsFound.size}/{exploreRings.length}
          </p>
        </div>
      )}

      {/* all discovered */}
      {allFound && started && (
        <div className="pointer-events-none absolute left-1/2 top-1/3 w-full max-w-md -translate-x-1/2 px-4">
          <div className="rounded-lg border border-brand/60 bg-black/85 p-6 text-center shadow-[0_0_80px_-10px_rgba(182,243,74,0.6)] backdrop-blur">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-brand">
              Mission complete
            </p>
            <p className="mt-2 font-display text-4xl tracking-wide text-white">
              LEONIDA EXPLORED
            </p>
            <p className="mt-2 text-sm text-slate-300">
              All {explorePois.length} locations discovered
              {ringsFound.size === exploreRings.length
                ? " — every golden ring too."
                : ` — ${exploreRings.length - ringsFound.size} golden rings still out there.`}
            </p>
          </div>
        </div>
      )}

      {/* touch controls */}
      {isTouch && started && (
        <div className="absolute bottom-44 left-1/2 flex w-full max-w-sm -translate-x-1/2 items-end justify-between px-6">
          <div className="flex gap-2">
            {(
              [
                { code: "KeyA", icon: ChevronLeft, label: "Steer left" },
                { code: "KeyD", icon: ChevronRight, label: "Steer right" },
              ] as const
            ).map((b) => (
              <button
                key={b.code}
                aria-label={b.label}
                className="flex size-14 items-center justify-center rounded-full border border-slate-500/60 bg-black/55 text-foreground backdrop-blur active:border-brand active:bg-brand/25"
                onTouchStart={() => (keysRef.current[b.code] = true)}
                onTouchEnd={() => (keysRef.current[b.code] = false)}
                onTouchCancel={() => (keysRef.current[b.code] = false)}
              >
                <b.icon className="size-6" />
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {(
              [
                { code: "ShiftLeft", icon: ChevronDown, label: "Descend" },
                { code: "Space", icon: Circle, label: "Climb" },
                { code: "KeyW", icon: ChevronUp, label: "Throttle" },
              ] as const
            ).map((b) => (
              <button
                key={b.code}
                aria-label={b.label}
                className="flex size-14 items-center justify-center rounded-full border border-slate-500/60 bg-black/55 text-foreground backdrop-blur active:border-brand active:bg-brand/25"
                onTouchStart={() => (keysRef.current[b.code] = true)}
                onTouchEnd={() => (keysRef.current[b.code] = false)}
                onTouchCancel={() => (keysRef.current[b.code] = false)}
              >
                <b.icon className="size-6" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* intro overlay */}
      {!started && webglOk && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#04090f]/85 p-4 backdrop-blur-sm">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.8) 3px)",
            }}
          />
          <div className="relative w-full max-w-xl">
            <div className="pointer-events-none absolute -inset-px rounded-xl bg-gradient-to-b from-lime-300/40 via-transparent to-cyan-400/30" />
            <div className="relative overflow-hidden rounded-xl border border-lime-300/30 bg-[#070d16]/95 p-6 sm:p-9">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime-300/80 to-transparent" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-brand">
                  <Compass className="size-4" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.4em]">
                    Interactive toy
                  </p>
                </div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
                  v1.0
                </p>
              </div>
              <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-wide text-white drop-shadow-[0_0_25px_rgba(182,243,74,0.25)] sm:text-6xl">
                LEONIDA
                <br />
                <span className="text-brand">3D EXPLORER</span>
              </h1>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-300">
                Pilot an Everglades fan boat across a stylized, fan-made diorama
                of Leonida. Fly near each pink beacon to discover{" "}
                {explorePois.length} real locations — and hunt{" "}
                {exploreRings.length} golden rings while you’re at it.
              </p>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {[
                  { n: explorePois.length, l: "locations" },
                  { n: exploreRings.length, l: "golden rings" },
                  { n: "1", l: "fan boat" },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="rounded-md border border-border/70 bg-slate-900/60 px-3 py-2.5 text-center"
                  >
                    <p className="font-display text-2xl leading-none text-brand">
                      {s.n}
                    </p>
                    <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-slate-400">
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid gap-1.5 rounded-md border border-border/60 bg-slate-900/40 p-4 sm:grid-cols-2">
                {KEY_ROWS.map((r) => (
                  <div key={r.keys} className="flex items-center gap-3 text-xs">
                    <kbd className="w-20 shrink-0 rounded border border-slate-600 bg-black/60 px-1.5 py-0.5 text-center font-mono text-[10px] text-lime-300 shadow-[0_2px_0_rgba(255,255,255,0.08)]">
                      {r.keys}
                    </kbd>
                    <span className="text-slate-400">{r.action}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setStarted(true)}
                className="group mt-6 flex w-full items-center justify-center gap-3 rounded-md bg-brand px-4 py-3.5 font-display text-xl tracking-widest text-background transition-all hover:shadow-[0_0_35px_-5px_rgba(182,243,74,0.7)]"
              >
                <Play className="size-5 fill-current" />
                START ENGINE
              </button>
              <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-widest text-slate-500">
                Fan-made diorama — stylized, not to scale · progress saves
                locally
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
