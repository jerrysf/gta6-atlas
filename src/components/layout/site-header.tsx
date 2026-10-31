import Link from "next/link";
import { Map } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { MobileNav } from "@/components/layout/mobile-nav";
import { NavLinks } from "@/components/layout/nav-links";
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

        <NavLinks items={siteConfig.nav.slice(1)} />

        <div className="ml-auto flex items-center gap-2">
          <GlobalSearch />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
