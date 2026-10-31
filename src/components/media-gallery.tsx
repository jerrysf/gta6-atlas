"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import type { MediaItem, MediaSubject } from "@/data/media";
import { mediaSubjects } from "@/data/media";
import { cn } from "@/lib/utils";

export function MediaGallery({ items }: { items: MediaItem[] }) {
  const [subject, setSubject] = useState<MediaSubject | "all">("all");
  const [auth, setAuth] = useState<"all" | "official" | "reference">("all");
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const counts = useMemo(() => {
    const map = new Map<MediaSubject, number>();
    for (const i of items) map.set(i.subject, (map.get(i.subject) ?? 0) + 1);
    return map;
  }, [items]);

  const filtered = items.filter(
    (i) =>
      (subject === "all" || i.subject === subject) &&
      (auth === "all" || i.authenticity === auth),
  );

  const active = activeIdx === null ? null : filtered[activeIdx] ?? null;

  const applySubject = (s: MediaSubject | "all") => {
    setSubject(s);
    setActiveIdx(null);
  };
  const applyAuth = (a: "all" | "official" | "reference") => {
    setAuth(a);
    setActiveIdx(null);
  };

  const step = useCallback(
    (dir: 1 | -1) =>
      setActiveIdx((i) =>
        i === null || filtered.length === 0
          ? i
          : (i + dir + filtered.length) % filtered.length,
      ),
    [filtered.length],
  );

  const open = activeIdx !== null;
  useEffect(() => {
    if (!open) return;
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIdx(null);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, step]);

  const pill = (on: boolean) =>
    cn(
      "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
      on
        ? "border-brand bg-brand/10 font-medium text-brand"
        : "border-border bg-card text-muted-foreground hover:border-brand/40 hover:text-foreground",
    );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => applySubject("all")}
          className={pill(subject === "all")}
        >
          All <span className="ml-1 font-mono text-xs">{items.length}</span>
        </button>
        {mediaSubjects.map((s) => (
          <button
            key={s.slug}
            type="button"
            onClick={() => applySubject(s.slug)}
            className={pill(subject === s.slug)}
          >
            {s.label}{" "}
            <span className="ml-1 font-mono text-xs">{counts.get(s.slug)}</span>
          </button>
        ))}
        <span className="mx-1 hidden h-5 w-px bg-border sm:block" />
        <button
          type="button"
          onClick={() => applyAuth("all")}
          className={pill(auth === "all")}
        >
          Any source
        </button>
        <button
          type="button"
          onClick={() => applyAuth("official")}
          className={pill(auth === "official")}
        >
          GTA VI media
        </button>
        <button
          type="button"
          onClick={() => applyAuth("reference")}
          className={pill(auth === "reference")}
        >
          Reference renders
        </button>
      </div>

      <p className="mt-5 font-mono text-xs uppercase tracking-wider text-muted-foreground">
        {filtered.length} image{filtered.length === 1 ? "" : "s"}
      </p>

      <div className="stagger mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveIdx(idx)}
            className="group relative aspect-video overflow-hidden rounded-lg border border-border bg-card text-left transition-colors hover:border-brand-cyan/50"
            aria-label={`View ${item.title}`}
          >
            <Image
              src={item.url}
              alt={item.caption}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-2.5 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="truncate text-xs font-semibold text-white">
                {item.title}
              </span>
              <Expand className="size-3.5 shrink-0 text-white" />
            </div>
            {item.authenticity === "reference" && (
              <span className="absolute left-2 top-2 rounded-sm bg-black/70 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-amber-300">
                GTA V ref
              </span>
            )}
          </button>
        ))}
      </div>

      {active && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          tabIndex={-1}
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/90 p-4 outline-none backdrop-blur-sm"
          onClick={() => setActiveIdx(null)}
        >
          {filtered.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/90 text-muted-foreground transition-colors hover:border-brand hover:text-brand sm:left-6"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label="Next image"
                className="absolute right-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/90 text-muted-foreground transition-colors hover:border-brand hover:text-brand sm:right-6"
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          )}
          <figure
            className="w-full max-w-5xl overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
              <p className="truncate font-display text-lg tracking-wide">
                {active.title}
              </p>
              <span className="shrink-0 font-mono text-xs text-muted-foreground">
                {(activeIdx ?? 0) + 1} / {filtered.length}
              </span>
              <button
                type="button"
                onClick={() => setActiveIdx(null)}
                aria-label="Close viewer"
                className="flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="relative aspect-video w-full bg-black">
              <Image
                src={active.url}
                alt={active.caption}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-contain"
                priority
              />
            </div>
            <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3">
              <p className="min-w-0 text-xs leading-relaxed text-muted-foreground">
                {active.caption} · Image: GTA Wiki
              </p>
              <Link
                href={active.href}
                className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-brand-cyan hover:underline"
              >
                View entry <ArrowRight className="size-3" />
              </Link>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
