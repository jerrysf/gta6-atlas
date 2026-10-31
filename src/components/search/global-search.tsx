"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { SearchDoc } from "@/lib/search";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

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

function filterDocs(docs: SearchDoc[], query: string): SearchDoc[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return docs
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
    .sort((a, b) => b.score - a.score)
    .slice(0, 15)
    .map((r) => r.d);
}

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [docs, setDocs] = useState<SearchDoc[] | null>(null);
  const [active, setActive] = useState(0);
  const router = useRouter();
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open && docs === null) {
      fetch("/api/search")
        .then((r) => r.json())
        .then((data: SearchDoc[]) => setDocs(data))
        .catch(() => setDocs([]));
    }
  }, [open, docs]);

  const results = useMemo(
    () => (docs ? filterDocs(docs, query) : []),
    [docs, query],
  );

  const go = useCallback(
    (doc: SearchDoc) => {
      trackEvent("search", { search_term: query });
      setOpen(false);
      setQuery("");
      router.push(doc.href);
    },
    [router, query],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active]);
    }
  };

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Search (Ctrl+K)"
        onClick={() => setOpen(true)}
      >
        <Search className="size-5" />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="top-[15%] max-w-xl translate-y-0 gap-0 overflow-hidden p-0 sm:top-[20%]">
          <DialogTitle className="sr-only">Search GTA6 Atlas</DialogTitle>
          <DialogDescription className="sr-only">
            Search guides, database entries, and pages.
          </DialogDescription>
          <div className="flex items-center gap-2 border-b border-border px-4">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <Input
              autoFocus
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={onKeyDown}
              placeholder="Search guides, characters, locations..."
              aria-label="Search"
              className="h-12 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
            />
            <kbd className="hidden shrink-0 rounded border border-border bg-surface-2 px-1.5 py-0.5 text-[10px] text-muted-foreground sm:block">
              ESC
            </kbd>
          </div>
          <ul
            ref={listRef}
            role="listbox"
            aria-label="Search results"
            className="max-h-80 overflow-y-auto p-2"
          >
            {docs === null && query && (
              <li className="flex items-center gap-2 p-4 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" /> Loading index...
              </li>
            )}
            {docs !== null && query && results.length === 0 && (
              <li className="p-4 text-sm text-muted-foreground">
                No results for “{query}”.
              </li>
            )}
            {!query && (
              <li className="p-4 text-sm text-muted-foreground">
                Type to search across guides, database entries and pages. Use{" "}
                <kbd className="rounded border border-border bg-surface-2 px-1 text-[10px]">
                  Ctrl/⌘ K
                </kbd>{" "}
                anywhere to open search.
              </li>
            )}
            {results.map((doc, i) => (
              <li key={doc.id} role="option" aria-selected={i === active} data-index={i}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(doc)}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-md px-3 py-2.5 text-left",
                    i === active ? "bg-surface-2" : "",
                  )}
                >
                  <FileText className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium">
                      {doc.title}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {doc.description}
                    </span>
                  </span>
                  <span className="ml-auto shrink-0 rounded border border-border px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                    {TYPE_LABELS[doc.type]}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </>
  );
}
