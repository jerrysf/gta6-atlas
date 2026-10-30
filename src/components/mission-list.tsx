import Link from "next/link";
import { Clock, ListTodo } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VerificationBadge } from "@/components/verification-badge";
import type { Mission } from "@/lib/types";

const difficultyLabel: Record<NonNullable<Mission["difficulty"]>, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
  unknown: "Unknown",
};

export function MissionList({ missions }: { missions: Mission[] }) {
  return (
    <ol className="space-y-3">
      {missions.map((m, i) => (
        <li key={m.slug}>
          <Link href={`/walkthrough/${m.slug}`} className="group block">
            <Card className="transition-colors group-hover:border-brand/40">
              <CardContent className="flex items-start gap-4 py-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-sm font-bold text-brand">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold group-hover:text-brand">
                      {m.name}
                    </h3>
                    <VerificationBadge status={m.verificationStatus} />
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {m.summary}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    {m.difficulty && (
                      <Badge variant="secondary" className="text-[11px]">
                        {difficultyLabel[m.difficulty]}
                      </Badge>
                    )}
                    {m.estimatedTime && (
                      <span className="inline-flex items-center gap-1">
                        <Clock className="size-3" /> {m.estimatedTime}
                      </span>
                    )}
                    {m.objectives && (
                      <span className="inline-flex items-center gap-1">
                        <ListTodo className="size-3" />{" "}
                        {m.objectives.length} objectives
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </li>
      ))}
    </ol>
  );
}
