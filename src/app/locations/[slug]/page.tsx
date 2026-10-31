import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { locationRepo, missionRepo } from "@/lib/repository";
import { locations } from "@/data/locations";
import { EntityDetail } from "@/components/entity-detail";
import { entityImages } from "@/data/entity-images";
import { createMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/locations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const l = await locationRepo.getBySlug(slug);
  if (!l) return {};
  return createMetadata({
    title: `${l.name} — GTA 6 Location`,
    description: l.description,
    path: `/locations/${l.slug}`,
  });
}

export default async function LocationPage({
  params,
}: PageProps<"/locations/[slug]">) {
  const { slug } = await params;
  const l = await locationRepo.getBySlug(slug);
  if (!l) notFound();

  const allMissions = await missionRepo.getAll();
  const relatedMissions = (l.relatedMissions ?? [])
    .map((slug) => allMissions.find((m) => m.slug === slug))
    .filter((m): m is NonNullable<typeof m> => Boolean(m))
    .map((m) => ({
      name: m.name,
      href: `/walkthrough/${m.slug}`,
    }));

  const relatedLocations = locations
    .filter((x) => x.slug !== l.slug)
    .slice(0, 5)
    .map((x) => ({ name: x.name, href: `/locations/${x.slug}` }));

  const facts = [
    { label: "Region", value: l.region },
    l.coordinates
      ? {
          label: "Map position",
          value: (
            <Link
              href={`/map?focus=${l.slug}`}
              className="text-brand-cyan underline"
            >
              View on map
            </Link>
          ),
        }
      : {
          label: "Map position",
          value: "Pending — the official world map isn't public yet",
        },
  ];

  return (
    <EntityDetail
      breadcrumbs={[
        { name: "Locations", href: "/locations" },
        { name: l.name, href: `/locations/${l.slug}` },
      ]}
      name={l.name}
      role={l.region === "State" ? "State" : `Region of ${l.region}`}
      description={l.description}
      verificationStatus={l.verificationStatus}
      image={entityImages[l.slug]}
      facts={facts}
      sources={l.sourceReferences}
      related={[...relatedMissions, ...relatedLocations].slice(0, 6)}
    />
  );
}
