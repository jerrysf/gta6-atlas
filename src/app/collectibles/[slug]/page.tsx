import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { collectibleRepo } from "@/lib/repository";
import { collectibles } from "@/data/collectibles";
import { EntityDetail } from "@/components/entity-detail";
import { createMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return collectibles.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/collectibles/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = await collectibleRepo.getBySlug(slug);
  if (!c) return {};
  return createMetadata({
    title: `${c.name} — GTA 6 Collectible`,
    description: c.description,
    path: `/collectibles/${c.slug}`,
  });
}

export default async function CollectiblePage({
  params,
}: PageProps<"/collectibles/[slug]">) {
  const { slug } = await params;
  const c = await collectibleRepo.getBySlug(slug);
  if (!c) notFound();

  type Fact = { label: string; value: React.ReactNode };
  const facts: Fact[] = (
    [
      { label: "Category", value: c.category },
      c.location && { label: "Location", value: c.location },
      c.coordinates && {
        label: "Map",
        value: (
          <Link href="/map" className="text-brand-cyan underline">
            View on interactive map
          </Link>
        ),
      },
    ] as (Fact | false | undefined)[]
  ).filter((f): f is Fact => Boolean(f));

  const related = collectibles
    .filter((x) => x.slug !== c.slug)
    .slice(0, 5)
    .map((x) => ({ name: x.name, href: `/collectibles/${x.slug}` }));

  return (
    <EntityDetail
      breadcrumbs={[
        { name: "Collectibles", href: "/collectibles" },
        { name: c.name, href: `/collectibles/${c.slug}` },
      ]}
      name={c.name}
      role={c.category}
      description={c.description}
      verificationStatus={c.verificationStatus}
      facts={facts}
      sources={c.sourceReferences}
      related={related}
    >
      {c.discoveryInstructions && (
        <section className="mt-8">
          <h2 className="mb-2 text-xl font-bold">How to find it</h2>
          <p className="text-foreground/90">{c.discoveryInstructions}</p>
        </section>
      )}
    </EntityDetail>
  );
}
