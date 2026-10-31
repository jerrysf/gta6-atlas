import type { Metadata } from "next";
import { Car } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { PendingBanner } from "@/components/pending-banner";
import { EmptyState } from "@/components/empty-state";
import { EntityBrowser } from "@/components/database/entity-browser";
import { StatStrip } from "@/components/database/stat-strip";
import { vehicleRepo } from "@/lib/repository";
import { vehicleCategories } from "@/data/vehicles";
import { createMetadata, itemListJsonLd } from "@/lib/seo";
import JsonLd from "@/components/json-ld";

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
    meta: [v.manufacturer, v.basedOn].filter(Boolean).join(" · "),
    category: v.category,
    tag:
      v.debut === "new"
        ? "New in VI"
        : v.debut === "returning"
          ? "Returning"
          : undefined,
    verificationStatus: v.verificationStatus,
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={itemListJsonLd({
          name: "GTA 6 Vehicles",
          path: "/vehicles",
          items: list.map((v) => ({
            name: v.name,
            href: `/vehicles/${v.slug}`,
          })),
        })}
      />
      <PageHeader
        title="GTA 6 Vehicles"
        description="Every car, motorcycle, boat and aircraft in Grand Theft Auto VI — catalogued with performance stats, locations and acquisition methods."
        breadcrumbs={[{ name: "Vehicles", href: "/vehicles" }]}
      />
      <PendingBanner title="Trailer sightings — names unconfirmed">
        These vehicles were spotted in official GTA VI footage. In-game names
        are community identifications based on returning models — none have
        been officially confirmed, and no performance stats exist yet. Every
        entry upgrades to verified status after the November 19, 2026 release.
      </PendingBanner>
      <StatStrip
        stats={[
          { label: "vehicles spotted", value: list.length },
          {
            label: "returning models",
            value: list.filter((v) => v.debut === "returning").length,
          },
          {
            label: "new to series",
            value: list.filter((v) => v.debut === "new").length,
          },
          {
            label: "real-life basis documented",
            value: list.filter((v) => v.basedOn).length,
          },
        ]}
      />
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
