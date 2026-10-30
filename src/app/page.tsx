import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpen,
  CheckSquare,
  Crosshair,
  Database,
  Gem,
  Map as MapIcon,
  MapPin,
  Users,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/section-header";
import { GuideCard } from "@/components/guide-card";
import { FaqSection } from "@/components/faq";
import { PendingBanner } from "@/components/pending-banner";
import { getAllGuides } from "@/lib/mdx";
import JsonLd from "@/components/json-ld";
import { createMetadata, videoGameJsonLd } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "GTA6 Atlas — The Ultimate GTA 6 Guide, Interactive Map & Game Database",
  description:
    "Your ultimate guide to Grand Theft Auto VI. Explore Leonida, discover hidden secrets, master every mission, and track your journey to 100% completion.",
  path: "/",
  keywords: [
    "GTA 6",
    "GTA VI",
    "Grand Theft Auto 6",
    "GTA 6 map",
    "GTA 6 guide",
    "GTA 6 walkthrough",
    "Leonida",
  ],
});

const tools = [
  {
    title: "Interactive GTA 6 Map",
    description:
      "Chart Leonida — locations, missions, collectibles and hidden secrets on our interactive map as data is verified.",
    href: "/map",
    icon: MapIcon,
  },
  {
    title: "100% Completion Tracker",
    description:
      "Track every mission, collectible and requirement on your road to 100% — progress saves in your browser.",
    href: "/completion",
    icon: CheckSquare,
  },
  {
    title: "GTA 6 Database",
    description:
      "Vehicles, weapons, characters and locations — a living encyclopedia for Grand Theft Auto VI.",
    href: "/vehicles",
    icon: Database,
  },
];

const databaseLinks = [
  { label: "Vehicles", href: "/vehicles", icon: Wrench, note: "Cars, bikes, boats & aircraft" },
  { label: "Weapons", href: "/weapons", icon: Crosshair, note: "Stats & unlock methods" },
  { label: "Characters", href: "/characters", icon: Users, note: "Confirmed cast of GTA VI" },
  { label: "Locations", href: "/locations", icon: MapPin, note: "Every region of Leonida" },
  { label: "Collectibles", href: "/collectibles", icon: Gem, note: "Hidden pickups & sets" },
  { label: "Secrets", href: "/secrets", icon: BookOpen, note: "Easter eggs & mysteries" },
];

const homeFaq = [
  {
    question: "When does GTA 6 come out?",
    answer:
      "Grand Theft Auto VI is scheduled to release on November 19, 2026, for PlayStation 5 and Xbox Series X|S, according to Rockstar Games' official announcements.",
  },
  {
    question: "Where is GTA 6 set?",
    answer:
      "GTA VI takes place in the fictional state of Leonida, Rockstar's take on Florida. Confirmed areas include Vice City, the Leonida Keys, the Grassrivers wetlands, Port Gellhorn, Ambrosia, and Mount Kalaga National Park.",
  },
  {
    question: "Who are the protagonists of GTA 6?",
    answer:
      "GTA VI stars two playable protagonists — Lucia Caminos and Jason Duval — a criminal duo in the style of a modern-day Bonnie and Clyde.",
  },
  {
    question: "Is GTA6 Atlas affiliated with Rockstar Games?",
    answer:
      "No. GTA6 Atlas is an independent fan-made guide website and is not affiliated with, endorsed by, or sponsored by Rockstar Games or Take-Two Interactive.",
  },
  {
    question: "How accurate is the information on this site?",
    answer:
      "Every entry is tagged with a verification status — officially confirmed, gameplay verified, community reported, or unverified — so you always know what is proven and what is still rumor. We never publish invented missions, items or locations.",
  },
];

export default async function HomePage() {
  const guides = await getAllGuides();
  const latest = guides.slice(0, 3);
  const popular = guides.filter((g) => g.category !== "news").slice(0, 3);
  const news = guides.filter((g) => g.category === "news").slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <JsonLd data={videoGameJsonLd()} />
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-border bg-card my-8">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 400px at 80% -10%, rgba(53,199,217,0.12), transparent 60%), radial-gradient(900px 380px at 10% 110%, rgba(182,243,74,0.10), transparent 55%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent 0 39px, #35c7d9 39px 40px), repeating-linear-gradient(90deg, transparent 0 39px, #35c7d9 39px 40px)",
          }}
        />
        <div className="relative px-6 py-16 sm:px-12 sm:py-24 lg:px-16">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-semibold tracking-wide text-brand">
            GRAND THEFT AUTO VI · LEONIDA
          </p>
          <h1 className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Your Ultimate Guide to{" "}
            <span className="text-brand">Grand Theft Auto VI</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Explore Leonida, discover hidden secrets, master every mission, and
            track your journey to 100% completion.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/map">
                <MapIcon className="size-4" /> Explore the Map
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/guides">Browse Guides</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured tools */}
      <section aria-labelledby="tools-heading" className="py-8">
        <SectionHeader title="Featured Tools" />
        <div className="grid gap-4 md:grid-cols-3">
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href} className="group">
              <Card className="h-full transition-colors group-hover:border-brand/40">
                <CardHeader>
                  <span className="flex size-11 items-center justify-center rounded-lg bg-surface-2 text-brand">
                    <tool.icon className="size-5" />
                  </span>
                  <CardTitle className="mt-3 text-lg group-hover:text-brand">
                    {tool.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {tool.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-cyan">
                    Open <ArrowRight className="size-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest guides */}
      {latest.length > 0 && (
        <section aria-labelledby="latest-guides" className="py-8">
          <SectionHeader
            title="Latest Guides"
            href="/guides"
            linkLabel="All guides"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((g) => (
              <GuideCard key={g.slug} guide={g} />
            ))}
          </div>
        </section>
      )}

      {/* Walkthroughs */}
      <section aria-labelledby="walkthroughs" className="py-8">
        <SectionHeader
          title="Featured Walkthroughs"
          href="/walkthrough"
          linkLabel="Walkthrough hub"
        />
        <PendingBanner title="Walkthroughs begin at launch — November 19, 2026">
          Full step-by-step mission walkthroughs will be published and verified
          the moment GTA VI is playable. We don&apos;t publish invented mission
          content — everything here will be gameplay-verified.{" "}
          <Link href="/walkthrough" className="text-brand-cyan underline">
            See what&apos;s planned
          </Link>
          .
        </PendingBanner>
      </section>

      {/* Database */}
      <section aria-labelledby="database" className="py-8">
        <SectionHeader title="Explore the Database" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {databaseLinks.map((d) => (
            <Link key={d.href} href={d.href} className="group">
              <Card className="h-full transition-colors group-hover:border-brand-cyan/40">
                <CardContent className="flex items-center gap-4 py-5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-brand-cyan">
                    <d.icon className="size-5" />
                  </span>
                  <div>
                    <p className="font-semibold group-hover:text-brand-cyan">
                      {d.label}
                    </p>
                    <p className="text-xs text-muted-foreground">{d.note}</p>
                  </div>
                  <ArrowRight className="ml-auto size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-brand-cyan" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular guides */}
      {popular.length > 0 && (
        <section aria-labelledby="popular-guides" className="py-8">
          <SectionHeader title="Popular Game Guides" href="/guides" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((g) => (
              <GuideCard key={g.slug} guide={g} />
            ))}
          </div>
        </section>
      )}

      {/* Latest news */}
      {news.length > 0 && (
        <section aria-labelledby="latest-news" className="py-8">
          <SectionHeader title="Latest News" href="/guides" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((g) => (
              <GuideCard key={g.slug} guide={g} />
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="pb-16">
        <FaqSection faq={homeFaq} withSchema />
      </section>
    </div>
  );
}
