"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Check, Crosshair, List, Play, RotateCcw, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DISCOVER_RADIUS_PX,
  DISCOVER_ZOOM,
  roamLandmarks,
  roamPois,
  roamStashes,
  ROAM_BOUNDS,
  ROAM_START,
  type ExploreSpot,
} from "@/data/explore-miami";

const STORAGE_KEY = "gta6atlas-roam-progress-v1";

type Kind = "poi" | "landmark" | "stash";

const KIND_COLOR: Record<Kind, string> = {
  poi: "#f0518f",
  landmark: "#ffc94d",
  stash: "#5adfff",
};

interface Saved {
  found: string[];
  landmarks: string[];
  stashes: string[];
}

function loadSaved(): Saved {
  if (typeof window === "undefined") return { found: [], landmarks: [], stashes: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const p = JSON.parse(raw) as Partial<Saved>;
      return {
        found: p.found ?? [],
        landmarks: p.landmarks ?? [],
        stashes: p.stashes ?? [],
      };
    }
  } catch {
    /* fresh start */
  }
  return { found: [], landmarks: [], stashes: [] };
}

function dot(color: string, size = 14, ring = true): L.DivIcon {
  return L.divIcon({
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    html: `<span style="display:block;width:${size}px;height:${size}px;border-radius:9999px;background:${color};${ring ? `box-shadow:0 0 0 2px rgba(7,13,24,.9),0 0 10px ${color};` : ""}"></span>`,
  });
}

function keycap(k: string) {
  return (
    <kbd
      key={k}
      className="inline-flex min-w-5 items-center justify-center rounded border border-white/20 bg-white/10 px-1 py-px font-mono text-[9px] text-white/80"
    >
      {k}
    </kbd>
  );
}

const CONTROLS: { keys: string; action: string }[] = [
  { keys: "Drag / scroll", action: "Pan & zoom the map" },
  { keys: "WASD / arrows", action: "Move" },
  { keys: "+ −", action: "Zoom in / out" },
  { keys: "F", action: "Fly to next target" },
  { keys: "R", action: "Back to Miami" },
  { keys: "Esc", action: "Pause" },
];

export default function ExploreGame() {
  const saved = useMemo(() => loadSaved(), []);
  const [started, setStarted] = useState(false);
  const [found, setFound] = useState<Set<string>>(() => new Set(saved.found));
  const [landmarksFound, setLandmarksFound] = useState<Set<string>>(
    () => new Set(saved.landmarks)
  );
  const [stashesFound, setStashesFound] = useState<Set<string>>(
    () => new Set(saved.stashes)
  );
  const [paused, setPaused] = useState(false);
  const [showList, setShowList] = useState(false);
  const [nextTarget, setNextTarget] = useState<{
    name: string;
    km: number;
  } | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number; z: number }>({
    lat: ROAM_START.lat,
    lng: ROAM_START.lng,
    z: ROAM_START.zoom,
  });
  const [splash, setSplash] = useState<{
    kind: Kind;
    name: string;
    analog: string;
    blurb: string;
    t: number;
  } | null>(null);
  const complete = found.size === roamPois.length;

  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const foundRef = useRef<Set<string>>(new Set(saved.found));
  const landmarksRef = useRef<Set<string>>(new Set(saved.landmarks));
  const stashesRef = useRef<Set<string>>(new Set(saved.stashes));
  const pausedRef = useRef(false);
  const keysRef = useRef<Record<string, boolean>>({});
  const splashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panLoop = useRef<number | null>(null);

  const total = roamPois.length + roamLandmarks.length + roamStashes.length;
  const done = found.size + landmarksFound.size + stashesFound.size;
  const pct = Math.round((done / total) * 100);

  /* ---------- discovery ---------- */

  const discover = useCallback((kind: Kind, spot: ExploreSpot) => {
    const apply = (set: Set<string>, setState: (s: Set<string>) => void) => {
      if (set.has(spot.slug)) return false;
      const next = new Set(set);
      next.add(spot.slug);
      setState(next);
      return true;
    };
    const hit =
      kind === "poi"
        ? apply(foundRef.current, setFound)
        : kind === "landmark"
          ? apply(landmarksRef.current, setLandmarksFound)
          : apply(stashesRef.current, setStashesFound);
    if (!hit) return;
    if (splashTimer.current) clearTimeout(splashTimer.current);
    setSplash({
      kind,
      name: spot.name,
      analog: spot.analog,
      blurb: spot.blurb,
      t: Date.now(),
    });
    splashTimer.current = setTimeout(() => setSplash(null), 4200);
  }, []);

  /* ---------- map lifecycle ---------- */

  useEffect(() => {
    if (!started || !mapEl.current || mapRef.current) return;

    const map = L.map(mapEl.current, {
      center: [ROAM_START.lat, ROAM_START.lng],
      zoom: ROAM_START.zoom,
      minZoom: 9,
      maxZoom: 18,
      maxBounds: ROAM_BOUNDS,
      maxBoundsViscosity: 0.8,
      zoomControl: false,
      attributionControl: true,
      keyboard: false,
      worldCopyJump: false,
    });
    L.control.zoom({ position: "bottomright" }).addTo(map);
    map.attributionControl?.setPrefix(false);
    // Esri World Imagery — real satellite view of South Florida, no key needed.
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        maxZoom: 19,
        keepBuffer: 6,
        updateWhenIdle: false,
        attribution:
          "Esri, Maxar, Earthstar Geographics & contributors",
      }
    ).addTo(map);
    // light place-name labels designed for satellite imagery
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
      { maxZoom: 19, opacity: 0.85 }
    ).addTo(map);

    const markers = markersRef.current;
    const syncMarkers = () => {
      const z = map.getZoom();
      const ensure = (
        list: ExploreSpot[],
        foundSet: Set<string>,
        kind: Kind,
        hiddenUntilNear: boolean
      ) => {
        for (const s of list) {
          const doneSpot = foundSet.has(s.slug);
          const center = map.getCenter();
          const distKm = center.distanceTo([s.lat, s.lng]) / 1000;
          const visible =
            !doneSpot && (!hiddenUntilNear || (z >= 13 && distKm < 4));
          let m = markers.get(s.slug);
          if (visible && !m) {
            m = L.marker([s.lat, s.lng], {
              icon: dot(KIND_COLOR[kind], kind === "stash" ? 11 : 14),
              title: s.name,
            }).addTo(map);
            markers.set(s.slug, m);
          } else if (!visible && m) {
            m.remove();
            markers.delete(s.slug);
          }
        }
      };
      ensure(roamPois, foundRef.current, "poi", false);
      ensure(roamLandmarks, landmarksRef.current, "landmark", false);
      ensure(roamStashes, stashesRef.current, "stash", true);
    };

    const checkDiscovery = () => {
      if (pausedRef.current) return;
      const z = map.getZoom();
      const cPt = map.latLngToContainerPoint(map.getCenter());
      const probe = (
        list: ExploreSpot[],
        foundSet: Set<string>,
        kind: Kind,
        minZoom: number
      ) => {
        if (z < minZoom) return;
        for (const s of list) {
          if (foundSet.has(s.slug)) continue;
          const pt = map.latLngToContainerPoint([s.lat, s.lng]);
          if (pt.distanceTo(cPt) < DISCOVER_RADIUS_PX) discover(kind, s);
        }
      };
      probe(roamPois, foundRef.current, "poi", DISCOVER_ZOOM);
      probe(roamLandmarks, landmarksRef.current, "landmark", DISCOVER_ZOOM);
      probe(roamStashes, stashesRef.current, "stash", 13);
      syncMarkers();

      // next target = nearest undiscovered
      const c = map.getCenter();
      let best: { name: string; km: number } | null = null;
      for (const s of roamPois) {
        if (foundRef.current.has(s.slug)) continue;
        const km = c.distanceTo([s.lat, s.lng]) / 1000;
        if (!best || km < best.km) best = { name: s.name, km };
      }
      setNextTarget(best);
      setCoords({ lat: c.lat, lng: c.lng, z });
    };

    map.on("move", checkDiscovery);
    map.on("zoomend", checkDiscovery);
    checkDiscovery();
    mapRef.current = map;
    return () => {
      map.off("move", checkDiscovery);
      map.off("zoomend", checkDiscovery);
      map.remove();
      mapRef.current = null;
      markers.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  /* ---------- keyboard + auto-pan ---------- */

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  const flyToNext = () => {
    if (!nextTarget) return;
    const spot =
      roamPois.find((s) => s.name === nextTarget.name) ??
      roamLandmarks.find((s) => s.name === nextTarget.name);
    if (spot) mapRef.current?.flyTo([spot.lat, spot.lng], 13, { duration: 1.6 });
  };

  useEffect(() => {
    if (!started) return;
    const down = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      if (e.code === "Escape") {
        setPaused((p) => !p);
        return;
      }
      if (e.code === "KeyF") {
        flyToNext();
        return;
      }
      if (e.code === "KeyR") {
        mapRef.current?.flyTo([ROAM_START.lat, ROAM_START.lng], ROAM_START.zoom);
        return;
      }
      keysRef.current[e.code] = true;
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code))
        e.preventDefault();
      if (e.code === "Equal" || e.code === "NumpadAdd")
        mapRef.current?.zoomIn();
      if (e.code === "Minus" || e.code === "NumpadSubtract")
        mapRef.current?.zoomOut();
    };
    const up = (e: KeyboardEvent) => {
      keysRef.current[e.code] = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    const step = () => {
      const map = mapRef.current;
      if (map && !pausedRef.current) {
        const k = keysRef.current;
        const dx =
          (k["KeyD"] || k["ArrowRight"] ? 1 : 0) -
          (k["KeyA"] || k["ArrowLeft"] ? 1 : 0);
        const dy =
          (k["KeyS"] || k["ArrowDown"] ? 1 : 0) -
          (k["KeyW"] || k["ArrowUp"] ? 1 : 0);
        if (dx || dy) {
          const px = 7;
          map.panBy([dx * px, dy * px], { animate: false });
        }
      }
      panLoop.current = requestAnimationFrame(step);
    };
    panLoop.current = requestAnimationFrame(step);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      if (panLoop.current) cancelAnimationFrame(panLoop.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  /* ---------- persistence ---------- */

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        found: [...found],
        landmarks: [...landmarksFound],
        stashes: [...stashesFound],
      })
    );
  }, [found, landmarksFound, stashesFound]);

  /* ---------- render ---------- */

  if (!started) {
    return (
      <div className="relative flex h-[calc(100vh-4rem)] min-h-[540px] items-center justify-center overflow-hidden bg-[#070d18] px-4">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, #5adfff 3px, #5adfff 4px)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(4,8,16,0.85))]" />
        <div className="relative w-full max-w-lg rounded-xl border border-white/10 bg-black/70 p-8 shadow-2xl backdrop-blur-md">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-brand">
            Leonida, for real
          </p>
          <h1 className="mt-2 font-display text-5xl tracking-wide text-white">
            SOUTH FLORIDA<span className="text-brand"> ROAM</span>
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Roam the <strong className="text-white">real map</strong> that Leonida
            is built on — Miami is Vice City, the Everglades are the Grassrivers,
            Homestead Speedway is Gellhorn Raceway. Zoom in and center each marker
            to log it. Six curiosities only appear when you get close.
          </p>
          <div className="mt-5 grid grid-cols-3 gap-2 text-center">
            {[
              [roamPois.length, "LOCATIONS", "text-brand"],
              [roamLandmarks.length, "LANDMARKS", "text-amber-300"],
              [roamStashes.length, "HIDDEN", "text-cyan-300"],
            ].map(([n, l, c]) => (
              <div
                key={l as string}
                className="rounded-md border border-white/10 bg-white/5 py-2.5"
              >
                <div className={cn("font-display text-2xl", c)}>{n}</div>
                <div className="font-mono text-[8px] uppercase tracking-widest text-slate-500">
                  {l}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-1.5">
            {CONTROLS.map((c) => (
              <div key={c.keys} className="flex items-center justify-between text-xs">
                <span className="flex gap-1">
                  {c.keys.split(" / ").map(keycap)}
                </span>
                <span className="text-muted-foreground">{c.action}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setStarted(true)}
            className="group mt-6 flex w-full items-center justify-center gap-3 rounded-md bg-brand px-4 py-3.5 font-display text-xl tracking-widest text-background transition-all hover:shadow-[0_0_35px_-5px_rgba(182,243,74,0.7)]"
          >
            <Play className="size-5 fill-current" />
            START ROAMING
          </button>
          <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-widest text-slate-500">
            Real satellite map · Esri/OSM · progress saves locally
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[calc(100vh-4rem)] min-h-[540px] w-full overflow-hidden bg-[#070d18]">
      <div ref={mapEl} className="absolute inset-0" />

      {/* vignette + scanlines */}
      <div className="pointer-events-none absolute inset-0 z-[500] bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(4,8,16,0.5))]" />
      <div
        className="pointer-events-none absolute inset-0 z-[500] opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, #5adfff 3px, #5adfff 4px)",
        }}
      />

      {/* top-center hint */}
      <div className="pointer-events-none absolute left-1/2 top-3 z-[600] -translate-x-1/2 rounded bg-black/50 px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-cyan-300 backdrop-blur">
        Roam the map · center a marker &amp; zoom ≥ 12 to log it · F flies to next
      </div>

      {/* mission widget */}
      <div className="absolute left-3 top-3 z-[600] w-52 rounded-md border border-brand/30 bg-black/70 p-3 backdrop-blur-md">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/70 to-transparent" />
        <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-brand">
          Leonida tour
        </p>
        <div className="mt-1 flex items-end gap-2">
          <span className="font-display text-3xl leading-none text-white">
            {pct}%
          </span>
          <span className="pb-0.5 font-mono text-[9px] text-slate-400">
            {found.size}/16 locations · {landmarksFound.size}/8 landmarks ·{" "}
            {stashesFound.size}/6 hidden
          </span>
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded bg-white/10">
          <div
            className="h-full rounded bg-gradient-to-r from-brand to-cyan-400 transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        {nextTarget && (
          <button
            onClick={flyToNext}
            className="mt-2 flex w-full items-center justify-between rounded border border-white/10 bg-white/5 px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-slate-300 transition-colors hover:border-brand/50 hover:text-brand"
          >
            <span>
              ▸ Next: <span className="text-white">{nextTarget.name}</span>
            </span>
            <span className="text-slate-500">{nextTarget.km.toFixed(1)} km</span>
          </button>
        )}
        <p className="mt-2 border-t border-white/10 pt-2 font-mono text-[8px] leading-relaxed text-slate-500">
          Real South Florida — the world Leonida is based on.
        </p>
      </div>

      {/* top-right controls */}
      <div className="absolute right-3 top-3 z-[600] flex gap-1.5">
        <button
          onClick={() => setShowList((s) => !s)}
          className="flex items-center gap-1.5 rounded border border-white/15 bg-black/60 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-widest text-slate-300 backdrop-blur transition-colors hover:border-brand/50 hover:text-brand"
        >
          <List className="size-3" /> Field log
        </button>
        <button
          onClick={() => mapRef.current?.flyTo([ROAM_START.lat, ROAM_START.lng], ROAM_START.zoom)}
          className="flex items-center gap-1.5 rounded border border-white/15 bg-black/60 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-widest text-slate-300 backdrop-blur transition-colors hover:border-brand/50 hover:text-brand"
        >
          <RotateCcw className="size-3" /> Reset
        </button>
        <button
          onClick={() => setPaused(true)}
          className="flex items-center gap-1.5 rounded border border-white/15 bg-black/60 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-widest text-slate-300 backdrop-blur transition-colors hover:border-brand/50 hover:text-brand"
        >
          ❚❚
        </button>
      </div>

      {/* coords readout */}
      <div className="absolute bottom-3 left-3 z-[600] rounded-md border border-white/10 bg-black/70 px-3 py-2 font-mono text-[10px] text-slate-300 backdrop-blur">
        <span className="text-slate-500">LAT</span> {coords.lat.toFixed(4)}°{" "}
        <span className="text-slate-500">LNG</span> {coords.lng.toFixed(4)}°{" "}
        <span className="text-slate-500">Z</span>{" "}
        <span className={cn(coords.z >= DISCOVER_ZOOM ? "text-brand" : "text-amber-300")}>
          {coords.z.toFixed(0)}
          {coords.z < DISCOVER_ZOOM && " — zoom in"}
        </span>
      </div>

      {/* center reticle */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-[600] -translate-x-1/2 -translate-y-1/2">
        <div
          className="rounded-full border border-dashed border-white/25"
          style={{ width: DISCOVER_RADIUS_PX * 2, height: DISCOVER_RADIUS_PX * 2 }}
        />
        <div className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/60" />
      </div>

      {/* discovery splash */}
      {splash && (
        <div
          key={splash.t}
          className="pointer-events-none absolute bottom-24 left-4 z-[700] animate-[fadeIn_0.4s_ease]"
        >
          <p
            className="font-mono text-[10px] uppercase tracking-[0.4em]"
            style={{ color: KIND_COLOR[splash.kind] }}
          >
            {splash.kind === "poi"
              ? "Location discovered"
              : splash.kind === "landmark"
                ? "Landmark logged"
                : "Hidden spot found"}
          </p>
          <h2 className="mt-1 font-display text-5xl leading-none tracking-wide text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] sm:text-6xl">
            {splash.name}
          </h2>
          <p className="mt-1 max-w-sm font-mono text-[10px] uppercase tracking-wider text-cyan-300">
            ≈ {splash.analog}
          </p>
          <p className="mt-1 max-w-sm text-sm text-slate-300 drop-shadow">
            {splash.blurb}
          </p>
        </div>
      )}

      {/* completion */}
      {complete && (
        <div className="pointer-events-none absolute left-1/2 top-24 z-[700] -translate-x-1/2 animate-[fadeIn_0.6s_ease] rounded-md border border-brand/50 bg-black/80 px-6 py-3 text-center backdrop-blur">
          <p className="font-display text-2xl tracking-widest text-brand">
            LEONIDA EXPLORED
          </p>
          <p className="font-mono text-[9px] uppercase tracking-widest text-slate-400">
            every confirmed location logged — now find the hidden spots
          </p>
        </div>
      )}

      {/* field log */}
      {showList && (
        <div className="absolute right-3 top-12 z-[700] max-h-[60vh] w-64 overflow-y-auto rounded-md border border-white/15 bg-black/80 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-brand">
              Field log
            </p>
            <button onClick={() => setShowList(false)} className="text-slate-400 hover:text-white">
              <X className="size-3.5" />
            </button>
          </div>
          {(
            [
              ["Locations", roamPois, found, "poi"],
              ["Landmarks", roamLandmarks, landmarksFound, "landmark"],
              ["Hidden", roamStashes, stashesFound, "stash"],
            ] as const
          ).map(([label, list, set, kind]) => (
            <div key={label}>
              <p className="px-3 pt-2 font-mono text-[8px] uppercase tracking-widest text-slate-500">
                {label}
              </p>
              <ul className="py-1">
                {list.map((s) => {
                  const got = set.has(s.slug);
                  return (
                    <li
                      key={s.slug}
                      className="flex items-center gap-2 px-3 py-1 text-xs"
                    >
                      <Check
                        className={cn(
                          "size-3",
                          got ? "text-brand" : "text-slate-700"
                        )}
                      />
                      <span className={got ? "text-white" : "text-slate-500"}>
                        {kind === "stash" && !got ? "???" : s.name}
                      </span>
                      {got && (
                        <span className="ml-auto truncate font-mono text-[8px] text-slate-500">
                          {s.analog}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* pause menu */}
      {paused && (
        <div className="absolute inset-0 z-[800] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-72 rounded-md border border-white/15 bg-black/85 p-6 text-center">
            <p className="font-display text-3xl tracking-widest text-white">
              PAUSED
            </p>
            <div className="mt-4 space-y-2">
              <button
                onClick={() => setPaused(false)}
                className="w-full rounded bg-brand px-4 py-2.5 font-display text-lg tracking-widest text-background hover:shadow-[0_0_25px_-5px_rgba(182,243,74,0.7)]"
              >
                RESUME
              </button>
              <button
                onClick={() => {
                  setPaused(false);
                  mapRef.current?.flyTo(
                    [ROAM_START.lat, ROAM_START.lng],
                    ROAM_START.zoom
                  );
                }}
                className="w-full rounded border border-white/20 px-4 py-2 font-mono text-xs uppercase tracking-widest text-slate-300 hover:border-white/50"
              >
                Back to Miami
              </button>
            </div>
            <p className="mt-4 font-mono text-[8px] uppercase tracking-widest text-slate-600">
              ESC to resume
            </p>
          </div>
        </div>
      )}

      {/* touch fly-to */}
      <button
        onClick={flyToNext}
        className="absolute bottom-3 right-3 z-[600] flex items-center gap-1.5 rounded border border-brand/40 bg-black/60 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-widest text-brand backdrop-blur transition-colors hover:bg-brand/10"
      >
        <Crosshair className="size-3" /> Next
      </button>
    </div>
  );
}
