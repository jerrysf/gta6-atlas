import { getAllGuides } from "@/lib/mdx";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

function escape(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/** RSS 2.0 feed of published guides for readers and aggregators. */
export async function GET() {
  const guides = await getAllGuides();
  const items = guides
    .map(
      (g) => `    <item>
      <title>${escape(g.title)}</title>
      <link>${siteConfig.url}/guides/${g.slug}</link>
      <guid isPermaLink="true">${siteConfig.url}/guides/${g.slug}</guid>
      <pubDate>${new Date(g.publishedAt).toUTCString()}</pubDate>
      <description>${escape(g.metaDescription)}</description>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escape(siteConfig.name)}</title>
    <link>${siteConfig.url}</link>
    <description>${escape(siteConfig.tagline)}</description>
    <language>en-us</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
