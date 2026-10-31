import { ogCard, ogSize } from "@/lib/og-card";

export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    kicker: "Vehicle Database",
    kickerColor: "#35C7D9",
    title: "GTA6 Atlas",
    subtitle: "44 vehicles catalogued — cars, bikes, boats & aircraft",
  });
}
