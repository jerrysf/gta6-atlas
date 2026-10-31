import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { getAllGuides } from "@/lib/mdx";
import { characters } from "@/data/characters";
import { locations } from "@/data/locations";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Sitemap",
  description: "Every page on GTA6 Atlas.",
  path: "/sitemap",
  noIndex: true,
});

const sections = [
  {
    title: "Main",
    links: [
      { label: "Home", href: "/" },
      { label: "Interactive Map", href: "/map" },
      { label: "FL Roam", href: "/explore" },
      { label: "Completion Tracker", href: "/completion" },
      { label: "Launch Timeline", href: "/timeline" },
      { label: "By the Numbers", href: "/facts" },
      { label: "Trivia & Fun Facts", href: "/trivia" },
      { label: "Changelog", href: "/changelog" },
      { label: "Search", href: "/search" },
    ],
  },
  {
    title: "Content",
    links: [
      { label: "Guides", href: "/guides" },
      { label: "Media Gallery", href: "/media" },
      { label: "Official Videos", href: "/watch" },
      { label: "RSS Feed", href: "/feed.xml" },
    ],
  },
  {
    title: "Walkthroughs",
    links: [
      { label: "Walkthrough Hub", href: "/walkthrough" },
      { label: "Main Missions", href: "/walkthrough/main-missions" },
      { label: "Side Missions", href: "/walkthrough/side-missions" },
    ],
  },
  {
    title: "Database",
    links: [
      { label: "Vehicles", href: "/vehicles" },
      { label: "Weapons", href: "/weapons" },
      { label: "Characters", href: "/characters" },
      { label: "Locations", href: "/locations" },
      { label: "Collectibles", href: "/collectibles" },
      { label: "Secrets", href: "/secrets" },
      { label: "Music & Soundtrack", href: "/music" },
      { label: "Wildlife", href: "/wildlife" },
    ],
  },
  {
    title: "Company & Legal",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
      { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
      { label: "Disclaimer", href: "/disclaimer" },
    ],
  },
];

export default async function SitemapPage() {
  const guides = await getAllGuides();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <PageHeader
        title="Sitemap"
        breadcrumbs={[{ name: "Sitemap", href: "/sitemap" }]}
      />
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {sections.map((s) => (
          <div key={s.title}>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {s.title}
            </h2>
            <ul className="space-y-2">
              {s.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-foreground/80 hover:text-brand"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Guides
          </h2>
          <ul className="space-y-2">
            <li>
              <Link href="/guides" className="text-sm font-medium text-brand-cyan hover:underline">
                All guides
              </Link>
            </li>
            {guides.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/guides/${g.slug}`}
                  className="text-sm text-foreground/80 hover:text-brand"
                >
                  {g.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Characters
          </h2>
          <ul className="space-y-2">
            {characters.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/characters/${c.slug}`}
                  className="text-sm text-foreground/80 hover:text-brand"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Locations
          </h2>
          <ul className="space-y-2">
            {locations.map((l) => (
              <li key={l.slug}>
                <Link
                  href={`/locations/${l.slug}`}
                  className="text-sm text-foreground/80 hover:text-brand"
                >
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
