import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { PendingBanner } from "@/components/pending-banner";
import { StatStrip } from "@/components/database/stat-strip";
import { VerificationBadge } from "@/components/verification-badge";
import { facts } from "@/data/facts";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "GTA 6 by the Numbers — Records, Stats & Confirmed Facts",
  description:
    "Grand Theft Auto VI in numbers: record-breaking trailer views, the 34-track album, two protagonists, six Leonida regions and the 13-year wait.",
  path: "/facts",
});

export default function FactsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <PageHeader
        title="GTA 6 by the Numbers"
        description="Every documented figure in Grand Theft Auto VI's story — records broken, content confirmed, and the stats still waiting on Rockstar."
        breadcrumbs={[{ name: "Facts", href: "/facts" }]}
      />
      <PendingBanner title="Honest numbers">
        Official figures are marked{" "}
        <VerificationBadge status="officially_confirmed" />; estimates are
        marked <VerificationBadge status="community_reported" /> and never
        presented as fact.
      </PendingBanner>
      <StatStrip
        stats={[
          { label: "documented stats", value: facts.length },
          {
            label: "officially confirmed",
            value: facts.filter((f) => f.verificationStatus === "officially_confirmed").length,
          },
          { label: "world records", value: 2 },
          { label: "years waited", value: 13 },
        ]}
      />
      <div className="stagger mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {facts.map((f) => (
          <div
            key={f.label}
            className="flex flex-col rounded-lg border border-border bg-card p-5 transition-colors hover:border-brand/30"
          >
            <p className="font-display text-4xl tracking-wide text-brand">
              {f.stat}
            </p>
            <h2 className="mt-2 text-sm font-semibold uppercase tracking-wider">
              {f.label}
            </h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {f.context}
            </p>
            <div className="mt-4 flex items-center justify-between gap-3">
              <VerificationBadge status={f.verificationStatus} />
              {f.href && (
                <Link
                  href={f.href}
                  className="inline-flex items-center gap-1 text-xs font-medium text-brand-cyan hover:underline"
                >
                  Details <ArrowRight className="size-3" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
