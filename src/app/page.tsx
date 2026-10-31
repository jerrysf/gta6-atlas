import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpen,
  CheckSquare,
  Crosshair,
  Database,
  Gem,
  Images,
  Map as MapIcon,
  MapPin,
  Music,
  PawPrint,
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
import { Countdown } from "@/components/countdown";
import { PreorderCta } from "@/components/preorder-cta";
import { createMetadata, videoGameJsonLd } from "@/lib/seo";
import { entityImages } from "@/data/entity-images";
import { vehicles } from "@/data/vehicles";
import { weapons } from "@/data/weapons";
import { locations } from "@/data/locations";
import { characters } from "@/data/characters";
import { collectibles, secrets } from "@/data/collectibles";
import { tracks } from "@/data/music";
import { animals } from "@/data/animals";
import { officialVideos } from "@/data/videos";
import { changelog } from "@/data/changelog";
import { VideoGrid } from "@/components/video-grid";

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
    image: "/leonida-base.webp",
    imageAlt: "Fan-made Leonida world map artwork",
    objectPosition: "55% 60%",
  },
  {
    title: "100% Completion Tracker",
    description:
      "Track every mission, collectible and requirement on your road to 100% — progress saves in your browser.",
    href: "/completion",
    icon: CheckSquare,
    image: entityImages["lucia-caminos"].url,
    imageAlt: "Lucia Caminos official portrait",
    objectPosition: "50% 20%",
  },
  {
    title: "GTA 6 Database",
    description:
      "Vehicles, weapons, characters and locations — a living encyclopedia for Grand Theft Auto VI.",
    href: "/vehicles",
    icon: Database,
    image: entityImages["bravado-banshee"].url,
    imageAlt: "Bravado Banshee in GTA VI Trailer 2",
    objectPosition: "50% 50%",
  },
];

const tickerItems = [
  "VICE CITY",
  "LEONIDA KEYS",
  "GRASSRIVERS",
  "PORT GELLHORN",
  "AMBROSIA",
  "MOUNT KALAGA",
  "NOV 19 2026",
  "LUCIA CAMINOS",
  "JASON DUVAL",
];

const databaseLinks = [
  { label: "Vehicles", href: "/vehicles", icon: Wrench, note: "Cars, bikes, boats & aircraft" },
  { label: "Weapons", href: "/weapons", icon: Crosshair, note: "Stats & unlock methods" },
  { label: "Characters", href: "/characters", icon: Users, note: "Confirmed cast of GTA VI" },
  { label: "Locations", href: "/locations", icon: MapPin, note: "Every region of Leonida" },
  { label: "Collectibles", href: "/collectibles", icon: Gem, note: "Hidden pickups & sets" },
  { label: "Secrets", href: "/secrets", icon: BookOpen, note: "Easter eggs & mysteries" },
  { label: "Music", href: "/music", icon: Music, note: "Soundtrack & The Album" },
  { label: "Wildlife", href: "/wildlife", icon: PawPrint, note: "Animals of Leonida" },
  { label: "Media", href: "/media", icon: Images, note: "Screenshots & artwork" },
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
  const latest = guides.slice(0, 6);
  const popular = guides.filter((g) => g.category !== "news").slice(0, 3);
  const news = guides.filter((g) => g.category === "news").slice(0, 6);

  const dbStats = [
    { n: vehicles.length, l: "Vehicles", href: "/vehicles" },
    { n: weapons.length, l: "Weapons", href: "/weapons" },
    { n: locations.length, l: "Locations", href: "/locations" },
    { n: characters.length, l: "Characters", href: "/characters" },
    {
      n: secrets.length,
      l: "Secrets",
      href: "/secrets",
    },
    { n: tracks.length, l: "Tracks", href: "/music" },
    { n: animals.length, l: "Animals", href: "/wildlife" },
  ];
  const dbCounts: Record<string, number> = Object.fromEntries(
    dbStats.map((s) => [s.href, s.n]),
  );
  dbCounts["/collectibles"] = collectibles.filter(
    (c) => c.kind === "collectible",
  ).length;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <JsonLd data={videoGameJsonLd()} />
      {/* Hero */}
      <section className="clip-notch relative my-8 overflow-hidden rounded-2xl border border-border bg-card">
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
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] sm:block"
          style={{
            maskImage:
              "linear-gradient(to left, black 0%, transparent 95%)",
            WebkitMaskImage:
              "linear-gradient(to left, black 0%, transparent 95%)",
          }}
        >
          <Image
            src="/leonida-hero.webp"
            alt=""
            fill
            quality={55}
            className="object-cover object-[55%_55%] opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/70 via-transparent to-transparent" />
        </div>
        <p
          aria-hidden
          className="text-outline pointer-events-none absolute -right-8 top-0 select-none font-display text-[22vw] leading-none opacity-40 sm:text-[16vw] lg:text-[13rem]"
        >
          VI
        </p>
        <div className="relative px-6 py-16 sm:px-12 sm:py-24 lg:px-16">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <p className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 font-mono text-[11px] font-semibold tracking-[0.2em] text-brand">
              GRAND THEFT AUTO VI · LEONIDA
            </p>
            <Countdown />
          </div>
          <h1 className="max-w-3xl font-display text-5xl uppercase leading-[0.95] tracking-wide sm:text-6xl lg:text-7xl">
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
        <div
          aria-hidden
          className="relative border-t border-border/60 bg-background/40 py-3"
        >
          <div className="overflow-hidden">
            <div className="animate-ticker flex w-max gap-8 whitespace-nowrap font-mono text-xs tracking-[0.25em] text-muted-foreground">
              {[...tickerItems, ...tickerItems].map((item, i) => (
                <span key={i} className="flex items-center gap-8">
                  <span>{item}</span>
                  <span className="text-brand">◆</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Database stats strip */}
      <section
        aria-label="Database coverage"
        className="grid grid-cols-2 overflow-hidden rounded-xl border border-border bg-border/60 gap-px sm:grid-cols-4 lg:grid-cols-7"
      >
        {dbStats.map((s) => (
          <Link
            key={s.l}
            href={s.href}
            className="group bg-card px-4 py-5 text-center transition-colors hover:bg-surface-2"
          >
            <p className="font-display text-3xl text-brand group-hover:text-brand-cyan">
              {s.n}
            </p>
            <p className="mt-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {s.l}
            </p>
          </Link>
        ))}
      </section>
      <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        Documented from official GTA VI media · every entry tagged by
        verification status
      </p>

      {/* Featured tools */}
      <section aria-labelledby="tools-heading" className="py-8">
        <SectionHeader title="Featured Tools" index={1} />
        <div className="grid gap-4 md:grid-cols-3">
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href} className="group">
              <Card className="lift clip-notch h-full pt-0 group-hover:border-brand/40">
                <div className="relative aspect-[16/8] overflow-hidden">
                  <Image
                    src={tool.image}
                    alt={tool.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: tool.objectPosition }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                  <span className="absolute left-4 top-4 flex size-11 items-center justify-center rounded-lg border border-border/60 bg-background/70 text-brand backdrop-blur">
                    <tool.icon className="size-5" />
                  </span>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg group-hover:text-brand">
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

      {/* Official videos */}
      <section aria-labelledby="videos" className="py-8">
        <SectionHeader title="Official Videos" index={2} />
        <VideoGrid videos={officialVideos} />
      </section>

      {/* Latest guides */}
      {latest.length > 0 && (
        <section aria-labelledby="latest-guides" className="py-8">
          <SectionHeader
            title="Latest Guides"
            href="/guides"
            linkLabel="All guides"
            index={3}
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
          index={4}
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
        <SectionHeader title="Explore the Database" index={5} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {databaseLinks.map((d) => (
            <Link key={d.href} href={d.href} className="group">
              <Card className="lift h-full group-hover:border-brand-cyan/40">
                <CardContent className="flex items-center gap-4 py-5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-brand-cyan">
                    <d.icon className="size-5" />
                  </span>
                  <div>
                    <p className="font-semibold group-hover:text-brand-cyan">
                      {d.label}
                      {dbCounts[d.href] > 0 && (
                        <span className="ml-1.5 rounded-sm bg-brand/15 px-1.5 py-0.5 font-mono text-[11px] text-brand">
                          {dbCounts[d.href]}
                        </span>
                      )}
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
          <SectionHeader title="Popular Game Guides" href="/guides" index={6} />
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
          <SectionHeader title="Latest News" href="/guides" index={7} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((g) => (
              <GuideCard key={g.slug} guide={g} />
            ))}
          </div>
        </section>
      )}

      {/* Site updates strip */}
      <section aria-labelledby="site-updates" className="pb-8">
        <div className="rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              <span className="mr-2 inline-block size-1.5 rounded-full bg-brand align-middle" />
              Site updates
            </p>
            <Link
              href="/changelog"
              className="text-xs font-medium text-brand-cyan hover:underline"
            >
              Full changelog →
            </Link>
          </div>
          <ul className="divide-y divide-border/60">
            {changelog.slice(0, 3).map((e) => (
              <li
                key={e.date + e.title}
                className="flex flex-wrap items-baseline gap-x-4 px-4 py-2.5"
              >
                <time className="shrink-0 font-mono text-xs text-brand">
                  {e.date}
                </time>
                <span className="text-sm font-medium">{e.title}</span>
                <span className="hidden text-xs text-muted-foreground sm:inline">
                  {e.detail}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pre-order CTA */}
      <section aria-label="Pre-order" className="pb-8">
        <PreorderCta />
      </section>

      {/* FAQ */}
      <section className="pb-16">
        <FaqSection faq={homeFaq} withSchema />
      </section>
    </div>
  );
}
