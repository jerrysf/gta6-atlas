import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { SearchPageClient } from "@/components/search/search-page-client";
import { buildSearchDocs } from "@/lib/search";
import { getAllGuides } from "@/lib/mdx";
import { characters } from "@/data/characters";
import { locations } from "@/data/locations";
import { vehicles } from "@/data/vehicles";
import { weapons } from "@/data/weapons";
import { collectibles, secrets } from "@/data/collectibles";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Search",
  description:
    "Search GTA6 Atlas — guides, characters, locations, vehicles, weapons and collectibles.",
  path: "/search",
  noIndex: true,
});

export default async function SearchPage({
  searchParams,
}: PageProps<"/search">) {
  const { q } = await searchParams;
  const initialQuery = typeof q === "string" ? q : "";
  const guides = await getAllGuides();
  const docs = buildSearchDocs({
    guides,
    characters,
    locations,
    vehicles,
    weapons,
    collectibles: [...collectibles, ...secrets],
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <PageHeader
        title="Search"
        description="Search across guides, database entries and site pages."
        breadcrumbs={[{ name: "Search", href: "/search" }]}
      />
      <SearchPageClient
        key={initialQuery}
        docs={docs}
        initialQuery={initialQuery}
      />
    </div>
  );
}
