import { ExternalLink, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Pre-order call-to-action. When NEXT_PUBLIC_PREORDER_URL is configured the
 * button uses it (and the block is labeled as an affiliate link); otherwise it
 * falls back to Rockstar's official GTA VI page so the CTA always works.
 */
export function PreorderCta({ className }: { className?: string }) {
  const affiliateUrl = process.env.NEXT_PUBLIC_PREORDER_URL;
  const href = affiliateUrl ?? "https://www.rockstargames.com/VI";
  return (
    <div
      className={cn(
        "clip-notch relative overflow-hidden rounded-xl border border-brand/30 bg-card p-5",
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(400px 120px at 90% 0%, rgba(182,243,74,0.10), transparent 60%)",
        }}
      />
      <div className="relative flex flex-wrap items-center gap-4">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-brand/15 text-brand">
          <ShoppingCart className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg uppercase tracking-wide">
            Pre-order GTA VI
          </p>
          <p className="text-xs text-muted-foreground">
            November 19, 2026 · PS5 & Xbox Series X|S
          </p>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md bg-brand px-4 py-2 text-sm font-bold text-black transition-transform hover:scale-[1.03]"
        >
          Pre-order <ExternalLink className="size-3.5" />
        </a>
      </div>
      {affiliateUrl && (
        <p className="relative mt-2 text-[10px] text-muted-foreground">
          Affiliate link — we may earn a commission at no extra cost to you.
        </p>
      )}
    </div>
  );
}
