import { ogCard, ogSize } from "@/lib/og-card";

export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    kicker: "Weapon Database",
    kickerColor: "#F4655A",
    title: "GTA6 Atlas",
    subtitle: "20 weapons confirmed & spotted — pistols, rifles, heavy",
  });
}
