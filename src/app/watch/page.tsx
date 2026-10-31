import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, PlaySquare } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { PendingBanner } from "@/components/pending-banner";
import { StatStrip } from "@/components/database/stat-strip";
import { VideoGrid } from "@/components/video-grid";
import JsonLd from "@/components/json-ld";
import { officialVideos } from "@/data/videos";
import { createMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "Watch Every Official GTA 6 Trailer & Video — Rockstar's GTA VI Videos",
  description:
    "Every official Grand Theft Auto VI video in one place — Trailer 1, Trailer 2, the 26-minute Extended Look and the Launch Trailer, playable right here.",
  path: "/watch",
});

export default function WatchPage() {
  const totalSeconds = officialVideos.reduce((acc, v) => {
    const [m, s] = v.duration.split(":").map(Number);
    return acc + m * 60 + s;
  }, 0);
  const minutes = Math.floor(totalSeconds / 60);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Official GTA 6 Videos",
          itemListElement: officialVideos.map((v, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "VideoObject",
              name: v.title,
              description: v.note,
              thumbnailUrl: `https://i.ytimg.com/vi/${v.youtubeId}/maxresdefault.jpg`,
              embedUrl: `https://www.youtube-nocookie.com/embed/${v.youtubeId}`,
              uploadDate: v.publishedAt,
            },
          })),
        }}
      />
      <PageHeader
        title="Official GTA 6 Videos"
        description="Every video Rockstar has released for Grand Theft Auto VI — playable right here, no tab-jumping required. Age-restricted uploads link out to YouTube."
        breadcrumbs={[{ name: "Watch", href: "/watch" }]}
      />
      <PendingBanner title="Official source only">
        These are Rockstar Games&apos; own uploads, embedded via
        YouTube&apos;s privacy-enhanced player. Analysis, breakdowns and
        frame-by-frame notes live in our{" "}
        <Link href="/guides" className="underline">
          guides
        </Link>
        .
      </PendingBanner>
      <StatStrip
        stats={[
          { label: "official videos", value: officialVideos.length },
          { label: "minutes of footage", value: `${minutes}+` },
          { label: "newest upload", value: "Launch Trailer" },
          {
            label: "age-restricted",
            value: officialVideos.filter((v) => v.ageRestricted).length,
          },
        ]}
      />
      <VideoGrid videos={officialVideos} />
      <div className="mt-8 flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card p-4 text-sm">
        <PlaySquare className="size-5 shrink-0 text-brand" />
        <p className="text-muted-foreground">
          Everything above is published on{" "}
          <a
            href="https://www.youtube.com/@RockstarGames"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-foreground underline decoration-brand/40 underline-offset-4 hover:text-brand"
          >
            Rockstar&apos;s official YouTube channel
            <ExternalLink className="size-3" />
          </a>{" "}
          — new uploads land here as they drop.
        </p>
        <a
          href={absoluteUrl("/feed.xml")}
          className="ml-auto shrink-0 text-xs font-medium text-brand-cyan hover:underline"
        >
          Subscribe via RSS →
        </a>
      </div>
    </div>
  );
}
