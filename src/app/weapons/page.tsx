import type { Metadata } from "next";
import { Crosshair } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { PendingBanner } from "@/components/pending-banner";
import { EmptyState } from "@/components/empty-state";
import { EntityBrowser } from "@/components/database/entity-browser";
import { weaponRepo } from "@/lib/repository";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "GTA 6 Weapons — Full Weapon Database & Stats",
  description:
    "Every weapon in Grand Theft Auto VI — damage, accuracy, fire rate stats and where to find them. Verified as official information is released.",
  path: "/weapons",
});

export default async function WeaponsPage() {
  const list = await weaponRepo.getAll();
  const items = list.map((w) => ({
    name: w.name,
    slug: w.slug,
    description: w.description,
    href: `/weapons/${w.slug}`,
    meta: w.basedOn,
    category: w.category,
    verificationStatus: w.verificationStatus,
  }));
  const categories = [...new Set(list.map((w) => w.category))].map((c) => ({
    value: c,
    label: c,
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <PageHeader
        title="GTA 6 Weapons"
        description="Every confirmed weapon in Grand Theft Auto VI — stats, categories and acquisition methods."
        breadcrumbs={[{ name: "Weapons", href: "/weapons" }]}
      />
      <PendingBanner title="Named in official footage — stats pending">
        Weapons marked <strong>Officially Confirmed</strong> were named
        on-screen in Rockstar&apos;s Extended Look, trailers or screenshots.
        Those marked <strong>Community Reported</strong> are visible in footage
        but unnamed. Damage, accuracy and fire-rate stats will be verified
        in-game after launch.
      </PendingBanner>
      <EntityBrowser
        items={items}
        categoryOptions={categories}
        searchPlaceholder="Search weapons..."
        emptyState={
          <EmptyState
            icon={Crosshair}
            title="No verified weapons yet"
            description="Weapon entries will appear here as they're officially confirmed or verified in-game after release."
          />
        }
      />
    </div>
  );
}
