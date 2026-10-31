import { ogCard, ogSize } from "@/lib/og-card";

export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    kicker: "Interactive Mini-Game",
    kickerColor: "#5ADFFF",
    title: "Leonida 3D Explorer",
    subtitle: "Fly a fan boat across a fan-made GTA 6 map diorama",
  });
}
