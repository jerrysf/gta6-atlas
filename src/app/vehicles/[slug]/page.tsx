import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { vehicleRepo } from "@/lib/repository";
import { vehicles } from "@/data/vehicles";
import { EntityDetail } from "@/components/entity-detail";
import { entityImages } from "@/data/entity-images";
import { createMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return vehicles.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/vehicles/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const v = await vehicleRepo.getBySlug(slug);
  if (!v) return {};
  return createMetadata({
    title: `${v.name} — GTA 6 Vehicle`,
    description: v.description,
    path: `/vehicles/${v.slug}`,
  });
}

export default async function VehiclePage({
  params,
}: PageProps<"/vehicles/[slug]">) {
  const { slug } = await params;
  const v = await vehicleRepo.getBySlug(slug);
  if (!v) notFound();

  type Fact = { label: string; value: React.ReactNode };
  const facts: Fact[] = (
    [
      v.manufacturer && { label: "Manufacturer", value: v.manufacturer },
      v.location && { label: "Where to find", value: v.location },
      v.acquisition && { label: "How to get", value: v.acquisition },
      v.performance?.topSpeed != null && {
        label: "Top speed",
        value: String(v.performance.topSpeed),
      },
      v.performance?.acceleration != null && {
        label: "Acceleration",
        value: String(v.performance.acceleration),
      },
      v.performance?.braking != null && {
        label: "Braking",
        value: String(v.performance.braking),
      },
      v.performance?.handling != null && {
        label: "Handling",
        value: String(v.performance.handling),
      },
    ] as (Fact | false | undefined)[]
  ).filter((f): f is Fact => Boolean(f));

  const related = vehicles
    .filter((x) => x.category === v.category && x.slug !== v.slug)
    .slice(0, 5)
    .map((x) => ({ name: x.name, href: `/vehicles/${x.slug}` }));

  return (
    <EntityDetail
      breadcrumbs={[
        { name: "Vehicles", href: "/vehicles" },
        { name: v.name, href: `/vehicles/${v.slug}` },
      ]}
      name={v.name}
      role={v.category}
      description={v.description}
      verificationStatus={v.verificationStatus}
      image={entityImages[v.slug]}
      facts={facts}
      sources={v.sourceReferences}
      related={related}
    />
  );
}
