import Link from "next/link";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Overview", href: "/walkthrough" },
  { label: "Main Missions", href: "/walkthrough/main-missions" },
  { label: "Side Missions", href: "/walkthrough/side-missions" },
];

export function WalkthroughNav({ active }: { active: string }) {
  return (
    <nav aria-label="Walkthrough sections" className="mb-8 flex flex-wrap gap-2">
      {tabs.map((t) => (
        <Link
          key={t.href}
          href={t.href}
          aria-current={t.href === active ? "page" : undefined}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
            t.href === active
              ? "border-brand bg-brand/10 text-brand"
              : "border-border text-muted-foreground hover:border-brand/40 hover:text-foreground",
          )}
        >
          {t.label}
        </Link>
      ))}
    </nav>
  );
}
