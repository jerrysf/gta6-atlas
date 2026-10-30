import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionHeader({
  title,
  description,
  href,
  linkLabel = "View all",
}: {
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="hidden shrink-0 items-center gap-1 text-sm font-medium text-brand-cyan hover:underline sm:inline-flex"
        >
          {linkLabel}
          <ArrowRight className="size-4" />
        </Link>
      )}
    </div>
  );
}
