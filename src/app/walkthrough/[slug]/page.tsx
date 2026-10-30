import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, Gauge, Gift, ListTodo } from "lucide-react";
import { missionRepo, locationRepo } from "@/lib/repository";
import { missions } from "@/data/missions";
import { EntityCover } from "@/components/entity-cover";
import { PageBreadcrumbs } from "@/components/breadcrumbs";
import { VerificationBadge } from "@/components/verification-badge";
import { TableOfContents } from "@/components/toc";
import { FaqSection } from "@/components/faq";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { createMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return missions.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/walkthrough/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const m = await missionRepo.getBySlug(slug);
  if (!m) return {};
  return createMetadata({
    title: `${m.name} — GTA 6 ${m.type === "main" ? "Main" : "Side"} Mission Walkthrough`,
    description: m.summary,
    path: `/walkthrough/${m.slug}`,
  });
}

export default async function MissionPage({
  params,
}: PageProps<"/walkthrough/[slug]">) {
  const { slug } = await params;
  const m = await missionRepo.getBySlug(slug);
  if (!m) notFound();

  const allMissions = await missionRepo.getAll();
  const allLocations = await locationRepo.getAll();

  const relatedMissions = (m.relatedMissions ?? [])
    .map((s) => allMissions.find((x) => x.slug === s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));
  const relatedLocations = (m.relatedLocations ?? [])
    .map((s) => allLocations.find((x) => x.slug === s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  const headings = [
    m.objectives?.length ? { depth: 2, text: "Objectives", id: "objectives" } : null,
    m.steps?.length ? { depth: 2, text: "Walkthrough", id: "walkthrough" } : null,
    m.rewards?.length ? { depth: 2, text: "Rewards", id: "rewards" } : null,
    m.faq?.length ? { depth: 2, text: "FAQ", id: "faq-heading" } : null,
  ].filter((h): h is NonNullable<typeof h> => Boolean(h));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <PageBreadcrumbs
        items={[
          { name: "Walkthroughs", href: "/walkthrough" },
          {
            name: m.type === "main" ? "Main Missions" : "Side Missions",
            href:
              m.type === "main"
                ? "/walkthrough/main-missions"
                : "/walkthrough/side-missions",
          },
          { name: m.name, href: `/walkthrough/${m.slug}` },
        ]}
      />

      <div className="mt-6 grid gap-8 lg:grid-cols-[2fr_1fr]">
        <article>
          <EntityCover name={m.name} className="rounded-lg border border-border" />
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              {m.name}
            </h1>
            <VerificationBadge status={m.verificationStatus} />
          </div>
          <p className="mt-4 text-lg text-foreground/90">{m.summary}</p>

          {m.objectives && m.objectives.length > 0 && (
            <section id="objectives" className="mt-10 scroll-mt-24">
              <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
                <ListTodo className="size-5 text-brand" /> Objectives
              </h2>
              <ul className="space-y-2">
                {m.objectives.map((o, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-md border border-border bg-card px-4 py-3 text-sm"
                  >
                    <span className="mt-0.5 font-bold text-brand">{i + 1}.</span>
                    {o}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {m.steps && m.steps.length > 0 && (
            <section id="walkthrough" className="mt-10 scroll-mt-24">
              <h2 className="mb-4 text-2xl font-bold">Walkthrough</h2>
              <ol className="space-y-4">
                {m.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-2 text-sm font-bold text-brand">
                      {i + 1}
                    </span>
                    <p className="pt-1 text-sm leading-relaxed text-foreground/90">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {m.rewards && m.rewards.length > 0 && (
            <section id="rewards" className="mt-10 scroll-mt-24">
              <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
                <Gift className="size-5 text-brand-cyan" /> Rewards
              </h2>
              <ul className="list-disc space-y-2 pl-6 text-sm text-foreground/90 marker:text-brand-cyan">
                {m.rewards.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </section>
          )}

          {m.faq && m.faq.length > 0 && <FaqSection faq={m.faq} withSchema />}

          <Separator className="my-8" />
          <p className="text-xs text-muted-foreground">
            <CalendarDays className="mr-1 inline size-3" /> Last updated:{" "}
            <time dateTime={m.updatedAt}>
              {new Date(m.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </p>
        </article>

        <aside className="space-y-6">
          <TableOfContents headings={headings} />
          <Card>
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">
                Mission Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {m.difficulty && (
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Gauge className="size-4" /> Difficulty
                  </span>
                  <span className="font-medium capitalize">{m.difficulty}</span>
                </div>
              )}
              {m.estimatedTime && (
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="size-4" /> Est. time
                  </span>
                  <span className="font-medium">{m.estimatedTime}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Type</span>
                <span className="font-medium">
                  {m.type === "main" ? "Main mission" : "Side mission"}
                </span>
              </div>
            </CardContent>
          </Card>

          {relatedMissions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">
                  Related Missions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {relatedMissions.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/walkthrough/${r.slug}`}
                        className="text-sm font-medium hover:text-brand"
                      >
                        {r.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {relatedLocations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">
                  Related Locations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {relatedLocations.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/locations/${r.slug}`}
                        className="text-sm font-medium hover:text-brand-cyan"
                      >
                        {r.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </aside>
      </div>
    </div>
  );
}
