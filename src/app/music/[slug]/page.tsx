import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EntityDetail } from "@/components/entity-detail";
import { tracks } from "@/data/music";
import { createMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return tracks.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/music/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const t = tracks.find((x) => x.slug === slug);
  if (!t) return {};
  return createMetadata({
    title: `${t.name} — ${t.artist} | GTA 6 Soundtrack`,
    description: t.description.slice(0, 155),
    path: `/music/${t.slug}`,
  });
}

export default async function TrackPage({
  params,
}: PageProps<"/music/[slug]">) {
  const { slug } = await params;
  const t = tracks.find((x) => x.slug === slug);
  if (!t) notFound();

  return (
    <EntityDetail
      breadcrumbs={[
        { name: "Music", href: "/music" },
        { name: t.name, href: `/music/${t.slug}` },
      ]}
      name={t.name}
      role={`${t.artist}${t.featuring ? ` feat. ${t.featuring}` : ""}`}
      description={t.description}
      verificationStatus={t.verificationStatus}
      tags={[
        {
          label: t.context === "trailer" ? "Trailer song" : "Album track",
          tone: t.context === "trailer" ? "cyan" : "lime",
        },
      ]}
      facts={[
        { label: "Artist", value: t.artist },
        ...(t.featuring
          ? [{ label: "Featuring", value: t.featuring }]
          : []),
        { label: "Appears in", value: t.contextLabel },
        {
          label: "Album",
          value: "Grand Theft Auto VI: The Album (Nov 19, 2026)",
        },
      ]}
      sources={t.sourceReferences}
      related={tracks
        .filter((x) => x.slug !== t.slug && x.context === t.context)
        .slice(0, 5)
        .map((x) => ({
          name: `${x.name} — ${x.artist}`,
          href: `/music/${x.slug}`,
          description: x.contextLabel,
        }))}
    />
  );
}
