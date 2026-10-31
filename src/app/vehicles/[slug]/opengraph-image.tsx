import { vehicles } from "@/data/vehicles";
import { ogCard, ogSize } from "@/lib/og-card";

export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return vehicles.map((v) => ({ slug: v.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const v = vehicles.find((x) => x.slug === slug);
  const subtitle = [v?.manufacturer, v?.basedOn && `Based on ${v.basedOn}`]
    .filter(Boolean)
    .join(" · ");
  return ogCard({
    kicker: "Vehicle Database",
    kickerColor: "#35C7D9",
    title: v?.name ?? "GTA 6 Vehicle",
    subtitle: subtitle || undefined,
  });
}
