"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FileText, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchDocs, type SearchDoc } from "@/lib/search";
import { trackEvent } from "@/lib/analytics";
import { VerificationBadge } from "@/components/verification-badge";

const TYPE_LABELS: Record<SearchDoc["type"], string> = {
  guide: "Guide",
  vehicle: "Vehicle",
  weapon: "Weapon",
  character: "Character",
  location: "Location",
  collectible: "Collectible",
  music: "Music",
  wildlife: "Wildlife",
  page: "Page",
};

export function SearchPageClient({
  docs,
  initialQuery,
}: {
  docs: SearchDoc[];
  initialQuery: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => searchDocs(docs, query, 50), [docs, query]);

  useEffect(() => {
    if (query.trim()) {
      const t = setTimeout(
        () => trackEvent("search", { search_term: query }),
        600,
      );
      return () => clearTimeout(t);
    }
  }, [query]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    router.replace(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div>
      <form onSubmit={submit} role="search">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search guides, characters, locations..."
            aria-label="Search query"
            className="h-12 pl-9 text-base"
          />
        </div>
      </form>

      <p className="mt-4 text-sm text-muted-foreground" role="status">
        {query.trim()
          ? `${results.length} result${results.length === 1 ? "" : "s"} for “${query}”`
          : "Type a query to search the site."}
      </p>

      {!query.trim() && (
        <div className="mt-8 space-y-6">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Popular searches
            </p>
            <div className="flex flex-wrap gap-1.5">
              {[
                "file size",
                "price",
                "Lucia",
                "Banshee",
                "Vice City",
                "alligator",
                "system requirements",
                "trailer 2",
                "Jason",
                "collectibles",
              ].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setQuery(s)}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-brand/40 hover:text-brand"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Or browse a section
            </p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { label: "Interactive Map", href: "/map", desc: "47 catalogued points of interest" },
                { label: "Guides", href: "/guides", desc: "29 editorial guides" },
                { label: "Vehicle Database", href: "/vehicles", desc: "44 confirmed vehicles" },
                { label: "Characters", href: "/characters", desc: "9 main characters" },
                { label: "Media Gallery", href: "/media", desc: "105+ curated images" },
                { label: "Official Videos", href: "/watch", desc: "4 Rockstar releases" },
              ].map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="rounded-lg border border-border bg-card p-3 transition-colors hover:border-brand/40"
                >
                  <span className="block text-sm font-medium">{s.label}</span>
                  <span className="block text-xs text-muted-foreground">{s.desc}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {query.trim() && results.length === 0 && (
        <div className="mt-8 rounded-lg border border-border bg-card p-6 text-center">
          <p className="text-sm font-medium">No results for “{query}”</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try a broader term — vehicle names, character names, or topics like
            “price”, “map” or “release”.
          </p>
        </div>
      )}

      <ul className="mt-4 space-y-2">
        {results.map((doc) => (
          <li key={doc.id}>
            <Link
              href={doc.href}
              className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-brand/40"
            >
              <FileText className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="font-medium">{doc.title}</span>
                  <span className="rounded border border-border px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                    {TYPE_LABELS[doc.type]}
                  </span>
                  {doc.verificationStatus && (
                    <VerificationBadge status={doc.verificationStatus} />
                  )}
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">
                  {doc.description}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
