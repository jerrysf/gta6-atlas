import { ogCard, ogSize } from "@/lib/og-card";

export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    kicker: "Road to Launch",
    kickerColor: "#B6F34A",
    title: "GTA6 Atlas",
    subtitle: "Every confirmed event from leak to launch day",
  });
}
