import { ogCard, ogSize } from "@/lib/og-card";

export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    kicker: "Site Changelog",
    kickerColor: "#9AA6B2",
    title: "GTA6 Atlas",
    subtitle: "What's new on GTA6 Atlas",
  });
}
