"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BookOpen,
  Car,
  CheckSquare,
  Clapperboard,
  Crosshair,
  Flag,
  Gamepad2,
  Gem,
  Home,
  Image,
  ListOrdered,
  Map,
  MapPin,
  Menu,
  Music,
  PawPrint,
  Scroll,
  Search,
  Sparkles,
  Timer,
  Users,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const groups: {
  label: string;
  items: { label: string; href: string; icon: typeof Map }[];
}[] = [
  {
    label: "Explore",
    items: [
      { label: "Home", href: "/", icon: Home },
      { label: "Interactive Map", href: "/map", icon: Map },
      { label: "FL Roam", href: "/explore", icon: Gamepad2 },
      { label: "Walkthroughs", href: "/walkthrough", icon: Scroll },
      { label: "Completion Tracker", href: "/completion", icon: CheckSquare },
      { label: "Launch Timeline", href: "/timeline", icon: Timer },
      { label: "By the Numbers", href: "/facts", icon: Flag },
    ],
  },
  {
    label: "Database",
    items: [
      { label: "Vehicles", href: "/vehicles", icon: Car },
      { label: "Weapons", href: "/weapons", icon: Crosshair },
      { label: "Characters", href: "/characters", icon: Users },
      { label: "Locations", href: "/locations", icon: MapPin },
      { label: "Collectibles", href: "/collectibles", icon: Gem },
      { label: "Secrets", href: "/secrets", icon: Gem },
      { label: "Music & Soundtrack", href: "/music", icon: Music },
      { label: "Wildlife", href: "/wildlife", icon: PawPrint },
    ],
  },
  {
    label: "Content",
    items: [
      { label: "Guides", href: "/guides", icon: BookOpen },
      { label: "Media Gallery", href: "/media", icon: Image },
      { label: "Official Videos", href: "/watch", icon: Clapperboard },
      { label: "Changelog", href: "/changelog", icon: ListOrdered },
      { label: "Trivia & Fun Facts", href: "/trivia", icon: Sparkles },
      { label: "Search", href: "/search", icon: Search },
    ],
  },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="xl:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-80 overflow-y-auto bg-card"
        aria-label="Site navigation"
      >
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-left">
            <span className="flex size-7 items-center justify-center rounded-md bg-brand text-background">
              <Map className="size-4" strokeWidth={2.5} />
            </span>
            GTA6 Atlas
          </SheetTitle>
        </SheetHeader>
        <nav aria-label="Mobile" className="mt-5 space-y-5 pb-8">
          {groups.map((group) => (
            <div key={group.label}>
              <p className="mb-1.5 px-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
                {group.label}
              </p>
              <div className="flex flex-col gap-0.5">
                {group.items.map((item) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        active
                          ? "bg-surface-2 text-brand"
                          : "text-foreground/80 hover:bg-surface-2 hover:text-foreground",
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      <item.icon
                        className={cn(
                          "size-4 shrink-0",
                          active ? "text-brand" : "text-muted-foreground",
                        )}
                      />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
        <div className="border-t border-border px-3 pt-4 pb-2">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">
            GTA VI launches Nov 19, 2026 · Independent fan site
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
