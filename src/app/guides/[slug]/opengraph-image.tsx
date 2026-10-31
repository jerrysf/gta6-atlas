import { getGuide, getGuideSlugs } from "@/lib/mdx";
import { guideCategoryLabel } from "@/components/guide-card";
import { ogCard, ogSize } from "@/lib/og-card";

export const size = ogSize;
export const contentType = "image/png";

const CATEGORY_COLORS: Record<string, string> = {
  news: "#B6F34A",
  beginner: "#35C7D9",
  exploration: "#4ADE80",
  "gameplay-mechanics": "#B48CF2",
  money: "#F5B942",
  combat: "#F4655A",
  "wanted-level": "#FB923C",
  advanced: "#F472B6",
};

export function generateStaticParams() {
  return getGuideSlugs().map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = await getGuide(slug);
  return ogCard({
    kicker: guide ? `${guideCategoryLabel(guide.category)} Guide` : "Guide",
    kickerColor: CATEGORY_COLORS[guide?.category ?? "news"] ?? "#9AA6B2",
    title: guide?.title ?? "GTA 6 Guide",
    subtitle: guide?.metaDescription,
  });
}
