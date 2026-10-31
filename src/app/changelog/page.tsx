import type { Metadata } from "next";
import { Database, Paintbrush, PenLine, Wrench } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { PendingBanner } from "@/components/pending-banner";
import { changelog, type ChangelogEntry } from "@/data/changelog";
import { createMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = createMetadata({
  title: "Site Changelog — What's New on GTA6 Atlas",
  description:
    "Every update to GTA6 Atlas — new guides, database additions, features and fixes, logged as they ship.",
  path: "/changelog",
});

const TAG_META: Record<
  ChangelogEntry["tag"],
  { label: string; icon: typeof PenLine; className: string }
> = {
  content: {
    label: "Content",
    icon: PenLine,
    className: "border-brand-cyan/40 text-brand-cyan",
  },
  feature: {
    label: "Feature",
    icon: Paintbrush,
    className: "border-brand/40 text-brand",
  },
  data: {
    label: "Data",
    icon: Database,
    className: "border-violet-400/40 text-violet-300",
  },
  fix: {
    label: "Fix",
    icon: Wrench,
    className: "border-amber-400/40 text-amber-300",
  },
};

export default function ChangelogPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <PageHeader
        title="Site Changelog"
        description="What's new on GTA6 Atlas — every database addition, feature and fix, logged as it ships."
        breadcrumbs={[{ name: "Changelog", href: "/changelog" }]}
      />
      <PendingBanner title="Always current">
        We update daily as GTA VI information lands — follow along via{" "}
        <a href="/feed.xml" className="underline">
          RSS
        </a>
        .
      </PendingBanner>
      <ol className="mt-8 space-y-4">
        {changelog.map((e) => {
          const meta = TAG_META[e.tag];
          const Icon = meta.icon;
          return (
            <li
              key={e.date + e.title}
              className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-brand/30"
            >
              <div className="flex flex-wrap items-center gap-3">
                <time className="font-mono text-xs uppercase tracking-wider text-brand">
                  {e.date}
                </time>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                    meta.className,
                  )}
                >
                  <Icon className="size-3" /> {meta.label}
                </span>
              </div>
              <h2 className="mt-2 font-display text-lg tracking-wide">
                {e.title}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {e.detail}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
