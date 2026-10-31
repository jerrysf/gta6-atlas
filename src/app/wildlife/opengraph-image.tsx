import { ogCard, ogSize } from "@/lib/og-card";

export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    kicker: "Leonida Wildlife",
    kickerColor: "#F5B942",
    title: "GTA6 Atlas",
    subtitle: "Every animal spotted in official GTA VI media",
  });
}
