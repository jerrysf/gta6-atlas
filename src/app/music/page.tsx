import type { Metadata } from "next";
import { Disc3, Music } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";
import { EntityBrowser } from "@/components/database/entity-browser";
import { StatStrip } from "@/components/database/stat-strip";
import { tracks, trackContexts } from "@/data/music";
import { createMetadata, itemListJsonLd } from "@/lib/seo";
import JsonLd from "@/components/json-ld";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = createMetadata({
  title: "GTA 6 Soundtrack — Every Confirmed Song on Grand Theft Auto VI: The Album",
  description:
    "Every officially confirmed GTA 6 song — trailer tracks by Tom Petty, The Pointer Sisters and Justice, plus all announced songs from Grand Theft Auto VI: The Album.",
  path: "/music",
});

export default function MusicPage() {
  const items = tracks.map((t) => ({
    name: t.name,
    slug: t.slug,
    description: `${t.artist}${t.featuring ? ` feat. ${t.featuring}` : ""} — ${t.description}`,
    href: `/music/${t.slug}`,
    meta: t.artist,
    category: t.context,
    tag: "Confirmed",
    verificationStatus: t.verificationStatus,
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={itemListJsonLd({
          name: "GTA 6 Soundtrack",
          path: "/music",
          items: tracks.map((t) => ({
            name: `${t.name} — ${t.artist}`,
            href: `/music/${t.slug}`,
          })),
        })}
      />
      <PageHeader
        title="GTA 6 Soundtrack & Music"
        description="Every officially confirmed song for Grand Theft Auto VI — trailer tracks and the 34-song companion album, verified against Rockstar and Atlantic Records announcements."
        breadcrumbs={[{ name: "Music", href: "/music" }]}
      />

      <Card className="mt-6 border-brand/30 bg-gradient-to-br from-card to-brand/5">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 font-display text-2xl tracking-wide">
            <Disc3 className="size-5 text-brand" />
            Grand Theft Auto VI: The Album
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm leading-relaxed text-muted-foreground">
          Rockstar Games and Atlantic Records are releasing{" "}
          <strong className="text-foreground">GTA VI: The Album</strong> —{" "}
          <strong className="text-foreground">34 original tracks</strong>{" "}
          landing the same day as the game,{" "}
          <strong className="text-foreground">November 19, 2026</strong>, on
          vinyl, CD and streaming. French duo{" "}
          <strong className="text-foreground">Justice</strong> compose the
          game&apos;s original score — the first GTA built around an original
          composed soundtrack. Confirmed tracks are catalogued below; the full
          34-song tracklist is still being revealed.
        </CardContent>
      </Card>

      <StatStrip
        stats={[
          { label: "confirmed tracks", value: tracks.length },
          { label: "album total", value: "34 songs" },
          { label: "trailer songs", value: tracks.filter((t) => t.context === "trailer").length },
          { label: "score composer", value: "Justice" },
        ]}
      />
      <EntityBrowser
        items={items}
        categoryOptions={trackContexts.map((c) => ({
          value: c.slug,
          label: c.label,
        }))}
        searchPlaceholder="Search songs or artists..."
        emptyState={
          <EmptyState
            icon={Music}
            title="No tracks confirmed yet"
            description="Soundtrack entries appear here as Rockstar and Atlantic Records announce them."
          />
        }
      />
    </div>
  );
}
