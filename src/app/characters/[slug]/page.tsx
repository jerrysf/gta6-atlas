import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { characterRepo } from "@/lib/repository";
import { characters } from "@/data/characters";
import { EntityDetail } from "@/components/entity-detail";
import { createMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return characters.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/characters/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = await characterRepo.getBySlug(slug);
  if (!c) return {};
  return createMetadata({
    title: `${c.name} — GTA 6 Character`,
    description: c.description,
    path: `/characters/${c.slug}`,
  });
}

export default async function CharacterPage({
  params,
}: PageProps<"/characters/[slug]">) {
  const { slug } = await params;
  const c = await characterRepo.getBySlug(slug);
  if (!c) notFound();

  const related = characters
    .filter((x) => x.slug !== c.slug)
    .slice(0, 5)
    .map((x) => ({ name: x.name, href: `/characters/${x.slug}`, description: x.role }));

  return (
    <EntityDetail
      breadcrumbs={[
        { name: "Characters", href: "/characters" },
        { name: c.name, href: `/characters/${c.slug}` },
      ]}
      name={c.name}
      role={c.role}
      description={c.biography}
      verificationStatus={c.verificationStatus}
      facts={[{ label: "Role", value: c.role }]}
      sources={c.sourceReferences}
      related={related}
    />
  );
}
