import { collectibles, secrets } from "@/data/collectibles";
import { ogCard, ogSize } from "@/lib/og-card";

const all = [...collectibles, ...secrets];

export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return all.map((c) => ({ slug: c.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = all.find((x) => x.slug === slug);
  return ogCard({
    kicker: "Collectibles & Secrets",
    kickerColor: "#FACC15",
    title: c?.name ?? "GTA 6 Collectible",
    subtitle: c?.category,
  });
}
