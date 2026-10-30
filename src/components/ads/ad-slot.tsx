import { cn } from "@/lib/utils";
import { ADSENSE_ID } from "@/lib/ads-config";

export type AdPlacement = "header" | "sidebar" | "in-article" | "footer";

/**
 * Ad placement shell. Ads are DISABLED by default: nothing renders until an
 * ad provider ID is configured via environment variables. Slots never wrap
 * navigation or interactive tools.
 */
export function AdSlot({
  placement,
  className,
}: {
  placement: AdPlacement;
  className?: string;
}) {
  if (!ADSENSE_ID) return null;

  const sizes: Record<AdPlacement, string> = {
    header: "min-h-24",
    sidebar: "min-h-64",
    "in-article": "min-h-28",
    footer: "min-h-24",
  };

  return (
    <div
      data-ad-placement={placement}
      aria-label="Advertisement"
      className={cn(
        "flex w-full items-center justify-center rounded-lg border border-dashed border-border bg-card/50 text-xs text-muted-foreground",
        sizes[placement],
        className,
      )}
    >
      <ins
        className="adsbygoogle block"
        data-ad-client={ADSENSE_ID}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
