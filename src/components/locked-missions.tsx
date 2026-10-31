import {
  CheckCircle2,
  ListChecks,
  Lock,
  MapPin,
  Trophy,
} from "lucide-react";

const PLACEHOLDER_COUNT = 6;

const COVERAGE = [
  { icon: ListChecks, label: "Objectives checklist" },
  { icon: CheckCircle2, label: "Step-by-step walkthrough" },
  { icon: Trophy, label: "Rewards & unlocks" },
  { icon: MapPin, label: "Start location on the map" },
];

export function LockedMissions() {
  return (
    <div className="space-y-8">
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: PLACEHOLDER_COUNT }, (_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-lg border border-dashed border-border/70 bg-card/40 px-4 py-3.5"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border/70 bg-surface-2/60 text-muted-foreground/60">
              <Lock className="size-3.5" />
            </span>
            <span className="min-w-0">
              <span className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">
                Mission {String(i + 1).padStart(2, "0")}
              </span>
              <span className="block text-sm font-medium text-muted-foreground/70">
                Unlocks at launch
              </span>
            </span>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-border bg-card p-5">
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          What every walkthrough will include
        </p>
        <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
          {COVERAGE.map((c) => (
            <li
              key={c.label}
              className="flex items-center gap-2.5 text-sm text-foreground/85"
            >
              <c.icon className="size-4 shrink-0 text-brand-cyan" />
              {c.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
