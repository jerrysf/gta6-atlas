"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ExternalLink, Play, ShieldAlert, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { OfficialVideo } from "@/data/videos";

/**
 * Official-video cards that open an in-site YouTube lightbox instead of
 * navigating away. Uses the privacy-enhanced youtube-nocookie embed host.
 */
export function VideoGrid({ videos }: { videos: OfficialVideo[] }) {
  const [active, setActive] = useState<OfficialVideo | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {videos.map((v, i) => (
          <button
            key={v.youtubeId}
            type="button"
            onClick={() => setActive(v)}
            className="group block text-left"
            aria-label={`Play ${v.title}`}
          >
            <Card className="lift h-full overflow-hidden pt-0 transition-colors group-hover:border-brand-cyan/40">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={`https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`}
                  alt={v.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />
                <span className="absolute inset-0 m-auto flex size-12 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white backdrop-blur-sm transition-colors group-hover:bg-brand group-hover:text-black">
                  <Play className="ml-0.5 size-5 fill-current" />
                </span>
                <span className="absolute bottom-2 right-2 rounded-sm bg-black/70 px-1.5 py-0.5 font-mono text-[10px] text-white">
                  {v.duration}
                </span>
                {i === 0 && (
                  <span className="absolute left-2 top-2 rounded-sm bg-brand px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-black">
                    New
                  </span>
                )}
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="line-clamp-1 text-sm group-hover:text-brand-cyan">
                  {v.title}
                </CardTitle>
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Rockstar Games · {v.publishedAt}
                </p>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-2 text-xs text-muted-foreground">
                  {v.note}
                </p>
              </CardContent>
            </Card>
          </button>
        ))}
      </div>

      {/* In-site player lightbox */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div
            className="w-full max-w-4xl overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
              <p className="truncate font-display text-lg tracking-wide">
                {active.title}
              </p>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close player"
                className="flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              {active.ageRestricted ? (
                <div className="relative flex size-full flex-col items-center justify-center gap-4 overflow-hidden px-6 text-center">
                  <Image
                    src={`https://i.ytimg.com/vi/${active.youtubeId}/hqdefault.jpg`}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 896px"
                    className="-z-10 object-cover opacity-20 blur-sm"
                  />
                  <ShieldAlert className="size-10 text-brand" />
                  <div>
                    <p className="font-semibold text-foreground">
                      Age-restricted on YouTube
                    </p>
                    <p className="mt-1 max-w-md text-sm text-muted-foreground">
                      Rockstar set an age gate on this video, so YouTube only
                      allows it to play on youtube.com — it can&apos;t be
                      embedded on other sites.
                    </p>
                  </div>
                  <a
                    href={`https://www.youtube.com/watch?v=${active.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-black transition-transform hover:scale-[1.02]"
                  >
                    Watch on YouTube <ExternalLink className="size-4" />
                  </a>
                </div>
              ) : (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${active.youtubeId}?autoplay=1&rel=0`}
                  title={active.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="size-full"
                />
              )}
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-2.5">
              <p className="min-w-0 truncate text-xs text-muted-foreground">
                {active.note} · Official upload by Rockstar Games
              </p>
              <a
                href={`https://www.youtube.com/watch?v=${active.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-brand-cyan hover:underline"
              >
                YouTube <ExternalLink className="size-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
