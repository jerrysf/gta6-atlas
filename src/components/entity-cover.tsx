import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Stylized placeholder cover for database entities. We intentionally avoid
 * scraped or AI-generated game art; licensed artwork can replace this
 * component per-entity via the `image` field later.
 */
export function EntityCover({
  name,
  className,
  icon,
}: {
  name: string;
  className?: string;
  icon?: React.ReactNode;
}) {
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <div
      aria-hidden
      className={cn(
        "relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden bg-surface-2",
        className,
      )}
    >
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #b6f34a 0 1px, transparent 1px 14px)",
        }}
      />
      {icon ?? (
        <span className="relative font-display text-5xl tracking-wide text-muted-foreground/40">
          {initials || <MapPin className="size-8" />}
        </span>
      )}
    </div>
  );
}
