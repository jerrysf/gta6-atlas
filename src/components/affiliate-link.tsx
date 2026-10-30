import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Reusable affiliate link block. Only render this for real, configured
 * affiliate relationships — never invent URLs or tracking parameters.
 */
export function AffiliateLink({
  productName,
  productUrl,
  merchant,
  promoText,
}: {
  productName: string;
  productUrl: string;
  merchant: string;
  promoText?: string;
}) {
  return (
    <Card className="border-brand-cyan/20">
      <CardContent className="flex flex-wrap items-center gap-3 py-4">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Affiliate link
          </p>
          <p className="truncate text-sm font-semibold">{productName}</p>
          {promoText && (
            <p className="mt-0.5 text-xs text-muted-foreground">{promoText}</p>
          )}
        </div>
        <a
          href={productUrl}
          target="_blank"
          rel="sponsored nofollow noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md bg-brand px-3 py-2 text-sm font-semibold text-background transition-colors hover:bg-brand/85"
        >
          View at {merchant}
          <ExternalLink className="size-3.5" />
        </a>
        <p className="w-full text-[11px] text-muted-foreground">
          We may earn a commission if you buy through this link, at no extra
          cost to you. <Link href="/affiliate-disclosure" className="underline">Learn more</Link>.
        </p>
      </CardContent>
    </Card>
  );
}
