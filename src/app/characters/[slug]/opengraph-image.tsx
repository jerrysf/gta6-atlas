import { characters } from "@/data/characters";
import { ogCard, ogSize } from "@/lib/og-card";

export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return characters.map((c) => ({ slug: c.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = characters.find((x) => x.slug === slug);
  return ogCard({
    kicker: "Confirmed Cast",
    kickerColor: "#B48CF2",
    title: c?.name ?? "GTA 6 Character",
    subtitle: c?.role,
  });
}
