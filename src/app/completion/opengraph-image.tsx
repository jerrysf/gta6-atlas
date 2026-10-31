import { ogCard, ogSize } from "@/lib/og-card";

export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    kicker: "100% Completion",
    kickerColor: "#B6F34A",
    title: "GTA6 Atlas",
    subtitle: "Track your journey to full completion",
  });
}
