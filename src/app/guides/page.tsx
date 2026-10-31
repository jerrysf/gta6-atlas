import type { Metadata } from "next";
import { Suspense } from "react";
import { BookOpen } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";
import { GuideBrowser } from "@/components/guide-browser";
import { getAllGuides } from "@/lib/mdx";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "GTA 6 Guides — Tips, Strategies & How-To Articles",
  description:
    "All GTA6 Atlas guides — beginner tips, money making, combat, exploration and GTA 6 gameplay mechanics explained.",
  path: "/guides",
});

export default async function GuidesPage() {
  const guides = await getAllGuides();

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
        <Suspense>
          <GuideBrowser guides={guides} />
        </Suspense>
      )}
    </div>
  );
}
