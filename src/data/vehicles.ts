import type { Vehicle } from "@/lib/types";

// No vehicle names have been officially confirmed for GTA VI as of the
// second trailer. Entries must only be added once they are confirmed by
// official materials or verified in-game after release.
export const vehicles: Vehicle[] = [];

export const vehicleCategories = [
  { slug: "cars", label: "Cars" },
  { slug: "motorcycles", label: "Motorcycles" },
  { slug: "boats", label: "Boats" },
  { slug: "aircraft", label: "Aircraft" },
  { slug: "other", label: "Other Vehicles" },
] as const;
