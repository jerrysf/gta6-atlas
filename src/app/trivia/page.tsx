import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { PendingBanner } from "@/components/pending-banner";
import { StatStrip } from "@/components/database/stat-strip";
import { VerificationBadge } from "@/components/verification-badge";
import { trivia, triviaCategoryLabel, type TriviaItem } from "@/data/trivia";
import { createMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = createMetadata({
  title: "GTA 6 Trivia & Fun Facts — Community Stories, Records & Lore",
  description:
    "The weird and wonderful side of Grand Theft Auto VI: IShowSpeed's New Zealand plan, the Florida Joker, the moon-phase theory, record-breaking trailers and more.",
  path: "/trivia",
});

const categoryOrder: TriviaItem["category"][] = [
  "fandom",
  "records",
  "history",
  "lore",
];

const categoryAccent: Record<TriviaItem["category"], string> = {
  fandom: "border-fuchsia-400/40",
  records: "border-brand/40",
  history: "border-cyan-400/40",
  lore: "border-amber-400/40",
};

const numbering = new Map(
  trivia.map((t, i) => [t.slug, `T-${String(i + 1).padStart(2, "0")}`])
);

export default function TriviaPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <PageHeader
        title="GTA 6 Trivia & Fun Facts"
        description="The stories around the game — the fandom's best moments, the records nobody expected, and the lore hiding in official art."
        breadcrumbs={[{ name: "Trivia", href: "/trivia" }]}
      />
      <PendingBanner title="Honest trivia">
        Verified moments are marked{" "}
        <VerificationBadge status="officially_confirmed" />; fan stories and
        unconfirmed anecdotes are marked{" "}
        <VerificationBadge status="community_reported" /> — entertaining, but
        never presented as settled fact.
      </PendingBanner>
      <StatStrip
        stats={[
          { label: "trivia entries", value: trivia.length },
          {
            label: "officially confirmed",
            value: trivia.filter(
              (t) => t.verificationStatus === "officially_confirmed"
            ).length,
          },
          {
            label: "community stories",
            value: trivia.filter(
              (t) => t.verificationStatus === "community_reported"
            ).length,
          },
          { label: "categories", value: categoryOrder.length },
        ]}
      />
      {categoryOrder.map((cat) => {
        const items = trivia.filter((t) => t.category === cat);
        if (!items.length) return null;
        return (
          <section key={cat} className="mt-10">
            <h2 className="font-display text-2xl tracking-wide">
              {triviaCategoryLabel[cat]}{" "}
              <span className="text-sm text-muted-foreground">
                ({items.length})
              </span>
            </h2>
            <div className="stagger mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((t) => (
                  <div
                    key={t.slug}
                    id={t.slug}
                    className={cn(
                      "flex flex-col rounded-lg border border-border border-t-2 bg-card p-5 transition-colors hover:border-brand/30",
                      categoryAccent[t.category]
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-xs text-muted-foreground">
                        {numbering.get(t.slug)}
                      </span>
                      <VerificationBadge status={t.verificationStatus} />
                    </div>
                    <h3 className="mt-3 text-sm font-semibold leading-snug">
                      {t.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {t.body}
                    </p>
                    {t.sources?.length ? (
                      <div className="mt-4 border-t border-border pt-3">
                        {t.sources.map((s) => (
                          <a
                            key={s.url + s.label}
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:underline"
                          >
                            {s.label}
                            <ExternalLink className="size-3" />
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
              ))}
            </div>
          </section>
        );
      })}
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <Link
          href="/facts"
          className="group flex items-center justify-between rounded-lg border border-border bg-card p-5 transition-colors hover:border-brand/40"
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Prefer hard numbers?
            </p>
            <p className="mt-1 font-display text-lg tracking-wide">
              GTA 6 by the Numbers
            </p>
          </div>
          <ArrowRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-brand" />
        </Link>
        <Link
          href="/timeline"
          className="group flex items-center justify-between rounded-lg border border-border bg-card p-5 transition-colors hover:border-brand/40"
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              The full story so far
            </p>
            <p className="mt-1 font-display text-lg tracking-wide">
              Road to Launch Timeline
            </p>
          </div>
          <ArrowRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-brand" />
        </Link>
      </div>
    </div>
  );
}
