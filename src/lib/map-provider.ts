import type { MapCategory, SourceReference, VerificationStatus } from "@/lib/types";
import { locations } from "@/data/locations";
import { entityImages, type EntityImage } from "@/data/entity-images";

export interface MapPoint {
  id: string;
  slug: string;
  name: string;
  category: MapCategory;
  description?: string;
  href?: string;
  coordinates: { x: number; y: number };
  verificationStatus?: VerificationStatus;
  sources?: SourceReference[];
  image?: EntityImage;
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
 * Static MVP provider. GTA VI's real world map hasn't been published, so
 * marker coordinates are COMMUNITY ESTIMATES in the pixel coordinate space
 * of our own speculative Leonida artwork (an unofficial fan projection
 * built from trailer analysis). They exist to make the map
 * explorable pre-launch and will be replaced with verified in-game
 * coordinates after Nov 19, 2026. Providers must label estimates
 * honestly — never present them as official.
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
        slug: l.slug,
        name: l.name,
        category: (l.mapCategory ?? "location") as MapCategory,
        description: l.description,
        href: `/locations/${l.slug}`,
        coordinates: l.coordinates as { x: number; y: number },
        verificationStatus: l.verificationStatus,
        sources: l.sourceReferences,
        image: entityImages[l.slug],
      }));
  }
}

export const mapProvider: MapDataProvider = new StaticMapProvider();
