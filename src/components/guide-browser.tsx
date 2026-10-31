"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { GuideCard, guideCategoryLabel } from "@/components/guide-card";
import type { Guide, GuideCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

const CATEGORY_ORDER: GuideCategory[] = [
  "news",
  "beginner",
  "exploration",
  "gameplay-mechanics",
  "money",
  "combat",
  "wanted-level",
  "advanced",
];

export function GuideBrowser({ guides }: { guides: Guide[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<GuideCategory | "all">("all");

  const counts = useMemo(() => {
    const map = new Map<GuideCategory, number>();
    for (const g of guides) map.set(g.category, (map.get(g.category) ?? 0) + 1);
    return map;
  }, [guides]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return guides
      .filter((g) => category === "all" || g.category === category)
      .filter(
        (g) =>
          !q ||
          g.title.toLowerCase().includes(q) ||
          g.metaDescription.toLowerCase().includes(q),
      )
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
  }, [guides, query, category]);

  return (
    <div>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search guides…"
          aria-label="Search guides"
          className="h-10 w-full rounded-md border border-border bg-card pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-brand/60"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCategory("all")}
          className={cn(
            "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
            category === "all"
              ? "border-brand bg-brand/10 font-medium text-brand"
              : "border-border bg-card text-muted-foreground hover:border-brand/40 hover:text-foreground",
          )}
        >
          All <span className="ml-1 font-mono text-xs">{guides.length}</span>
        </button>
        {CATEGORY_ORDER.filter((c) => counts.has(c)).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
              category === c
                ? "border-brand bg-brand/10 font-medium text-brand"
                : "border-border bg-card text-muted-foreground hover:border-brand/40 hover:text-foreground",
            )}
          >
            {guideCategoryLabel(c)}{" "}
            <span className="ml-1 font-mono text-xs">{counts.get(c)}</span>
          </button>
        ))}
      </div>

      <p className="mt-5 font-mono text-xs uppercase tracking-wider text-muted-foreground">
        {filtered.length} result{filtered.length === 1 ? "" : "s"}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((g) => (
            <GuideCard key={g.slug} guide={g} />
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-md border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No guides match your filters.
        </div>
      )}
    </div>
  );
}
