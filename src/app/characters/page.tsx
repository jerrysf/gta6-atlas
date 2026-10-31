import type { Metadata } from "next";
import { Users } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";
import { EntityBrowser } from "@/components/database/entity-browser";
import { StatStrip } from "@/components/database/stat-strip";
import { characterRepo } from "@/lib/repository";
import { createMetadata, itemListJsonLd } from "@/lib/seo";
import JsonLd from "@/components/json-ld";

export const metadata: Metadata = createMetadata({
  title: "GTA 6 Characters — Confirmed Cast of Grand Theft Auto VI",
  description:
    "Meet the officially confirmed cast of GTA 6 — Lucia Caminos, Jason Duval and the supporting characters of Leonida, with bios and roles.",
  path: "/characters",
});

export default async function CharactersPage() {
  const list = await characterRepo.getAll();
  const items = list.map((c) => ({
    name: c.name,
    slug: c.slug,
    description: c.description,
    href: `/characters/${c.slug}`,
    meta: c.role,
    verificationStatus: c.verificationStatus,
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={itemListJsonLd({
          name: "GTA 6 Characters",
          path: "/characters",
          items: list.map((c) => ({
            name: c.name,
            href: `/characters/${c.slug}`,
          })),
        })}
      />
      <PageHeader
        title="GTA 6 Characters"
        description="Every officially announced character in Grand Theft Auto VI — protagonists, allies and the faces of Leonida's underworld."
        breadcrumbs={[{ name: "Characters", href: "/characters" }]}
      />
      <StatStrip
        stats={[
          { label: "confirmed cast", value: list.length },
          {
            label: "playable protagonists",
            value: list.filter((c) =>
              c.role.toLowerCase().includes("protagonist"),
            ).length,
          },
          {
            label: "official portraits",
            value: list.length,
          },
        ]}
      />
      <EntityBrowser
        items={items}
        searchPlaceholder="Search characters..."
        portrait
        emptyState={
          <EmptyState
            icon={Users}
            title="No characters listed"
            description="Only officially announced characters appear here. Check back as Rockstar reveals more of the cast."
          />
        }
      />
    </div>
  );
}
