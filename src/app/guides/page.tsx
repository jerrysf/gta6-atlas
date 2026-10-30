import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";
import { GuideCard, guideCategoryLabel } from "@/components/guide-card";
import { getAllGuides } from "@/lib/mdx";
import type { GuideCategory } from "@/lib/types";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "GTA 6 Guides — Tips, Strategies & How-To Articles",
  description:
    "All GTA6 Atlas guides — beginner tips, money making, combat, exploration and GTA 6 gameplay mechanics explained.",
  path: "/guides",
});

const CATEGORY_ORDER: GuideCategory[] = [
  "news",
  "beginner",
  "exploration",
  "gameplay-mechanics",
  "money",
  "combat",
  "wanted-level",
  "advanced",
];

export default async function GuidesPage() {
  const guides = await getAllGuides();
  const byCategory = new Map<GuideCategory, typeof guides>();
  for (const g of guides) {
    const list = byCategory.get(g.category) ?? [];
    list.push(g);
    byCategory.set(g.category, list);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <PageHeader
        title="GTA 6 Guides & Tips"
        description="Evergreen guides for Grand Theft Auto VI — clearly labelled so you always know what's confirmed for GTA 6 versus general franchise advice."
        breadcrumbs={[{ name: "Guides", href: "/guides" }]}
      />
      {guides.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No guides published yet"
          description="Guides are on the way — check back soon."
        />
      ) : (
        <div className="space-y-12">
          {CATEGORY_ORDER.filter((c) => byCategory.has(c)).map((category) => (
            <section key={category} aria-labelledby={`cat-${category}`}>
              <h2
                id={`cat-${category}`}
                className="mb-4 text-xl font-bold tracking-tight"
              >
                {guideCategoryLabel(category)}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {byCategory.get(category)!.map((g) => (
                  <GuideCard key={g.slug} guide={g} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
