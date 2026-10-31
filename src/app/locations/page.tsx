import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";
import { EntityBrowser } from "@/components/database/entity-browser";
import { locationRepo } from "@/lib/repository";
import { createMetadata, itemListJsonLd } from "@/lib/seo";
import JsonLd from "@/components/json-ld";

export const metadata: Metadata = createMetadata({
  title: "GTA 6 Locations — Every Confirmed Region of Leonida",
  description:
    "Explore every officially confirmed location in GTA 6's Leonida — Vice City, the Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia and Mount Kalaga.",
  path: "/locations",
});

export default async function LocationsPage() {
  const list = await locationRepo.getAll();
  const items = list.map((l) => ({
    name: l.name,
    slug: l.slug,
    description: l.description,
    href: `/locations/${l.slug}`,
    meta: l.region,
    category: l.region,
    verificationStatus: l.verificationStatus,
  }));
  const categories = [...new Set(list.map((l) => l.region))].map((r) => ({
    value: r,
    label: r,
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={itemListJsonLd({
          name: "GTA 6 Locations",
          path: "/locations",
          items: list.map((l) => ({
            name: l.name,
            href: `/locations/${l.slug}`,
          })),
        })}
      />
      <PageHeader
        title="GTA 6 Locations"
        description="The officially confirmed regions of Leonida. In-game map coordinates will be added after release — see the interactive map for updates."
        breadcrumbs={[{ name: "Locations", href: "/locations" }]}
      >
        <Link
          href="/map"
          className="inline-flex items-center gap-1.5 rounded-md border border-brand-cyan/40 px-3 py-2 text-sm font-medium text-brand-cyan hover:bg-brand-cyan/10"
        >
          <MapPin className="size-4" /> Open Interactive Map
        </Link>
      </PageHeader>
      <Suspense>
        <EntityBrowser
        items={items}
        categoryOptions={categories}
        searchPlaceholder="Search locations..."
        emptyState={
          <EmptyState
            icon={MapPin}
            title="No locations listed"
            description="Confirmed Leonida locations will be listed here as they're announced."
          />
        }
      />
        </Suspense>
    </div>
  );
}
