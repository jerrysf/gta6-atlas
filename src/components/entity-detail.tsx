import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { EntityCover } from "@/components/entity-cover";
import { PageBreadcrumbs } from "@/components/breadcrumbs";
import { VerificationBadge } from "@/components/verification-badge";
import { AdSlot } from "@/components/ads/ad-slot";
import { VERIFICATION_META } from "@/lib/verification";
import type { SourceReference, VerificationStatus } from "@/lib/types";
import type { EntityImage } from "@/data/entity-images";

function TagPill({
  label,
  tone = "muted",
}: {
  label: string;
  tone?: "lime" | "cyan" | "muted";
}) {
  return (
    <span
      className={
        tone === "lime"
          ? "rounded-full border border-brand/40 bg-brand/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-brand"
          : tone === "cyan"
            ? "rounded-full border border-brand-cyan/40 bg-brand-cyan/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-brand-cyan"
            : "rounded-full border border-border bg-surface-2 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground"
      }
    >
      {label}
    </span>
  );
}

export function EntityDetail({
  breadcrumbs,
  name,
  role,
  description,
  verificationStatus,
  image,
  tags = [],
  facts = [],
  sources = [],
  related = [],
  children,
}: {
  breadcrumbs: { name: string; href: string }[];
  name: string;
  role?: string;
  description: string;
  verificationStatus: VerificationStatus;
  image?: EntityImage;
  tags?: { label: string; tone?: "lime" | "cyan" | "muted" }[];
  facts?: { label: string; value: React.ReactNode }[];
  sources?: SourceReference[];
  related?: { name: string; href: string; description?: string }[];
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <PageBreadcrumbs items={breadcrumbs} />
      <div className="mt-6 grid gap-8 lg:grid-cols-[2fr_1fr]">
        <article>
          <figure>
            <div className="relative">
              <EntityCover
                name={name}
                image={image}
                className="rounded-lg border border-border"
              />
              {image && (
                <>
                  <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-t from-background via-background/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end gap-3 p-5">
                    <h1 className="font-display text-4xl uppercase leading-none tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] sm:text-5xl">
                      {name}
                    </h1>
                    <VerificationBadge status={verificationStatus} />
                    {tags.map((t) => (
                      <TagPill key={t.label} {...t} />
                    ))}
                  </div>
                </>
              )}
            </div>
            {image && (
              <figcaption className="mt-2 text-xs text-muted-foreground">
                {image.caption} ·{" "}
                <a
                  href="https://gta.fandom.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-foreground"
                >
                  Image: GTA Wiki
                </a>
              </figcaption>
            )}
          </figure>
          {!image && (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <h1 className="font-display text-4xl uppercase tracking-wide sm:text-5xl">
                {name}
              </h1>
              <VerificationBadge status={verificationStatus} />
              {tags.map((t) => (
                <TagPill key={t.label} {...t} />
              ))}
            </div>
          )}
          {role && (
            <p className="mt-1 text-sm font-medium text-brand-cyan">{role}</p>
          )}
          <p className="mt-4 text-lg leading-relaxed text-foreground/90">
            {description}
          </p>
          {children}
          {sources.length > 0 && (
            <section className="mt-10" aria-label="Sources">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Sources
              </h2>
              <ul className="space-y-1">
                {sources.map((s) => (
                  <li key={s.url}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-brand-cyan underline underline-offset-4"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
        <aside className="space-y-6">
          {facts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">
                  Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {facts.map((f) => (
                  <div key={f.label}>
                    <p className="text-xs text-muted-foreground">{f.label}</p>
                    <div className="text-sm font-medium">{f.value}</div>
                  </div>
                ))}
                <Separator />
                <div>
                  <p className="text-xs text-muted-foreground">
                    Verification status
                  </p>
                  <p className="text-sm font-medium">
                    {VERIFICATION_META[verificationStatus].label}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {VERIFICATION_META[verificationStatus].description}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
          {related.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">
                  Related
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="-mx-2 space-y-0.5">
                  {related.map((r) => (
                    <li key={r.href}>
                      <Link
                        href={r.href}
                        className="group/rel flex items-center justify-between gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-surface-2"
                      >
                        <span>
                          <span className="text-sm font-medium text-foreground group-hover/rel:text-brand">
                            {r.name}
                          </span>
                          {r.description && (
                            <span className="block text-xs text-muted-foreground">
                              {r.description}
                            </span>
                          )}
                        </span>
                        <ArrowRight className="size-3.5 shrink-0 text-muted-foreground/40 transition-transform group-hover/rel:translate-x-0.5 group-hover/rel:text-brand" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
          <AdSlot placement="sidebar" />
        </aside>
      </div>
    </div>
  );
}
