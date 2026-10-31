import type { Metadata } from "next";
import { Crosshair } from "lucide-react";
import { notFound } from "next/navigation";
import { weaponRepo } from "@/lib/repository";
import { weapons } from "@/data/weapons";
import { EntityDetail } from "@/components/entity-detail";
import { entityImages } from "@/data/entity-images";
import { prevNextOf } from "@/lib/utils";
import { createMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return weapons.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/weapons/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const w = await weaponRepo.getBySlug(slug);
  if (!w) return {};
  return createMetadata({
    title: `${w.name} — GTA 6 Weapon`,
    description: w.description,
    path: `/weapons/${w.slug}`,
  });
}

export default async function WeaponPage({
  params,
}: PageProps<"/weapons/[slug]">) {
  const { slug } = await params;
  const w = await weaponRepo.getBySlug(slug);
  if (!w) notFound();

  type Fact = { label: string; value: React.ReactNode };
  const facts: Fact[] = (
    [
      { label: "Category", value: w.category },
      w.basedOn && { label: "Based on (real life)", value: w.basedOn },
      w.damage != null && { label: "Damage", value: String(w.damage) },
      w.accuracy != null && { label: "Accuracy", value: String(w.accuracy) },
      w.fireRate != null && { label: "Fire rate", value: String(w.fireRate) },
      w.acquisition && { label: "How to get", value: w.acquisition },
    ] as (Fact | false)[]
  ).filter((f): f is Fact => Boolean(f));

  const related = weapons
    .filter((x) => x.category === w.category && x.slug !== w.slug)
    .slice(0, 5)
    .map((x) => ({
      name: x.name,
      href: `/weapons/${x.slug}`,
      description: x.basedOn,
    }));

  return (
    <EntityDetail
      breadcrumbs={[
        { name: "Weapons", href: "/weapons" },
        { name: w.name, href: `/weapons/${w.slug}` },
      ]}
      name={w.name}
      role={w.category}
      description={w.description}
      verificationStatus={w.verificationStatus}
      image={entityImages[w.slug]}
      coverIcon={<Crosshair className="size-12 text-muted-foreground/40" />}
      facts={facts}
      sources={w.sourceReferences}
      related={related}
      prevNext={prevNextOf(weapons, w.slug, (s) => `/weapons/${s}`)}
    />
  );
}
