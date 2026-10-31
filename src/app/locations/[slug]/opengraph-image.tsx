import { locations } from "@/data/locations";
import { ogCard, ogSize } from "@/lib/og-card";

export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const l = locations.find((x) => x.slug === slug);
  return ogCard({
    kicker: "Leonida Locations",
    kickerColor: "#4ADE80",
    title: l?.name ?? "GTA 6 Location",
    subtitle: l?.region,
  });
}
