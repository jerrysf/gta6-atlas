import { ogCard, ogSize } from "@/lib/og-card";

export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    kicker: "Confirmed Cast",
    kickerColor: "#B48CF2",
    title: "GTA6 Atlas",
    subtitle: "Lucia, Jason & the supporting cast of Leonida",
  });
}
