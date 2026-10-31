import { ogCard, ogSize } from "@/lib/og-card";

export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    kicker: "GTA 6 by the Numbers",
    kickerColor: "#B6F34A",
    title: "GTA6 Atlas",
    subtitle: "Records, stats & confirmed facts",
  });
}
