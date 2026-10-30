import Link from "next/link";
import { Map } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { MobileNav } from "@/components/layout/mobile-nav";
import { GlobalSearch } from "@/components/search/global-search";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div
        aria-hidden
        className="h-0.5 w-full bg-gradient-to-r from-brand via-brand-cyan to-brand"
      />
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-2 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-black tracking-tight"
          aria-label={`${siteConfig.name} home`}
        >
          <span className="flex size-7 items-center justify-center rounded-md bg-brand text-background">
            <Map className="size-4" strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg tracking-wide sm:text-xl">
            GTA6 <span className="text-brand">ATLAS</span>
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="ml-6 hidden items-center gap-1 lg:flex"
        >
          {siteConfig.nav.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <GlobalSearch />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
