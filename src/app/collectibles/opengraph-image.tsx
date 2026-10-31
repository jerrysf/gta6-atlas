import { ogCard, ogSize } from "@/lib/og-card";

export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    kicker: "Collectibles & Secrets",
    kickerColor: "#FACC15",
    title: "GTA6 Atlas",
    subtitle: "Hidden items and easter eggs across Leonida",
  });
}
