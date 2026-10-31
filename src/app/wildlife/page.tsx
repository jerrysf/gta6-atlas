import type { Metadata } from "next";
import { Suspense } from "react";
import { PawPrint } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { PendingBanner } from "@/components/pending-banner";
import { EmptyState } from "@/components/empty-state";
import { EntityBrowser } from "@/components/database/entity-browser";
import { StatStrip } from "@/components/database/stat-strip";
import { animals, animalClasses } from "@/data/animals";
import { createMetadata, itemListJsonLd } from "@/lib/seo";
import JsonLd from "@/components/json-ld";

export const metadata: Metadata = createMetadata({
  title: "GTA 6 Animals & Wildlife — Every Creature Spotted in Leonida",
  description:
    "All GTA 6 animals spotted in official footage — alligators, flamingos, dolphins, deer and more wildlife confirmed for the state of Leonida.",
  path: "/wildlife",
});

export default function WildlifePage() {
  const items = animals.map((a) => ({
    name: a.name,
    slug: a.slug,
    description: a.description,
    href: `/wildlife/${a.slug}`,
    meta: a.species,
    category: a.class,
    verificationStatus: a.verificationStatus,
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={itemListJsonLd({
          name: "GTA 6 Wildlife",
          path: "/wildlife",
          items: animals.map((a) => ({
            name: a.name,
            href: `/wildlife/${a.slug}`,
          })),
        })}
      />
      <PageHeader
        title="GTA 6 Animals & Wildlife"
        description="Every creature spotted in official Grand Theft Auto VI footage — Leonida's ecosystems run from alligator wetlands to dolphin-filled coastal waters."
        breadcrumbs={[{ name: "Wildlife", href: "/wildlife" }]}
      />
      <PendingBanner title="Trailer sightings — behaviour unconfirmed">
        These animals appear in official GTA VI footage. Species
        identifications are community-reported, and how wildlife behaves
        in-game — hunting, attacks, ambient life — stays unconfirmed until the
        November 19, 2026 release.
      </PendingBanner>
      <StatStrip
        stats={[
          { label: "species spotted", value: animals.length },
          {
            label: "reptiles & amphibious",
            value: animals.filter((a) => a.class === "reptile").length,
          },
          {
            label: "marine life",
            value: animals.filter((a) => a.class === "marine").length,
          },
          {
            label: "birds",
            value: animals.filter((a) => a.class === "bird").length,
          },
        ]}
      />
      <Suspense>
        <EntityBrowser
        items={items}
        categoryOptions={animalClasses.map((c) => ({
          value: c.slug,
          label: c.label,
        }))}
        searchPlaceholder="Search wildlife..."
        emptyState={
          <EmptyState
            icon={PawPrint}
            title="No wildlife confirmed yet"
            description="Animal entries appear here as they're spotted in official footage or verified in-game."
          />
        }
      />
        </Suspense>
    </div>
  );
}
