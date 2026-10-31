import { tracks } from "@/data/music";
import { ogCard, ogSize } from "@/lib/og-card";

export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return tracks.map((t) => ({ slug: t.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = tracks.find((x) => x.slug === slug);
  return ogCard({
    kicker: "Music & Soundtrack",
    kickerColor: "#F472B6",
    title: t?.name ?? "GTA 6 Track",
    subtitle: t?.artist,
  });
}
