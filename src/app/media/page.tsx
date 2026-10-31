import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PendingBanner } from "@/components/pending-banner";
import { MediaGallery } from "@/components/media-gallery";
import { mediaItems } from "@/data/media";
import { StatStrip } from "@/components/database/stat-strip";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "GTA 6 Screenshots & Media Gallery — Official Images of Leonida",
  description:
    "Every official GTA 6 screenshot and image — character portraits, postcards, trailer stills from Vice City, Leonida Keys, Mount Kalaga and beyond.",
  path: "/media",
});

export default function MediaPage() {
  const official = mediaItems.filter((i) => i.authenticity === "official");
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <PageHeader
        title="GTA 6 Screenshots & Media"
        description="Every image in our database in one gallery — official GTA VI media and clearly-labelled GTA V-era reference renders. Click any image for full view and its database entry."
        breadcrumbs={[{ name: "Media", href: "/media" }]}
      />
      <PendingBanner title="Image sourcing">
        All imagery is hotlinked from GTA Wiki and served via our image
        optimiser. Official GTA VI media is labelled; items marked{" "}
        <strong>GTA V ref</strong> are reference renders of returning models —
        never presented as GTA VI screenshots.
      </PendingBanner>
      <StatStrip
        stats={[
          { label: "total images", value: mediaItems.length },
          { label: "official GTA VI media", value: official.length },
          {
            label: "reference renders",
            value: mediaItems.length - official.length,
          },
          {
            label: "subjects covered",
            value: new Set(mediaItems.map((i) => i.subject)).size,
          },
        ]}
      />
      <MediaGallery items={mediaItems} />
    </div>
  );
}
