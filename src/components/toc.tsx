"use client";

import { useEffect, useState } from "react";
import { ListTree } from "lucide-react";
import { cn } from "@/lib/utils";

export function TableOfContents({
  headings,
  className,
}: {
  headings: { depth: number; text: string; id: string }[];
  className?: string;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;
  return (
    <nav
      aria-label="Table of contents"
      className={cn("rounded-lg border border-border bg-card p-4", className)}
    >
      <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
        <ListTree className="size-4 text-brand" /> On this page
      </p>
      <ul className="space-y-1.5">
        {headings.map((h) => {
          const isActive = h.id === activeId;
          return (
            <li
              key={h.id}
              className={cn(
                "border-l-2 transition-colors",
                isActive ? "border-brand" : "border-transparent",
              )}
              style={{ paddingLeft: h.depth === 3 ? "1rem" : 0 }}
            >
              <a
                href={`#${h.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "block py-0.5 pl-2 text-sm transition-colors",
                  isActive
                    ? "font-medium text-brand"
                    : "text-muted-foreground hover:text-brand",
                )}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
