"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ArrowRight, MapPin, PanelLeft, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { EntityCover } from "@/components/entity-cover";
import { VerificationBadge } from "@/components/verification-badge";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import type { MapPoint } from "@/lib/map-provider";
import type { MapCategory } from "@/lib/types";

interface CategoryMeta {
  id: MapCategory;
  label: string;
  color: string;
}

/**
 * Base map: the YANIS community map by the State of Leonida mapping
 * project (map.stateofleonida.net), self-hosted as a single stitched
 * image (public/leonida-base.webp) rather than hotlinked tiles. It's a
 * fan-made speculative projection rendered in a custom pixel CRS —
 * hence Leaflet, not MapLibre. Unofficial; the real map arrives with
 * the game.
 */
const MAP_IMAGE_URL = "/leonida-base.webp";
// The source poster's leftmost 3040px (a baked-in legend/credits panel)
// was cropped out, so the west bound starts at lng -10920 instead of
// -17000. East/north/south are unchanged.
const MAP_BOUNDS = L.latLngBounds([
  [-9000, -10920],
  [11000, 4000],
]);

/**
 * Pixel-space CRS: (0,0) sits at the top-left corner of the map bounds and
 * the full canvas spans ORIGINAL_SIZE px at maxNativeZoom, so lat/lng map
 * 1:1 onto the artwork's own coordinate system.
 */
const ORIGINAL_SIZE = { width: 21000, height: 20000 };
const MAX_NATIVE_ZOOM = 6;

const yanisCRS: L.CRS = (() => {
  const south = -9000;
  const west = -17000;
  const north = 11000;
  const east = 4000;
  const pxPerUnitX =
    ORIGINAL_SIZE.width / (east - west) / 2 ** MAX_NATIVE_ZOOM;
  const pxPerUnitY =
    ORIGINAL_SIZE.height / (north - south) / 2 ** MAX_NATIVE_ZOOM;
  return L.extend({}, L.CRS.Simple, {
    transformation: new L.Transformation(
      pxPerUnitX,
      -west * pxPerUnitX,
      -pxPerUnitY,
      north * pxPerUnitY,
    ),
    scale: (zoom: number) => 2 ** zoom,
    zoom: (scale: number) => Math.log(scale) / Math.LN2,
  });
})();
const TILE_ATTRIBUTION =
  'Map artwork © <a href="https://map.stateofleonida.net" target="_blank" rel="noopener noreferrer">YANIS — State of Leonida</a> community project (unofficial fan projection)';

export default function MapCanvas({
  points,
  categories,
}: {
  points: MapPoint[];
  categories: CategoryMeta[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const [ready, setReady] = useState(false);
  const [selected, setSelected] = useState<MapPoint | null>(null);
  const [query, setQuery] = useState("");
  const [enabled, setEnabled] = useState<Set<MapCategory>>(
    () => new Set(categories.map((c) => c.id)),
  );
  const [panelOpen, setPanelOpen] = useState(true);

  const colorByCategory = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.id, c.color])),
    [categories],
  );

  const visible = useMemo(
    () =>
      points.filter(
        (p) =>
          enabled.has(p.category) &&
          (!query.trim() ||
            p.name.toLowerCase().includes(query.trim().toLowerCase())),
      ),
    [points, enabled, query],
  );

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      crs: yanisCRS,
      minZoom: 0,
      maxZoom: 8,
      zoomControl: false,
      attributionControl: true,
      zoomSnap: 0.25,
      zoomDelta: 0.5,
    });

    L.control.zoom({ position: "topright" }).addTo(map);

    L.imageOverlay(MAP_IMAGE_URL, MAP_BOUNDS, {
      attribution: TILE_ATTRIBUTION,
    }).addTo(map);

    map.setMaxBounds(MAP_BOUNDS.pad(0.3));
    map.fitBounds(MAP_BOUNDS);
    map.on("zoomend", () => trackEvent("map_interaction", { type: "zoom" }));

    mapRef.current = map;
    setReady(true);
    const markers = markersRef.current;

    return () => {
      markers.forEach((m) => m.remove());
      markers.clear();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  const focusPoint = useCallback((point: MapPoint) => {
    const map = mapRef.current;
    if (!map) return;
    map.flyTo(
      [point.coordinates.y, point.coordinates.x],
      Math.max(map.getZoom(), 4),
      { duration: 0.8 },
    );
    trackEvent("map_interaction", { type: "focus", id: point.id });
  }, []);

  const selectPoint = useCallback(
    (point: MapPoint) => {
      setSelected(point);
      setPanelOpen(true);
      focusPoint(point);
    },
    [focusPoint],
  );

  // Deep-link: /map?focus=<slug> selects & flies to a point on load.
  useEffect(() => {
    if (!ready) return;
    const slug = new URLSearchParams(window.location.search).get("focus");
    if (!slug) return;
    const p = points.find((x) => x.slug === slug);
    if (!p) return;
    const id = setTimeout(() => selectPoint(p), 0);
    return () => clearTimeout(id);
  }, [ready, points, selectPoint]);

  useEffect(() => {
    if (!ready || !mapRef.current) return;
    const map = mapRef.current;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current.clear();

    for (const point of visible) {
      const color = colorByCategory[point.category] ?? "#b6f34a";
      const icon = L.divIcon({
        className: "atlas-marker",
        html: `<button type="button" class="map-marker" aria-label="${point.name.replace(/"/g, "&quot;")}" style="background-color:${color}"></button>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });
      const latLng: L.LatLngExpression = [
        point.coordinates.y,
        point.coordinates.x,
      ];

      const marker = L.marker(latLng, {
        icon,
        bubblingMouseEvents: false,
      }).addTo(map);
      marker.on("click", () => {
        trackEvent("map_interaction", { type: "marker_click", id: point.id });
        selectPoint(point);
      });

      markersRef.current.set(point.id, marker);
    }
  }, [ready, visible, colorByCategory, selectPoint]);

  const toggleCategory = (id: MapCategory, checked: boolean) => {
    setEnabled((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  return (
    <div className="relative flex h-[calc(100dvh-3.5rem)] min-h-[480px] w-full overflow-hidden">
      <div
        ref={containerRef}
        className="atlas-leaflet h-full w-full"
        aria-label="Interactive map of Leonida"
      />

      {/* Control panel */}
      <aside
        className={cn(
          "absolute left-0 top-0 z-[1000] flex h-full w-80 flex-col border-r border-border bg-card/95 backdrop-blur transition-transform duration-200",
          !panelOpen && "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <p className="text-sm font-semibold">Map Layers</p>
          <Button
            variant="ghost"
            size="icon"
            className="size-7"
            onClick={() => setPanelOpen(false)}
            aria-label="Hide map panel"
          >
            <X className="size-4" />
          </Button>
        </div>
        <div className="border-b border-border p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search map markers..."
              aria-label="Search map markers"
              className="pl-9"
            />
          </div>
        </div>
        <div className="border-b border-border p-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Categories
          </p>
          <ul className="grid grid-cols-1 gap-2.5">
            {categories.map((c) => (
              <li key={c.id} className="flex items-center gap-2.5">
                <Checkbox
                  id={`cat-${c.id}`}
                  checked={enabled.has(c.id)}
                  onCheckedChange={(v) => toggleCategory(c.id, v === true)}
                />
                <label
                  htmlFor={`cat-${c.id}`}
                  className="flex cursor-pointer items-center gap-2 text-sm"
                >
                  <span
                    className="inline-block size-2.5 rounded-full"
                    style={{ backgroundColor: c.color }}
                  />
                  {c.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          {selected && (
            <div className="mb-3 overflow-hidden rounded-lg border border-border bg-surface-2">
              <div className="relative">
                <EntityCover name={selected.name} image={selected.image} />
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="Close details"
                  className="absolute right-2 top-2 flex size-6 items-center justify-center rounded-full bg-background/80 text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
                >
                  <X className="size-3.5" />
                </button>
              </div>
              <div className="space-y-2.5 p-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold">{selected.name}</p>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {categories.find((c) => c.id === selected.category)
                        ?.label ?? "Point of Interest"}
                    </p>
                  </div>
                  {selected.verificationStatus && (
                    <VerificationBadge status={selected.verificationStatus} />
                  )}
                </div>
                {selected.description && (
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {selected.description}
                  </p>
                )}
                {selected.href && (
                  <Link
                    href={selected.href}
                    className="inline-flex items-center gap-1 text-xs font-medium text-brand-cyan hover:underline"
                  >
                    View full details <ArrowRight className="size-3" />
                  </Link>
                )}
                {selected.sources && selected.sources.length > 0 && (
                  <p className="border-t border-border/60 pt-2 text-[10px] leading-relaxed text-muted-foreground">
                    Source:{" "}
                    <a
                      href={selected.sources[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2"
                    >
                      {selected.sources[0].label}
                    </a>
                  </p>
                )}
              </div>
            </div>
          )}
          {points.length > 0 ? (
            <ul className="space-y-1">
              {visible.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => selectPoint(p)}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm hover:bg-surface-2",
                      selected?.id === p.id && "bg-surface-2 text-brand",
                    )}
                    aria-current={selected?.id === p.id}
                  >
                    <span
                      className="inline-block size-2.5 shrink-0 rounded-full"
                      style={{
                        backgroundColor:
                          colorByCategory[p.category] ?? "#b6f34a",
                      }}
                    />
                    <span className="truncate">{p.name}</span>
                  </button>
                </li>
              ))}
              {visible.length === 0 && (
                <li className="px-2 py-4 text-sm text-muted-foreground">
                  No markers match your filters.
                </li>
              )}
            </ul>
          ) : (
            <div className="rounded-md border border-dashed border-border p-4 text-center">
              <MapPin className="mx-auto mb-2 size-5 text-muted-foreground" />
              <p className="text-sm font-medium">No verified map data yet</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                GTA VI&apos;s world map hasn&apos;t been published. Markers for
                missions, collectibles, shops and more will appear here as
                in-game data is verified after release.
              </p>
            </div>
          )}
        </div>
        {points.length > 0 && (
          <div className="border-t border-border p-3">
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              Base map by the YANIS community mapping project (unofficial fan
              projection). Marker positions are community estimates — not the
              official in-game map.
            </p>
          </div>
        )}
      </aside>

      {!panelOpen && (
        <Button
          variant="secondary"
          size="icon"
          className="absolute left-3 top-3 z-[1000]"
          onClick={() => setPanelOpen(true)}
          aria-label="Show map panel"
        >
          <PanelLeft className="size-4" />
        </Button>
      )}

      {/* Disclaimer */}
      {points.length > 0 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-4 z-[1000] flex justify-center px-4">
          <div className="pointer-events-auto rounded-md border border-border bg-card/90 px-3 py-1.5 text-center backdrop-blur">
            <p className="text-[11px] text-muted-foreground">
              Community-made speculative map (YANIS / State of Leonida) — not
              the official in-game map. Official world map arrives Nov 19,
              2026.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
