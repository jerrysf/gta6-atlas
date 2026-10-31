#!/usr/bin/env node
// Route smoke test: fetches every URL in sitemap.xml from a running
// server and asserts a 200 response. Usage:
//   npm run build && npm run start &  →  node scripts/smoke.mjs
//   BASE=http://localhost:3000 node scripts/smoke.mjs
const BASE = process.env.BASE ?? "http://localhost:3000";
const CONCURRENCY = 12;
const TIMEOUT_MS = 15_000;

const res = await fetch(`${BASE}/sitemap.xml`, {
  signal: AbortSignal.timeout(TIMEOUT_MS),
});
if (!res.ok) {
  console.error(`✖ sitemap fetch failed: HTTP ${res.status}`);
  process.exit(1);
}
const xml = await res.text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => {
  const u = new URL(m[1]);
  return u.pathname;
});

console.log(`smoke: ${urls.length} routes @ ${BASE}\n`);

let failed = 0;
for (let i = 0; i < urls.length; i += CONCURRENCY) {
  const batch = await Promise.allSettled(
    urls.slice(i, i + CONCURRENCY).map(async (path) => {
      const r = await fetch(`${BASE}${path}`, {
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      if (!r.ok) throw new Error(`${path} → HTTP ${r.status}`);
      const body = await r.text();
      if (body.includes("Application error") || body.includes("500:")) {
        throw new Error(`${path} → error page content`);
      }
      return path;
    }),
  );
  for (const r of batch) {
    if (r.status === "rejected") {
      failed++;
      console.error(`  ✖ ${r.reason.message}`);
    }
  }
}

if (failed) {
  console.error(`\n✖ ${failed}/${urls.length} routes failed`);
  process.exit(1);
}
console.log(`✔ all ${urls.length} routes OK`);
