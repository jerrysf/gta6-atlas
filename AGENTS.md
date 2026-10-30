<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project: GTA6 Atlas

Fan-made GTA 6 guide site. Commands: `npm run dev` / `npm run lint` / `npm run build` / `npm start`.

- **No invented game data.** Entities live in `src/data/` and must carry an honest `verificationStatus` (`officially_confirmed | gameplay_verified | community_reported | unverified`) plus `sourceReferences`. Never fabricate missions, vehicles, weapons, locations, or coordinates.
- Schemas: `src/lib/schemas.ts` (Zod v4). Types: `src/lib/types.ts`. Repositories: `src/lib/repository.ts` (static now, Supabase-ready).
- Guides are MDX in `src/content/guides/` — frontmatter validated by `guideFrontmatterSchema`.
- Map data comes from `src/lib/map-provider.ts` (provider interface); never hardcode coordinates in map components.
- Completion tracker sample data: `src/data/completion.ts` (`isSampleData: true` until real data exists).
- Analytics/ads are env-gated (`NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_ADSENSE_ID`) — keep them disabled-by-default.
