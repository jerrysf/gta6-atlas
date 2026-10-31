# GTA6 Atlas

The ultimate GTA 6 guide, interactive map & game database — an independent, fan-made gaming guide website for Grand Theft Auto VI.

Built with **Next.js 16 (App Router, Turbopack) · TypeScript (strict) · Tailwind CSS v4 · shadcn/ui · MapLibre GL · MDX · Zod**.

> GTA6 Atlas is an independent fan-made guide website. It is not affiliated with, endorsed by, or sponsored by Rockstar Games or Take-Two Interactive. Grand Theft Auto and related trademarks belong to their respective owners.

## Features

- **Homepage** — hero, featured tools, latest guides, database hub, FAQ (`/`)
- **Interactive Map** (`/map`) — MapLibre-powered fictional-world canvas with search, category filters, markers and popups. Honest empty state until verified in-game map data exists.
- **100% Completion Tracker** (`/completion`) — checklist with progress bars, localStorage persistence, JSON export/import, reset confirmation. Ships with clearly-labeled demo data.
- **Walkthroughs** (`/walkthrough`) — main/side mission guide system with objectives, steps, rewards, related content and FAQs. Awaiting-verification placeholders until launch.
- **Game Database** — `/vehicles`, `/weapons`, `/characters`, `/locations`, `/collectibles`, `/secrets` with shared search/filter/sort/pagination UI and SEO-friendly detail pages.
- **Guides** (`/guides`) — MDX editorial content with TOC, metadata, related articles and FAQ schema.
- **Global search** — `Ctrl/⌘ + K` dialog plus `/search` page over a static client-side index (`/api/search`).
- **SEO** — canonical URLs, unique titles/descriptions, OG + Twitter cards, JSON-LD (Organization, WebSite, BreadcrumbList, Article, VideoGame-eligible FAQ), `sitemap.xml`, `robots.txt`, custom 404.
- **Monetization-ready** — disabled-by-default ad slots (header/sidebar/in-article/footer), `AffiliateLink` component, affiliate disclosure page, GA4/AdSense env-driven analytics.

## Verification statuses

No invented content. Every entry carries one of:

| Status | Meaning |
|---|---|
| `officially_confirmed` | From Rockstar Games official materials |
| `gameplay_verified` | Confirmed in-game after release |
| `community_reported` | Community-sourced, not yet verified |
| `unverified` | Awaiting confirmation |

## Project structure

```
src/
  app/            # App Router pages, API routes, sitemap/robots/OG
  components/     # UI (shadcn) + feature components
    ads/          # ad placement slots (disabled by default)
    completion/   # tracker client component
    database/     # shared entity browser (search/filter/sort/paginate)
    layout/       # header, footer, mobile nav
    map/          # MapLibre canvas + provider wiring
    search/       # global search dialog + search page
    ui/           # shadcn/ui primitives
  content/guides/ # MDX editorial content (frontmatter-validated)
  data/           # static entity data (vehicles, weapons, characters, ...)
  lib/            # types, Zod schemas, repositories, SEO, analytics, MDX, map provider
```

### Data layer

Entities are defined in `src/lib/types.ts`, validated by `src/lib/schemas.ts` (Zod), stored as static files in `src/data/`, and accessed through repository interfaces in `src/lib/repository.ts`. Swap the static repositories for a Supabase-backed implementation without touching pages.

### Map architecture

`src/lib/map-provider.ts` exposes a `MapDataProvider` interface returning `MapPoint`s (GeoJSON-compatible). The MVP `StaticMapProvider` returns **no invented coordinates** — markers appear only once verified coordinates exist. Replace or extend the provider after launch.

## Local development

```bash
cp .env.example .env.local   # all values optional for local dev
npm install
npm run dev                  # http://localhost:3000
```

Other commands:

```bash
npm run lint
npm run build
npm start
```

## Environment variables

See `.env.example`. Everything is optional — the site works with zero configuration.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, OG tags |
| `NEXT_PUBLIC_GA_ID` | GA4 measurement ID — analytics off when unset |
| `NEXT_PUBLIC_ADSENSE_ID` | AdSense client ID — ad slots off when unset |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Reserved for future DB backend |

## Deployment (Vercel)

1. Push the repo to GitHub/GitLab and import it in Vercel — framework detection is automatic.
2. Set `NEXT_PUBLIC_SITE_URL` to your production domain (e.g. `https://gta6atlas.com`) in project env vars.
3. Add `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_ADSENSE_ID` when ready to enable analytics/ads.
4. Verify the domain in Google Search Console and submit `/sitemap.xml`.

## Content workflow

- **Guides:** add `.mdx` files in `src/content/guides/` — frontmatter is validated by Zod (`guideFrontmatterSchema`); `draft: true` hides a guide.
- **Database entries:** append to the relevant file in `src/data/` — always set an honest `verificationStatus` and `sourceReferences`.
- **Completion checklist:** replace `src/data/completion.ts` with verified requirements after launch (`isSampleData: false` removes the demo banner).

## Launch-day content pipeline (Nov 19, 2026)

Traffic peaks at release — whoever publishes verified data first wins the
search results. In order of expected search volume:

1. **Missions** — add real entries to `src/data/missions.ts` (`main`/`side`)
   as they're verified; walkthrough pages generate automatically.
2. **Collectibles** — real coordinates go into `src/data/collectibles.ts`
   (`kind: "collectible"`) so they appear on the interactive map.
3. **Vehicles/weapons** — flip `community_reported` entries to
   `gameplay_verified` once confirmed in-game; fill `location`/`acquisition`.
4. **Achievements** — update the achievements guide with the real PSN/Xbox
   list when it publishes.
5. **Map** — replace community coordinates with verified in-game positions;
   keep the artwork attribution until an official map exists.

Every new entry still needs an honest `verificationStatus` +
`sourceReferences` — that's the site's credibility moat.

## Known limitations

- Vehicle/weapon/collectible/secret/mission datasets are intentionally empty until verified information exists (after the Nov 19, 2026 release).
- The map canvas is a stylized placeholder plane — not the in-game map — pending official cartography/verified coordinates.
- Progress tracking is per-browser localStorage (no accounts yet).
- Contact form opens a mailto draft — no backend email service is wired.
