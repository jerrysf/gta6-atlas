import type { Metadata } from "next";
import { Car } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { PendingBanner } from "@/components/pending-banner";
import { EmptyState } from "@/components/empty-state";
import { EntityBrowser } from "@/components/database/entity-browser";
import { vehicleRepo } from "@/lib/repository";
import { vehicleCategories } from "@/data/vehicles";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "GTA 6 Vehicles — Cars, Motorcycles, Boats & Aircraft Database",
  description:
    "Browse the complete GTA 6 vehicle database — cars, motorcycles, boats, aircraft and more, with stats, locations and how to get them.",
  path: "/vehicles",
});

export default async function VehiclesPage() {
  const list = await vehicleRepo.getAll();
  const items = list.map((v) => ({
    name: v.name,
    slug: v.slug,
    description: v.description,
    href: `/vehicles/${v.slug}`,
    meta: v.manufacturer,
    category: v.category,
    verificationStatus: v.verificationStatus,
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <PageHeader
        title="GTA 6 Vehicles"
        description="Every car, motorcycle, boat and aircraft in Grand Theft Auto VI — catalogued with performance stats, locations and acquisition methods."
        breadcrumbs={[{ name: "Vehicles", href: "/vehicles" }]}
      />
      <PendingBanner>
        No vehicle names or specs have been officially confirmed for GTA VI
        yet. Trailers show dozens of vehicles, but we won&apos;t list them until
        they&apos;re officially named or verified in-game. Entries will populate
        here after release — check back after November 19, 2026.
      </PendingBanner>
      <EntityBrowser
        items={items}
        categoryOptions={vehicleCategories.map((c) => ({
          value: c.slug,
          label: c.label,
        }))}
        searchPlaceholder="Search vehicles..."
        emptyState={
          <EmptyState
            icon={Car}
            title="No verified vehicles yet"
            description="Vehicle entries will appear here as they're officially confirmed or verified in-game after the November 19, 2026 release."
          />
        }
      />
    </div>
  );
}
