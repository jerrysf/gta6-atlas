import Link from "next/link";
import { ArrowUpRight, Clock, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VerificationBadge } from "@/components/verification-badge";
import type { Guide } from "@/lib/types";
import { cn } from "@/lib/utils";

const CATEGORY_LABELS: Record<Guide["category"], string> = {
  beginner: "Beginner",
  money: "Money Making",
  combat: "Combat",
  "wanted-level": "Wanted Level",
  exploration: "Exploration",
  "gameplay-mechanics": "Gameplay Mechanics",
  advanced: "Advanced",
  news: "News",
};

const CATEGORY_ACCENT: Record<Guide["category"], string> = {
  news: "border-l-brand",
  beginner: "border-l-brand-cyan",
  exploration: "border-l-emerald-400",
  "gameplay-mechanics": "border-l-violet-400",
  money: "border-l-amber-400",
  combat: "border-l-red-400",
  "wanted-level": "border-l-orange-400",
  advanced: "border-l-pink-400",
};

export function guideCategoryLabel(category: Guide["category"]) {
  return CATEGORY_LABELS[category];
}

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Link href={`/guides/${guide.slug}`} className="group block h-full">
      <Card
        className={cn(
          "lift relative h-full border-l-2 group-hover:border-brand/40",
          CATEGORY_ACCENT[guide.category],
        )}
      >
        <ArrowUpRight className="absolute right-4 top-4 size-4 text-muted-foreground/40 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2 pr-6">
            <Badge variant="secondary" className="text-[11px]">
              {CATEGORY_LABELS[guide.category]}
            </Badge>
            <VerificationBadge status={guide.verificationStatus} />
          </div>
          <CardTitle className="mt-2 font-display text-xl leading-snug tracking-wide group-hover:text-brand">
            {guide.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {guide.metaDescription}
          </p>
          <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <User className="size-3" /> {guide.author}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3" />
              <time dateTime={guide.updatedAt}>
                {new Date(guide.updatedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
