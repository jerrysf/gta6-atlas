"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Map as MlMap,
  Marker,
  NavigationControl,
  Popup,
  type StyleSpecification,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { MapPin, PanelLeft, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
 * Fictional-world canvas. GTA VI's map is a fictional game world — a real
 * street map would be wrong, so we render a neutral dark grid plane.
 * Verified in-game map imagery/GeoJSON can replace GRID_BOUNDS + the base
 * style later without touching UI logic.
 */
const GRID_BOUNDS: [[number, number], [number, number]] = [
  [-90, -55],
  [90, 55],
];

function gridGeoJSON(): GeoJSON.FeatureCollection {
  const features: GeoJSON.Feature[] = [];
  for (let x = -90; x <= 90; x += 10) {
    features.push({
      type: "Feature",
      geometry: { type: "LineString", coordinates: [[x, -55], [x, 55]] },
      properties: {},
    });
  }
  for (let y = -55; y <= 55; y += 10) {
    features.push({
      type: "Feature",
      geometry: { type: "LineString", coordinates: [[-90, y], [90, y]] },
      properties: {},
    });
  }
  return { type: "FeatureCollection", features };
}

export default function MapCanvas({
  points,
  categories,
}: {
  points: MapPoint[];
  categories: CategoryMeta[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MlMap | null>(null);
  const markersRef = useRef<Map<string, Marker>>(new Map());
  const popupRef = useRef<Popup | null>(null);
  const [ready, setReady] = useState(false);
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

    const style: StyleSpecification = {
      version: 8,
      sources: {
        grid: { type: "geojson", data: gridGeoJSON() },
      },
      layers: [
        {
          id: "background",
          type: "background",
          paint: { "background-color": "#0b0f14" },
        },
        {
          id: "grid",
          type: "line",
          source: "grid",
          paint: { "line-color": "#1a2430", "line-width": 1 },
        },
      ],
    };

    const map = new MlMap({
      container: containerRef.current,
      style,
      center: [0, 0],
      zoom: 1.4,
      minZoom: 0.5,
      maxZoom: 10,
      attributionControl: false,
    });
    map.addControl(new NavigationControl(), "top-right");
    map.fitBounds(GRID_BOUNDS, { padding: 40, duration: 0 });
    map.on("load", () => setReady(true));
    map.on("zoom", () => trackEvent("map_interaction", { type: "zoom" }));
    mapRef.current = map;
    const markers = markersRef.current;

    return () => {
      popupRef.current?.remove();
      markers.forEach((m) => m.remove());
      markers.clear();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!ready || !mapRef.current) return;
    const map = mapRef.current;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current.clear();

    for (const point of visible) {
      const el = document.createElement("button");
      el.type = "button";
      el.className = "map-marker";
      el.setAttribute("aria-label", point.name);
      el.style.backgroundColor = colorByCategory[point.category] ?? "#b6f34a";

      const marker = new Marker({ element: el })
        .setLngLat([point.coordinates.x, point.coordinates.y])
        .addTo(map);

      el.addEventListener("click", () => {
        trackEvent("map_interaction", { type: "marker_click", id: point.id });
        popupRef.current?.remove();
        const popup = new Popup({
          closeButton: true,
          maxWidth: "280px",
          className: "atlas-popup",
        })
          .setLngLat([point.coordinates.x, point.coordinates.y])
          .setHTML(
            `<div class="p-1">
              <p class="font-semibold text-sm">${point.name}</p>
              ${point.description ? `<p class="mt-1 text-xs opacity-80">${point.description}</p>` : ""}
              ${point.href ? `<a class="mt-2 inline-block text-xs font-medium underline" href="${point.href}">View details →</a>` : ""}
            </div>`,
          )
          .addTo(map);
        popupRef.current = popup;
      });

      markersRef.current.set(point.id, marker);
    }
  }, [ready, visible, colorByCategory]);

  const focusPoint = (point: MapPoint) => {
    mapRef.current?.flyTo({
      center: [point.coordinates.x, point.coordinates.y],
      zoom: Math.max(mapRef.current.getZoom(), 4),
      duration: 800,
    });
    trackEvent("map_interaction", { type: "focus", id: point.id });
  };

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
        className="absolute inset-0"
        aria-label="Interactive map of Leonida"
      />

      {/* Control panel */}
      <aside
        className={cn(
          "absolute left-0 top-0 z-10 flex h-full w-72 flex-col border-r border-border bg-card/95 backdrop-blur transition-transform duration-200",
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
          {points.length > 0 ? (
            <ul className="space-y-1">
              {visible.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => focusPoint(p)}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm hover:bg-surface-2"
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
              Marker positions are community estimates from trailer analysis on
              a schematic canvas — not the official in-game map.
            </p>
          </div>
        )}
      </aside>

      {!panelOpen && (
        <Button
          variant="secondary"
          size="icon"
          className="absolute left-3 top-3 z-10"
          onClick={() => setPanelOpen(true)}
          aria-label="Show map panel"
        >
          <PanelLeft className="size-4" />
        </Button>
      )}

      {/* Schematic-canvas disclaimer */}
      {points.length > 0 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-4 z-10 flex justify-center px-4">
          <div className="pointer-events-auto rounded-md border border-border bg-card/90 px-3 py-1.5 text-center backdrop-blur">
            <p className="text-[11px] text-muted-foreground">
              Schematic map — community-estimated positions. Official world map
              arrives with the game on Nov 19, 2026.
            </p>
          </div>
        </div>
      )}

      {/* Honest empty-state overlay for the fictional world */}
      {points.length === 0 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center px-4">
          <div className="pointer-events-auto max-w-lg rounded-lg border border-brand-cyan/30 bg-card/95 p-4 text-center shadow-lg backdrop-blur">
            <p className="text-sm font-semibold">
              Leonida map data pending verification
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              GTA VI launches November 19, 2026. Once the game is out, we&apos;ll
              chart the real world of Leonida — locations, missions,
              collectibles and hidden secrets — as it&apos;s verified. This
              canvas is a functional placeholder, not the in-game map.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
