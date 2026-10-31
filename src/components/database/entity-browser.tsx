"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EntityCard } from "@/components/entity-card";
import { EmptyState } from "@/components/empty-state";
import type { VerificationStatus } from "@/lib/types";

export interface BrowserItem {
  name: string;
  slug: string;
  description: string;
  href: string;
  meta?: string;
  category?: string;
  tag?: string;
  verificationStatus?: VerificationStatus;
}

const PAGE_SIZE = 12;

export function EntityBrowser({
  items,
  categoryOptions = [],
  searchPlaceholder = "Search...",
  portrait,
  emptyState,
}: {
  items: BrowserItem[];
  categoryOptions?: { value: string; label: string }[];
  searchPlaceholder?: string;
  portrait?: boolean;
  emptyState?: React.ReactNode;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("name-asc");
  const [page, setPage] = useState(1);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: items.length };
    for (const i of items) {
      if (i.category) map[i.category] = (map[i.category] ?? 0) + 1;
    }
    return map;
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = items.filter(
      (i) =>
        (!q ||
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q)) &&
        (category === "all" || i.category === category),
    );
    list = [...list].sort((a, b) =>
      sort === "name-desc"
        ? b.name.localeCompare(a.name)
        : a.name.localeCompare(b.name),
    );
    return list;
  }, [items, query, category, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const pageItems = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const reset = () => setPage(1);

  if (items.length === 0) return <>{emptyState ?? null}</>;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-56 flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              reset();
            }}
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            className="pl-9"
          />
        </div>
        <Select
          value={sort}
          onValueChange={(v) => {
            setSort(v);
            reset();
          }}
        >
          <SelectTrigger className="w-40" aria-label="Sort order">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name-asc">Name A–Z</SelectItem>
            <SelectItem value="name-desc">Name Z–A</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {categoryOptions.length > 0 && (
        <div
          className="flex flex-wrap items-center gap-2"
          role="tablist"
          aria-label="Filter by category"
        >
          {[{ value: "all", label: "All" }, ...categoryOptions].map((o) => {
            const active = category === o.value;
            return (
              <button
                key={o.value}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setCategory(o.value);
                  reset();
                }}
                className={
                  active
                    ? "inline-flex items-center gap-1.5 rounded-full border border-brand/60 bg-brand/15 px-3.5 py-1.5 text-xs font-semibold text-brand transition-colors"
                    : "inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground"
                }
              >
                {o.label}
                <span
                  className={
                    active
                      ? "rounded-full bg-brand/20 px-1.5 font-mono text-[10px]"
                      : "rounded-full bg-border/60 px-1.5 font-mono text-[10px]"
                  }
                >
                  {counts[o.value] ?? 0}
                </span>
              </button>
            );
          })}
        </div>
      )}

      <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground" role="status">
        {filtered.length} {filtered.length === 1 ? "result" : "results"}
      </p>

      {pageItems.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No matching entries"
          description="Try a different search term or clear your filters."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pageItems.map((item) => (
            <EntityCard
              key={item.slug}
              name={item.name}
              description={item.description}
              href={item.href}
              meta={item.meta}
              tag={item.tag}
              portrait={portrait}
              verificationStatus={item.verificationStatus}
            />
          ))}
        </div>
      )}

      {pageCount > 1 && (
        <nav
          aria-label="Pagination"
          className="flex items-center justify-center gap-2"
        >
          <Button
            variant="outline"
            size="sm"
            disabled={safePage <= 1}
            onClick={() => setPage(safePage - 1)}
            aria-label="Previous page"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {safePage} of {pageCount}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={safePage >= pageCount}
            onClick={() => setPage(safePage + 1)}
            aria-label="Next page"
          >
            <ChevronRight className="size-4" />
          </Button>
        </nav>
      )}
    </div>
  );
}
