import type { Metadata } from "next";
import { Eye } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { PendingBanner } from "@/components/pending-banner";
import { EmptyState } from "@/components/empty-state";
import { EntityBrowser } from "@/components/database/entity-browser";
import { secretRepo } from "@/lib/repository";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "GTA 6 Secrets & Easter Eggs — Hidden Locations and Mysteries",
  description:
    "Every secret, easter egg and hidden location discovered in GTA 6's Leonida — verified and mapped as they're found.",
  path: "/secrets",
});

export default async function SecretsPage() {
  const list = await secretRepo.getAll();
  const items = list.map((s) => ({
    name: s.name,
    slug: s.slug,
    description: s.description,
    href: `/collectibles/${s.slug}`,
    meta: s.location,
    category: s.category,
    verificationStatus: s.verificationStatus,
  }));
  const categories = [...new Set(list.map((s) => s.category))].map((c) => ({
    value: c,
    label: c,
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <PageHeader
        title="GTA 6 Secrets & Easter Eggs"
        description="Hidden locations, easter eggs and mysteries in Leonida — documented only once verified."
        breadcrumbs={[{ name: "Secrets", href: "/secrets" }]}
      />
      <PendingBanner>
        Secrets are the last thing anyone can verify before launch. Once the
        community starts uncovering Leonida&apos;s hidden corners after
        November 19, 2026, we&apos;ll document each discovery here — clearly
        labelled by verification status.
      </PendingBanner>
      <EntityBrowser
        items={items}
        categoryOptions={categories}
        searchPlaceholder="Search secrets..."
        emptyState={
          <EmptyState
            icon={Eye}
            title="No secrets documented yet"
            description="Easter eggs and hidden locations will be catalogued here once verified in-game."
          />
        }
      />
    </div>
  );
}
