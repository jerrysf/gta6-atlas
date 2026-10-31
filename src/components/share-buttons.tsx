"use client";

import { useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const x = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const reddit = `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        <Share2 className="size-3.5" /> Share
      </span>
      <Button asChild variant="outline" size="sm">
        <a href={x} target="_blank" rel="noopener noreferrer">
          Post on X
        </a>
      </Button>
      <Button asChild variant="outline" size="sm">
        <a href={reddit} target="_blank" rel="noopener noreferrer">
          Share on Reddit
        </a>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          });
        }}
      >
        {copied ? (
          <>
            <Check className="size-3.5" /> Copied
          </>
        ) : (
          <>
            <Link2 className="size-3.5" /> Copy link
          </>
        )}
      </Button>
    </div>
  );
}
