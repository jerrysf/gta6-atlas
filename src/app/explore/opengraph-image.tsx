import { ogCard, ogSize } from "@/lib/og-card";

export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    kicker: "Interactive Mini-Game",
    kickerColor: "#5ADFFF",
    title: "South Florida Roam",
    subtitle: "Roam the real Miami & the Everglades behind GTA 6",
  });
}
