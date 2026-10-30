import { ListTree } from "lucide-react";
import { cn } from "@/lib/utils";

export function TableOfContents({
  headings,
  className,
}: {
  headings: { depth: number; text: string; id: string }[];
  className?: string;
}) {
  if (headings.length === 0) return null;
  return (
    <nav
      aria-label="Table of contents"
      className={cn(
        "rounded-lg border border-border bg-card p-4",
        className,
      )}
    >
      <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
        <ListTree className="size-4 text-brand" /> On this page
      </p>
      <ul className="space-y-1.5">
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: h.depth === 3 ? "1rem" : 0 }}>
            <a
              href={`#${h.id}`}
              className="text-sm text-muted-foreground transition-colors hover:text-brand"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
