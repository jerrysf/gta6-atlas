"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CheckSquare, Map, Menu } from "lucide-react";
import { siteConfig } from "@/lib/site";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const extraLinks = [
  { label: "Locations", href: "/locations" },
  { label: "Secrets", href: "/secrets" },
  { label: "Completion Tracker", href: "/completion", icon: CheckSquare },
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
          className="lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-80 bg-card"
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
        <nav aria-label="Mobile" className="mt-6 flex flex-col gap-1">
          {[...siteConfig.nav, ...extraLinks].map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-surface-2 text-brand"
                    : "text-foreground/80 hover:bg-surface-2 hover:text-foreground"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
