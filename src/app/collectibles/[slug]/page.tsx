import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { collectibleRepo, secretRepo } from "@/lib/repository";
import { collectibles, secrets } from "@/data/collectibles";
import { EntityDetail } from "@/components/entity-detail";
import { entityImages } from "@/data/entity-images";
import { createMetadata } from "@/lib/seo";

const all = () => [...collectibles, ...secrets];

export function generateStaticParams() {
  return all().map((c) => ({ slug: c.slug }));
}

async function getEntry(slug: string) {
  return (
    (await collectibleRepo.getBySlug(slug)) ??
    (await secretRepo.getBySlug(slug))
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/collectibles/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = await getEntry(slug);
  if (!c) return {};
  return createMetadata({
    title: `${c.name} — GTA 6 ${c.kind === "secret" ? "Secret" : "Collectible"}`,
    description: c.description,
    path: `/collectibles/${c.slug}`,
  });
}

export default async function CollectiblePage({
  params,
}: PageProps<"/collectibles/[slug]">) {
  const { slug } = await params;
  const c = await getEntry(slug);
  if (!c) notFound();

  const typeLabel = c.kind === "secret" ? "Secret" : "Collectible";
  const facts = (
    [
      { label: "Type", value: typeLabel },
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
    ] as ({ label: string; value: React.ReactNode } | false | undefined)[]
  ).filter(
    (f): f is { label: string; value: React.ReactNode } => Boolean(f),
  );

  const related = all()
    .filter((x) => x.kind === c.kind && x.slug !== c.slug)
    .slice(0, 5)
    .map((x) => ({ name: x.name, href: `/collectibles/${x.slug}` }));

  return (
    <EntityDetail
      breadcrumbs={[
        c.kind === "secret"
          ? { name: "Secrets", href: "/secrets" }
          : { name: "Collectibles", href: "/collectibles" },
        { name: c.name, href: `/collectibles/${c.slug}` },
      ]}
      name={c.name}
      role={c.category}
      description={c.description}
      verificationStatus={c.verificationStatus}
      image={entityImages[c.slug]}
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
