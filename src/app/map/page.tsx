import type { Metadata } from "next";
import { MapApp } from "@/components/map/map-app";
import { mapProvider } from "@/lib/map-provider";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Interactive GTA 6 Map — Explore Leonida",
  description:
    "Explore the world of Grand Theft Auto VI on the GTA6 Atlas interactive map — locations, missions, collectibles, shops and hidden secrets across Leonida.",
  path: "/map",
});

export default async function MapPage() {
  const points = await mapProvider.getPoints();
  return (
    <div className="relative">
      <h1 className="sr-only">Interactive GTA 6 Map — Leonida</h1>
      <MapApp points={points} />
    </div>
  );
}
