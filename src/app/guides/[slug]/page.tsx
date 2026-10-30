import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, User } from "lucide-react";
import { getAllGuides, getGuide, getGuideSlugs } from "@/lib/mdx";
import { MdxRenderer } from "@/components/mdx-renderer";
import { PageBreadcrumbs } from "@/components/breadcrumbs";
import { TableOfContents } from "@/components/toc";
import { FaqSection } from "@/components/faq";
import { VerificationBadge } from "@/components/verification-badge";
import { AdSlot } from "@/components/ads/ad-slot";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import JsonLd from "@/components/json-ld";
import { articleJsonLd, createMetadata } from "@/lib/seo";
import { guideCategoryLabel } from "@/components/guide-card";

export function generateStaticParams() {
  return getGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuide(slug);
  if (!guide) return {};
  return createMetadata({
    title: guide.seoTitle ?? guide.title,
    description: guide.metaDescription,
    path: `/guides/${guide.slug}`,
  });
}

export default async function GuidePage({
  params,
}: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  const guide = await getGuide(slug);
  if (!guide) notFound();

  const all = await getAllGuides();
  const related = (guide.related ?? [])
    .map((s) => all.find((g) => g.slug === s))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));
  const fallbackRelated =
    related.length > 0
      ? related
      : all.filter((g) => g.slug !== guide.slug).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={articleJsonLd({
          title: guide.title,
          description: guide.metaDescription,
          path: `/guides/${guide.slug}`,
          publishedAt: guide.publishedAt,
          updatedAt: guide.updatedAt,
          author: guide.author,
        })}
      />
      <PageBreadcrumbs
        items={[
          { name: "Guides", href: "/guides" },
          { name: guide.title, href: `/guides/${guide.slug}` },
        ]}
      />

      <div className="mt-6 grid gap-8 lg:grid-cols-[2fr_1fr]">
        <article>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">
              {guideCategoryLabel(guide.category)}
            </Badge>
            <VerificationBadge status={guide.verificationStatus} />
          </div>
          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
            {guide.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <User className="size-4" /> {guide.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-4" /> Published{" "}
              <time dateTime={guide.publishedAt}>
                {new Date(guide.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </span>
            <span>
              Updated{" "}
              <time dateTime={guide.updatedAt}>
                {new Date(guide.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </span>
          </div>

          <TableOfContents headings={guide.headings} className="mt-8 lg:hidden" />

          <div className="mt-8">
            <MdxRenderer source={guide.body} />
          </div>

          <AdSlot placement="in-article" className="my-8" />

          {guide.faq && guide.faq.length > 0 && (
            <FaqSection faq={guide.faq} withSchema />
          )}
        </article>

        <aside className="space-y-6">
          <TableOfContents headings={guide.headings} className="sticky top-20 hidden lg:block" />
          {fallbackRelated.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">
                  Related Guides
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {fallbackRelated.map((g) => (
                    <li key={g.slug}>
                      <Link
                        href={`/guides/${g.slug}`}
                        className="text-sm font-medium hover:text-brand"
                      >
                        {g.title}
                      </Link>
                      <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                        {g.metaDescription}
                      </p>
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
