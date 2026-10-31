import Link from "next/link";
import {
  AtSign,
  Map,
  MessageCircle,
  MessagesSquare,
  Video,
} from "lucide-react";
import { siteConfig } from "@/lib/site";
import { NewsletterForm } from "@/components/newsletter-form";

const SOCIAL_ICONS = {
  x: AtSign,
  youtube: Video,
  discord: MessageCircle,
  reddit: MessagesSquare,
} as const;

const resourceLinks = [
  { label: "Interactive Map", href: "/map" },
  { label: "Walkthroughs", href: "/walkthrough" },
  { label: "Completion Tracker", href: "/completion" },
  { label: "Official Videos", href: "/watch" },
  { label: "Launch Timeline", href: "/timeline" },
  { label: "Guides", href: "/guides" },
  { label: "Changelog", href: "/changelog" },
  { label: "Search", href: "/search" },
];

const databaseLinks = [
  { label: "Vehicles", href: "/vehicles" },
  { label: "Weapons", href: "/weapons" },
  { label: "Characters", href: "/characters" },
  { label: "Locations", href: "/locations" },
  { label: "Collectibles", href: "/collectibles" },
  { label: "Secrets", href: "/secrets" },
  { label: "Music & Soundtrack", href: "/music" },
  { label: "Wildlife", href: "/wildlife" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2 font-display text-lg tracking-wide">
              <span className="flex size-7 items-center justify-center rounded-md bg-brand text-background">
                <Map className="size-4" strokeWidth={2.5} />
              </span>
              GTA6 <span className="text-brand">ATLAS</span>
            </Link>
            <p className="text-sm text-muted-foreground">{siteConfig.tagline}</p>
            <NewsletterForm />
            <div className="flex gap-2 pt-1">
              {siteConfig.socials.map((s) => {
                const Icon = SOCIAL_ICONS[s.key as keyof typeof SOCIAL_ICONS];
                return (
                  <a
                    key={s.key}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-8 items-center justify-center rounded-md border border-border bg-surface-2/50 text-muted-foreground transition-colors hover:border-brand/50 hover:text-brand"
                    aria-label={`${siteConfig.name} on ${s.label}`}
                    title={s.label}
                  >
                    {Icon ? (
                      <Icon className="size-4" />
                    ) : (
                      <span className="text-xs font-medium">{s.label}</span>
                    )}
                  </a>
                );
              })}
            </div>
          </div>

          <nav aria-label="Resources" className="space-y-2">
            <h3 className="text-sm font-semibold">Resources</h3>
            <ul className="space-y-2">
              {resourceLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Database" className="space-y-2">
            <h3 className="text-sm font-semibold">Database</h3>
            <ul className="space-y-2">
              {databaseLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal" className="space-y-2">
            <h3 className="text-sm font-semibold">Legal</h3>
            <ul className="space-y-2">
              {siteConfig.footerNav.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 space-y-3 border-t border-border pt-6">
          <p className="text-xs leading-relaxed text-muted-foreground">
            {siteConfig.disclaimer}
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
