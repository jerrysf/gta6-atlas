import type { Metadata } from "next";
import { Gem } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { PendingBanner } from "@/components/pending-banner";
import { EmptyState } from "@/components/empty-state";
import { EntityBrowser } from "@/components/database/entity-browser";
import { collectibleRepo } from "@/lib/repository";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "GTA 6 Collectibles — Locations, Maps & Guides",
  description:
    "Find every collectible in GTA 6 — locations, map coordinates and step-by-step discovery guides, verified after launch.",
  path: "/collectibles",
});

export default async function CollectiblesPage() {
  const list = await collectibleRepo.getAll();
  const items = list.map((c) => ({
    name: c.name,
    slug: c.slug,
    description: c.description,
    href: `/collectibles/${c.slug}`,
    meta: c.location,
    category: c.category,
    verificationStatus: c.verificationStatus,
  }));
  const categories = [...new Set(list.map((c) => c.category))].map((c) => ({
    value: c,
    label: c,
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <PageHeader
        title="GTA 6 Collectibles"
        description="Every hidden pickup and collectible set in Leonida — with verified map locations and discovery instructions."
        breadcrumbs={[{ name: "Collectibles", href: "/collectibles" }]}
      />
      <PendingBanner>
        Collectibles can only be catalogued once GTA VI is playable. As soon as
        locations are verified in-game, every collectible will be listed here
        with coordinates on the interactive map — nothing gets published
        unverified.
      </PendingBanner>
      <EntityBrowser
        items={items}
        categoryOptions={categories}
        searchPlaceholder="Search collectibles..."
        emptyState={
          <EmptyState
            icon={Gem}
            title="No verified collectibles yet"
            description="Collectible locations require in-game verification. Entries will be added after the November 19, 2026 release."
          />
        }
      />
    </div>
  );
}
