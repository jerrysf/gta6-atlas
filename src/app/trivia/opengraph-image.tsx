import { ogCard, ogSize } from "@/lib/og-card";

export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    kicker: "Trivia & Fun Facts",
    kickerColor: "#E879F9",
    title: "GTA6 Atlas",
    subtitle: "Community stories, records & lore",
  });
}
