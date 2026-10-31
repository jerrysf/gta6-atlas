import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Flag } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { PendingBanner } from "@/components/pending-banner";
import { StatStrip } from "@/components/database/stat-strip";
import { VerificationBadge } from "@/components/verification-badge";
import { timelineEvents } from "@/data/timeline";
import { createMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = createMetadata({
  title: "GTA 6 Timeline — Every Confirmed Event on the Road to Launch",
  description:
    "The complete Grand Theft Auto VI timeline: the 2022 leak, Trailer 1, Trailer 2, the Extended Look, the soundtrack album and the November 19, 2026 launch.",
  path: "/timeline",
});

export default function TimelinePage() {
  const years = [...new Set(timelineEvents.map((e) => e.year))];
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <PageHeader
        title="The Road to GTA 6"
        description="Thirteen years after GTA 5 — every documented event in Grand Theft Auto VI's journey from rumor to release."
        breadcrumbs={[{ name: "Timeline", href: "/timeline" }]}
      />
      <PendingBanner title="Sourcing">
        Official events are marked{" "}
        <VerificationBadge status="officially_confirmed" />; media reports are
        marked <VerificationBadge status="community_reported" /> and never
        presented as fact.
      </PendingBanner>
      <StatStrip
        stats={[
          { label: "documented events", value: timelineEvents.length },
          { label: "years covered", value: years.length },
          { label: "official videos", value: 4 },
          { label: "launch", value: "Nov 19 '26" },
        ]}
      />

      <ol className="relative mt-10 border-l-2 border-border pl-6 sm:pl-10">
        {timelineEvents.map((e, i) => {
          const isLaunch = i === timelineEvents.length - 1;
          const newYear =
            i === 0 || timelineEvents[i - 1].year !== e.year;
          return (
            <li key={e.title} className="relative pb-10 last:pb-0">
              <span
                className={cn(
                  "absolute -left-[31px] top-1 flex size-4 items-center justify-center rounded-full border-2 sm:-left-[47px]",
                  isLaunch
                    ? "border-brand bg-brand"
                    : "border-brand/60 bg-background",
                )}
              >
                {isLaunch && <Flag className="size-2.5 text-background" />}
              </span>
              {newYear && (
                <p className="mb-2 font-display text-sm tracking-[0.3em] text-brand-cyan">
                  {e.year}
                </p>
              )}
              <div
                className={cn(
                  "rounded-lg border bg-card p-5 transition-colors",
                  isLaunch
                    ? "border-brand/50 shadow-[0_0_40px_-10px] shadow-brand/30"
                    : "border-border hover:border-brand/30",
                )}
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <time className="font-mono text-xs uppercase tracking-wider text-brand">
                    {e.date}
                  </time>
                  <VerificationBadge status={e.verificationStatus} />
                </div>
                <h2
                  className={cn(
                    "mt-2 font-display text-xl tracking-wide",
                    isLaunch && "text-brand",
                  )}
                >
                  {e.title}
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  {e.description}
                </p>
                {e.links && (
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                    {e.links.map((l) => (
                      <Link
                        key={l.href + l.label}
                        href={l.href}
                        className="inline-flex items-center gap-1 text-xs font-medium text-brand-cyan hover:underline"
                      >
                        {l.label} <ArrowRight className="size-3" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
