import { ogCard, ogSize } from "@/lib/og-card";

export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    kicker: "Official Videos",
    kickerColor: "#F4655A",
    title: "GTA6 Atlas",
    subtitle: "Every Rockstar GTA VI trailer — watch in one place",
  });
}
