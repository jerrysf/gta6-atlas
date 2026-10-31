import type { VerificationStatus } from "@/lib/types";

export interface SearchDoc {
  id: string;
  title: string;
  description: string;
  href: string;
  type:
    | "guide"
    | "vehicle"
    | "weapon"
    | "character"
    | "location"
    | "collectible"
    | "music"
    | "wildlife"
    | "page";
  verificationStatus?: VerificationStatus;
}

/**
 * Static search index for the MVP — client-side substring matching over
 * a serialized index built at request/build time. The interface is a plain
 * array of docs so it can later migrate to a dedicated search service
 * (Algolia, Typesense, Supabase FTS) without UI changes.
 */
export function buildSearchDocs(input: {
  guides: { title: string; slug: string; metaDescription: string; verificationStatus: VerificationStatus }[];
  characters: { name: string; slug: string; description: string; verificationStatus: VerificationStatus }[];
  locations: { name: string; slug: string; description: string; verificationStatus: VerificationStatus }[];
  vehicles: { name: string; slug: string; description: string; verificationStatus: VerificationStatus }[];
  weapons: { name: string; slug: string; description: string; verificationStatus: VerificationStatus }[];
  collectibles: { name: string; slug: string; description: string; verificationStatus: VerificationStatus }[];
  tracks?: { name: string; slug: string; artist: string; description: string; verificationStatus: VerificationStatus }[];
  animals?: { name: string; slug: string; description: string; verificationStatus: VerificationStatus }[];
}): SearchDoc[] {
  const docs: SearchDoc[] = [
    { id: "page-map", title: "Interactive Map", description: "Explore the world of Leonida on the GTA6 Atlas interactive map.", href: "/map", type: "page" },
    { id: "page-completion", title: "100% Completion Tracker", description: "Track your journey to 100% completion.", href: "/completion", type: "page" },
    { id: "page-walkthrough", title: "Walkthroughs", description: "Step-by-step mission walkthroughs.", href: "/walkthrough", type: "page" },
    { id: "page-guides", title: "Guides", description: "All GTA6 Atlas guides and tips.", href: "/guides", type: "page" },
    { id: "page-vehicles", title: "Vehicles Database", description: "Cars, motorcycles, boats and aircraft.", href: "/vehicles", type: "page" },
    { id: "page-weapons", title: "Weapons Database", description: "Every GTA 6 weapon catalogued.", href: "/weapons", type: "page" },
    { id: "page-characters", title: "Characters Database", description: "Meet the cast of Grand Theft Auto VI.", href: "/characters", type: "page" },
    { id: "page-locations", title: "Locations Database", description: "Every confirmed region of Leonida.", href: "/locations", type: "page" },
    { id: "page-collectibles", title: "Collectibles", description: "Find every collectible in Leonida.", href: "/collectibles", type: "page" },
    { id: "page-secrets", title: "Secrets & Easter Eggs", description: "Hidden secrets and easter eggs.", href: "/secrets", type: "page" },
  ];
  for (const g of input.guides)
    docs.push({ id: `guide-${g.slug}`, title: g.title, description: g.metaDescription, href: `/guides/${g.slug}`, type: "guide", verificationStatus: g.verificationStatus });
  for (const c of input.characters)
    docs.push({ id: `char-${c.slug}`, title: c.name, description: c.description, href: `/characters/${c.slug}`, type: "character", verificationStatus: c.verificationStatus });
  for (const l of input.locations)
    docs.push({ id: `loc-${l.slug}`, title: l.name, description: l.description, href: `/locations/${l.slug}`, type: "location", verificationStatus: l.verificationStatus });
  for (const v of input.vehicles)
    docs.push({ id: `veh-${v.slug}`, title: v.name, description: v.description, href: `/vehicles/${v.slug}`, type: "vehicle", verificationStatus: v.verificationStatus });
  for (const w of input.weapons)
    docs.push({ id: `wpn-${w.slug}`, title: w.name, description: w.description, href: `/weapons/${w.slug}`, type: "weapon", verificationStatus: w.verificationStatus });
  for (const c of input.collectibles)
    docs.push({ id: `col-${c.slug}`, title: c.name, description: c.description, href: `/collectibles/${c.slug}`, type: "collectible", verificationStatus: c.verificationStatus });
  docs.push(
    { id: "page-music", title: "Music & Soundtrack", description: "Every confirmed GTA 6 song and The Album.", href: "/music", type: "page" },
    { id: "page-wildlife", title: "Animals & Wildlife", description: "Every creature spotted in Leonida.", href: "/wildlife", type: "page" },
    { id: "page-media", title: "Screenshots & Media", description: "Official GTA VI screenshots and images gallery.", href: "/media", type: "page" },
    { id: "page-watch", title: "Official Videos", description: "Watch every official GTA 6 trailer and the Extended Look.", href: "/watch", type: "page" },
    { id: "page-timeline", title: "Road to Launch Timeline", description: "Every confirmed GTA 6 event from leak to launch day.", href: "/timeline", type: "page" },
    { id: "page-changelog", title: "Site Changelog", description: "What's new on GTA6 Atlas — every update logged.", href: "/changelog", type: "page" },
  );
  for (const t of input.tracks ?? [])
    docs.push({ id: `trk-${t.slug}`, title: `${t.name} — ${t.artist}`, description: t.description, href: `/music/${t.slug}`, type: "music", verificationStatus: t.verificationStatus });
  for (const a of input.animals ?? [])
    docs.push({ id: `anm-${a.slug}`, title: a.name, description: a.description, href: `/wildlife/${a.slug}`, type: "wildlife", verificationStatus: a.verificationStatus });
  return docs;
}

export function searchDocs(docs: SearchDoc[], query: string, limit = 20): SearchDoc[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const scored = docs
    .map((d) => {
      const title = d.title.toLowerCase();
      const desc = d.description.toLowerCase();
      let score = 0;
      if (title === q) score = 100;
      else if (title.startsWith(q)) score = 60;
      else if (title.includes(q)) score = 40;
      else if (desc.includes(q)) score = 10;
      return { d, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((r) => r.d);
}
