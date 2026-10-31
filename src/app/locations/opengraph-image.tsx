import { ogCard, ogSize } from "@/lib/og-card";

export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    kicker: "Leonida Locations",
    kickerColor: "#4ADE80",
    title: "GTA6 Atlas",
    subtitle: "Every confirmed region — Vice City, the Keys & beyond",
  });
}
