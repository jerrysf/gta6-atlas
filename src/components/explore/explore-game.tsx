"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Compass, List, Play, RotateCcw, X } from "lucide-react";
import { explorePois } from "@/data/explore";
import { ExploreScene } from "@/components/explore/scene";
import { cn } from "@/lib/utils";

const KEY_ROWS: { keys: string; action: string }[] = [
  { keys: "W / S", action: "Throttle forward / reverse" },
  { keys: "A / D", action: "Steer the fan boat" },
  { keys: "Space", action: "Climb — fly over terrain" },
  { keys: "Shift", action: "Descend" },
  { keys: "R", action: "Reset position" },
];

export function ExploreGame() {
  const [started, setStarted] = useState(false);
  const [found, setFound] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<{ name: string; blurb: string } | null>(null);
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
  const foundRef = useRef<Set<string>>(new Set());
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);


  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
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

  const onDiscover = useCallback((slug: string) => {
    const poi = explorePois.find((p) => p.slug === slug);
    if (!poi) return;
    setFound(new Set(foundRef.current));
    setToast({ name: poi.name, blurb: poi.blurb });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 4200);
  }, []);

  const allFound = found.size === explorePois.length;

  return (
    <div className="relative h-[calc(100vh-4rem)] min-h-[540px] w-full overflow-hidden bg-[#070d18]">
      {webglOk ? (
        <ExploreScene
          found={found}
          keysRef={keysRef}
          foundRef={foundRef}
          onDiscover={onDiscover}
        />
      ) : (
        <div className="flex h-full items-center justify-center p-8 text-center text-muted-foreground">
          Your browser could not create a WebGL context — the 3D Explorer needs
          hardware acceleration enabled.
        </div>
      )}

      {/* top-left HUD */}
      <div className="pointer-events-none absolute left-4 top-4 space-y-2">
        <div className="rounded-lg border border-border bg-card/80 px-3 py-2 backdrop-blur">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Leonida discovered
          </p>
          <p className="font-display text-2xl leading-none tracking-wide text-brand">
            {found.size}
            <span className="text-sm text-muted-foreground">
              {" "}
              / {explorePois.length}
            </span>
          </p>
        </div>
        <p className="max-w-[240px] rounded-md bg-background/60 px-2 py-1 font-mono text-[10px] leading-relaxed text-muted-foreground backdrop-blur">
          Fan-made stylized diorama — not to scale, not the official map.
        </p>
      </div>

      {/* top-right buttons */}
      <div className="absolute right-4 top-4 flex gap-2">
        <button
          onClick={() => setShowList((v) => !v)}
          className="flex items-center gap-2 rounded-lg border border-border bg-card/80 px-3 py-2 text-xs font-medium backdrop-blur transition-colors hover:border-brand/50 hover:text-brand"
        >
          <List className="size-4" />
          Checklist
        </button>
        <button
          onClick={() => {
            keysRef.current["KeyR"] = true;
          }}
          className="flex items-center gap-2 rounded-lg border border-border bg-card/80 px-3 py-2 text-xs font-medium backdrop-blur transition-colors hover:border-brand/50 hover:text-brand"
        >
          <RotateCcw className="size-4" />
          Reset
        </button>
      </div>

      {/* discovery toast */}
      {toast && (
        <div className="pointer-events-none absolute left-1/2 top-16 w-full max-w-sm -translate-x-1/2 px-4">
          <div className="rounded-lg border border-brand/40 bg-card/90 p-4 text-center shadow-[0_0_40px_-10px_rgba(182,243,74,0.4)] backdrop-blur">
            <p className="font-mono text-[10px] uppercase tracking-widest text-brand">
              Location discovered
            </p>
            <p className="mt-1 font-display text-xl tracking-wide">{toast.name}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {toast.blurb}
            </p>
          </div>
        </div>
      )}

      {/* all discovered */}
      {allFound && (
        <div className="pointer-events-none absolute left-1/2 top-1/3 w-full max-w-md -translate-x-1/2 px-4">
          <div className="rounded-xl border border-brand/50 bg-card/95 p-6 text-center shadow-[0_0_60px_-10px_rgba(182,243,74,0.5)] backdrop-blur">
            <p className="font-display text-3xl tracking-wide text-brand">
              LEONIDA EXPLORED
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              All {explorePois.length} locations discovered. November 19, 2026
              can’t come soon enough.
            </p>
          </div>
        </div>
      )}

      {/* checklist panel */}
      {showList && (
        <div className="absolute bottom-4 right-4 top-24 w-64 overflow-y-auto rounded-lg border border-border bg-card/90 p-3 backdrop-blur">
          <div className="mb-2 flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Checklist
            </p>
            <button
              onClick={() => setShowList(false)}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Close checklist"
            >
              <X className="size-4" />
            </button>
          </div>
          <ul className="space-y-1">
            {explorePois.map((p) => {
              const ok = found.has(p.slug);
              return (
                <li
                  key={p.slug}
                  className={cn(
                    "flex items-center gap-2 rounded px-2 py-1.5 text-xs",
                    ok ? "text-brand" : "text-muted-foreground"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-4 items-center justify-center rounded-sm border",
                      ok ? "border-brand bg-brand/20" : "border-border"
                    )}
                  >
                    {ok && <Check className="size-3" />}
                  </span>
                  {p.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* controls hint */}
      <div className="pointer-events-none absolute bottom-4 left-4 hidden gap-3 rounded-lg border border-border bg-card/80 px-3 py-2 font-mono text-[10px] text-muted-foreground backdrop-blur sm:flex">
        <span>
          <b className="text-foreground">WASD</b> drive
        </span>
        <span>
          <b className="text-foreground">SPACE</b> climb
        </span>
        <span>
          <b className="text-foreground">SHIFT</b> descend
        </span>
        <span>
          <b className="text-foreground">R</b> reset
        </span>
      </div>

      {/* intro overlay */}
      {!started && webglOk && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-xl border border-border bg-card p-6 sm:p-8">
            <div className="flex items-center gap-2 text-brand">
              <Compass className="size-5" />
              <p className="font-mono text-[10px] uppercase tracking-[0.3em]">
                Interactive toy
              </p>
            </div>
            <h1 className="mt-3 font-display text-4xl tracking-wide">
              LEONIDA 3D EXPLORER
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Pilot an Everglades fan boat across a stylized, fan-made diorama
              of Leonida. Fly near each pink beacon to discover{" "}
              {explorePois.length} real locations from official GTA VI media —
              from the Vice City skyline to the Leonida Keys.
            </p>
            <div className="mt-5 space-y-1.5 rounded-lg border border-border bg-surface-2/50 p-4">
              {KEY_ROWS.map((r) => (
                <div key={r.keys} className="flex items-center gap-3 text-xs">
                  <kbd className="w-20 rounded border border-border bg-card px-1.5 py-0.5 text-center font-mono text-[10px] text-brand">
                    {r.keys}
                  </kbd>
                  <span className="text-muted-foreground">{r.action}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setStarted(true)}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-4 py-3 font-display text-lg tracking-wide text-background transition-colors hover:bg-brand/90"
            >
              <Play className="size-5" />
              Start exploring
            </button>
            <p className="mt-3 text-center font-mono text-[10px] leading-relaxed text-muted-foreground">
              Fan-made diorama for fun — landmasses are stylized and not to
              scale. Best experienced on desktop with a keyboard.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
