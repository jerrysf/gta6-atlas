import { weapons } from "@/data/weapons";
import { ogCard, ogSize } from "@/lib/og-card";

export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return weapons.map((w) => ({ slug: w.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const w = weapons.find((x) => x.slug === slug);
  const subtitle = [w?.category, w?.basedOn && `Based on ${w.basedOn}`]
    .filter(Boolean)
    .join(" · ");
  return ogCard({
    kicker: "Weapon Database",
    kickerColor: "#F4655A",
    title: w?.name ?? "GTA 6 Weapon",
    subtitle: subtitle || undefined,
  });
}
