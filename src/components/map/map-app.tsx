"use client";

import dynamic from "next/dynamic";
import type { MapPoint } from "@/lib/map-provider";
import type { MapCategory } from "@/lib/types";
import { MAP_CATEGORIES } from "@/lib/map-provider";

const MapCanvas = dynamic(() => import("@/components/map/map-canvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-background text-sm text-muted-foreground">
      Loading map engine…
    </div>
  ),
});

export function MapApp({
  points,
}: {
  points: MapPoint[];
}) {
  return <MapCanvas points={points} categories={MAP_CATEGORIES} />;
}

export type { MapPoint, MapCategory };
