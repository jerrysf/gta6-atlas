import { ogCard, ogSize } from "@/lib/og-card";

export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    kicker: "Music & Soundtrack",
    kickerColor: "#F472B6",
    title: "GTA6 Atlas",
    subtitle: "Confirmed tracks + Grand Theft Auto VI: The Album",
  });
}
