import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { VerificationBadge } from "@/components/verification-badge";
import { entityImages } from "@/data/entity-images";
import { cn } from "@/lib/utils";
import type { VerificationStatus } from "@/lib/types";

export function EntityCard({
  name,
  description,
  href,
  meta,
  tag,
  portrait,
  verificationStatus,
}: {
  name: string;
  description: string;
  href: string;
  meta?: string;
  tag?: string;
  portrait?: boolean;
  verificationStatus?: VerificationStatus;
}) {
  const slug = href.split("/").pop();
  const image = slug ? entityImages[slug] : undefined;
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <Link href={href} className="group block">
      <Card className="lift h-full overflow-hidden pt-0 transition-colors group-hover:border-brand/50">
        <div
          className={cn(
            "relative overflow-hidden bg-surface-2",
            portrait ? "aspect-[4/3]" : "aspect-[16/9]",
          )}
        >
          {image ? (
            <Image
              src={image.url}
              alt={name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className={cn(
                "object-cover transition-transform duration-500 group-hover:scale-105",
                portrait && "object-top",
              )}
            />
          ) : (
            <div className="flex size-full items-center justify-center">
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, #b6f34a 0 1px, transparent 1px 14px)",
                }}
              />
              <span className="relative font-display text-5xl tracking-wide text-muted-foreground/40">
                {initials}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
          {tag && (
            <span className="absolute right-2 top-2 rounded-sm bg-background/80 px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-brand-cyan backdrop-blur">
              {tag}
            </span>
          )}
          <div className="absolute inset-x-0 bottom-0 p-3">
            <h3 className="font-display text-lg leading-tight text-white transition-colors group-hover:text-brand">
              {name}
            </h3>
            {meta && (
              <p className="mt-0.5 truncate text-[11px] font-medium text-white/70">
                {meta}
              </p>
            )}
          </div>
        </div>
        <div className="flex h-full flex-col gap-2.5 p-3">
          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {description}
          </p>
          {verificationStatus && (
            <div className="mt-auto pt-1">
              <VerificationBadge status={verificationStatus} />
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}
