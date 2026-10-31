import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function PrevNext({
  prev,
  next,
  label,
}: {
  prev?: { name: string; href: string };
  next?: { name: string; href: string };
  label?: string;
}) {
  if (!prev && !next) return null;
  return (
    <nav
      aria-label={label ?? "Previous and next entries"}
      className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-3 border-t border-border/60 pt-6 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          href={prev.href}
          className="group flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 transition-colors hover:border-brand/40"
        >
          <ArrowLeft className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-x-0.5 group-hover:text-brand" />
          <span className="min-w-0">
            <span className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Previous
            </span>
            <span className="block truncate text-sm font-semibold group-hover:text-brand">
              {prev.name}
            </span>
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group flex items-center justify-end gap-3 rounded-lg border border-border bg-card px-4 py-3 text-right transition-colors hover:border-brand/40 sm:col-start-2"
        >
          <span className="min-w-0">
            <span className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Next
            </span>
            <span className="block truncate text-sm font-semibold group-hover:text-brand">
              {next.name}
            </span>
          </span>
          <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-brand" />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
