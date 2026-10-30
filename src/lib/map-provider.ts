import type { MapCategory } from "@/lib/types";
import { locations } from "@/data/locations";

export interface MapPoint {
  id: string;
  name: string;
  category: MapCategory;
  description?: string;
  href?: string;
  coordinates: { x: number; y: number };
}

export interface MapDataProvider {
  getPoints(): Promise<MapPoint[]>;
  getCategories(): MapCategory[];
}

export const MAP_CATEGORIES: { id: MapCategory; label: string; color: string }[] = [
  { id: "location", label: "Locations", color: "#35c7d9" },
  { id: "mission", label: "Missions", color: "#b6f34a" },
  { id: "collectible", label: "Collectibles", color: "#f2a33c" },
  { id: "shop", label: "Shops", color: "#9a8cff" },
  { id: "safehouse", label: "Safehouses", color: "#e5b84d" },
  { id: "poi", label: "Points of Interest", color: "#e5484d" },
  { id: "hidden", label: "Hidden Locations", color: "#d94fd8" },
];

/**
 * Static MVP provider. GTA VI's map is fictional and no verified in-game
 * coordinates exist yet — so this returns only high-level confirmed regions
 * as an empty dataset placeholder structure. After release, replace this
 * provider (or back it with Supabase/GeoJSON) without touching the map UI.
 *
 * Confirmed locations are included with coordinates = undefined until the
 * in-game map can be verified — providers MUST NOT invent coordinates.
 */
class StaticMapProvider implements MapDataProvider {
  getCategories(): MapCategory[] {
    return MAP_CATEGORIES.map((c) => c.id);
  }

  async getPoints(): Promise<MapPoint[]> {
    return locations
      .filter((l) => l.coordinates !== undefined)
      .map((l) => ({
        id: l.id,
        name: l.name,
        category: "location" as const,
        description: l.description,
        href: `/locations/${l.slug}`,
        coordinates: l.coordinates as { x: number; y: number },
      }));
  }
}

export const mapProvider: MapDataProvider = new StaticMapProvider();

export function pointsToGeoJSON(points: MapPoint[]): GeoJSON.FeatureCollection {
  return {
    type: "FeatureCollection",
    features: points.map((p) => ({
      type: "Feature",
      geometry: { type: "Point", coordinates: [p.coordinates.x, p.coordinates.y] },
      properties: {
        id: p.id,
        name: p.name,
        category: p.category,
        description: p.description ?? "",
        href: p.href ?? "",
      },
    })),
  };
}
