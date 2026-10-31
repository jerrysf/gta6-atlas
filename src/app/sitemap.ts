import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getAllGuides } from "@/lib/mdx";
import { vehicles } from "@/data/vehicles";
import { weapons } from "@/data/weapons";
import { characters } from "@/data/characters";
import { locations } from "@/data/locations";
import { collectibles, secrets } from "@/data/collectibles";
import { missions } from "@/data/missions";
import { tracks } from "@/data/music";
import { animals } from "@/data/animals";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    "",
    "/map",
    "/completion",
    "/walkthrough",
    "/walkthrough/main-missions",
    "/walkthrough/side-missions",
    "/vehicles",
    "/weapons",
    "/characters",
    "/locations",
    "/collectibles",
    "/secrets",
    "/music",
    "/wildlife",
    "/media",
    "/guides",
    "/search",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms-of-service",
    "/affiliate-disclosure",
    "/disclaimer",
    "/sitemap",
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const guides = await getAllGuides();
  const guidePages = guides.map((g) => ({
    url: `${siteConfig.url}/guides/${g.slug}`,
    lastModified: g.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const entityPages = [
    ...vehicles.map((v) => `/vehicles/${v.slug}`),
    ...weapons.map((w) => `/weapons/${w.slug}`),
    ...characters.map((c) => `/characters/${c.slug}`),
    ...locations.map((l) => `/locations/${l.slug}`),
    ...collectibles.map((c) => `/collectibles/${c.slug}`),
    ...secrets.map((s) => `/collectibles/${s.slug}`),
    ...missions.map((m) => `/walkthrough/${m.slug}`),
    ...tracks.map((t) => `/music/${t.slug}`),
    ...animals.map((a) => `/wildlife/${a.slug}`),
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...guidePages, ...entityPages];
}
