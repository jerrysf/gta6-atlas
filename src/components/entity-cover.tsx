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
  imageClassName,
  icon,
  image,
  priority,
}: {
  name: string;
  className?: string;
  imageClassName?: string;
  icon?: React.ReactNode;
  image?: EntityImage;
  priority?: boolean;
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
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className={cn("object-cover", imageClassName)}
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
      <div className="relative flex flex-col items-center gap-2.5">
        {icon ?? (
          <span className="font-display text-5xl tracking-wide text-muted-foreground/40">
            {initials || <MapPin className="size-8" />}
          </span>
        )}
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50">
          Image pending
        </span>
      </div>
    </div>
  );
}
