import { ogCard, ogSize } from "@/lib/og-card";

export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    kicker: "Interactive Map",
    kickerColor: "#4ADE80",
    title: "GTA6 Atlas",
    subtitle: "Explore Leonida — 47 documented points of interest",
  });
}
