import { ogCard, ogSize } from "@/lib/og-card";

export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    kicker: "Guides & Walkthroughs",
    kickerColor: "#B6F34A",
    title: "GTA6 Atlas",
    subtitle: "29 in-depth GTA 6 guides — every answer sourced",
  });
}
