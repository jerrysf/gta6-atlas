import type { Metadata } from "next";
import ExploreClient from "@/components/explore/explore-client";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "South Florida Roam — Explore the Real Map Behind GTA 6",
  description:
    "Roam the real South Florida that Leonida is built on: zoom across Miami, the Everglades and the Keys to log all 16 GTA VI locations at their real-world inspirations.",
  path: "/explore",
});

export default function ExplorePage() {
  return <ExploreClient />;
}
