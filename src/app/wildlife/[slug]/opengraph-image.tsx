import { animals } from "@/data/animals";
import { ogCard, ogSize } from "@/lib/og-card";

export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return animals.map((a) => ({ slug: a.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = animals.find((x) => x.slug === slug);
  return ogCard({
    kicker: "Leonida Wildlife",
    kickerColor: "#F5B942",
    title: a?.name ?? "GTA 6 Animal",
    subtitle: a ? `Class: ${a.class}` : undefined,
  });
}
