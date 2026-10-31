import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PawPrint } from "lucide-react";
import { EntityDetail } from "@/components/entity-detail";
import { entityImages } from "@/data/entity-images";
import { animals, animalClasses } from "@/data/animals";
import { createMetadata } from "@/lib/seo";
import { prevNextOf } from "@/lib/utils";

export function generateStaticParams() {
  return animals.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/wildlife/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = animals.find((x) => x.slug === slug);
  if (!a) return {};
  return createMetadata({
    title: `${a.name} — GTA 6 Wildlife`,
    description: a.description.slice(0, 155),
    path: `/wildlife/${a.slug}`,
  });
}

export default async function AnimalPage({
  params,
}: PageProps<"/wildlife/[slug]">) {
  const { slug } = await params;
  const a = animals.find((x) => x.slug === slug);
  if (!a) notFound();

  return (
    <EntityDetail
      breadcrumbs={[
        { name: "Wildlife", href: "/wildlife" },
        { name: a.name, href: `/wildlife/${a.slug}` },
      ]}
      name={a.name}
      role={a.species}
      description={a.description}
      verificationStatus={a.verificationStatus}
      image={entityImages[a.slug]}
      coverIcon={<PawPrint className="size-12 text-muted-foreground/40" />}
      tags={[
        {
          label:
            animalClasses.find((c) => c.slug === a.class)?.label ??
            "Wildlife",
          tone: "muted",
        },
      ]}
      facts={[
        { label: "Species", value: a.species },
        { label: "Habitat", value: a.habitat },
        { label: "First seen", value: a.firstSeen },
      ]}
      sources={a.sourceReferences}
      prevNext={prevNextOf(animals, a.slug, (s) => `/wildlife/${s}`)}
      related={animals
        .filter((x) => x.slug !== a.slug && x.class === a.class)
        .concat(animals.filter((x) => x.slug !== a.slug && x.class !== a.class))
        .slice(0, 5)
        .map((x) => ({
          name: x.name,
          href: `/wildlife/${x.slug}`,
          description: x.species,
        }))}
    />
  );
}
