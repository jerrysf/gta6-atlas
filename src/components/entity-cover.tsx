import Image from "next/image";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import type { EntityImage } from "@/data/entity-images";

/**
 * Cover for database entities: renders the hotlinked wiki image when one is
 * mapped, otherwise the stylized placeholder. Images stay on Fandom's CDN —
 * nothing is redistributed from this repo.
 */
export function EntityCover({
  name,
  className,
  icon,
  image,
}: {
  name: string;
  className?: string;
  icon?: React.ReactNode;
  image?: EntityImage;
}) {
  if (image) {
    return (
      <div
        className={cn(
          "relative aspect-[16/9] w-full overflow-hidden bg-surface-2",
          className,
        )}
      >
        <Image
          src={image.url}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
    );
  }

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
