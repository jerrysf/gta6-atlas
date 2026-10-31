import type { Metadata } from "next";
import ExploreClient from "@/components/explore/explore-client";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Leonida 3D Explorer — Fly a Fan Boat Across the GTA 6 Map",
  description:
    "A fan-made 3D diorama of Leonida: pilot an airboat from Vice City to the Leonida Keys and discover 16 real locations from official GTA VI media.",
  path: "/explore",
});

export default function ExplorePage() {
  return <ExploreClient />;
}
