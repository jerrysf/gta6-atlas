"use client";

import { useEffect, useState } from "react";

const TARGET = new Date("2026-11-19T00:00:00-05:00").getTime();

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, "0");
}

export function Countdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const diff = now === null ? null : TARGET - now;
  const total = Math.max(0, Math.floor((diff ?? 0) / 1000));
  const parts =
    diff === null
      ? null
      : diff <= 0
        ? null
        : [
            { v: Math.floor(total / 86400), l: "days" },
            { v: Math.floor((total % 86400) / 3600), l: "hrs" },
            { v: Math.floor((total % 3600) / 60), l: "min" },
            { v: total % 60, l: "sec" },
          ];

  return (
    <div className="inline-flex items-center gap-4 rounded-lg border border-brand-cyan/30 bg-background/60 px-4 py-2.5 backdrop-blur">
      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-cyan">
        Launch
      </span>
      {parts === null ? (
        <span className="font-display text-lg tracking-wider text-foreground">
          {diff !== null && diff <= 0 ? "OUT NOW" : "···"}
        </span>
      ) : (
        <span className="flex items-baseline gap-3">
          {parts.map((p) => (
            <span key={p.l} className="flex items-baseline gap-1">
              <span className="font-display text-2xl tabular-nums text-foreground">
                {pad(p.v)}
              </span>
              <span className="font-mono text-[10px] uppercase text-muted-foreground">
                {p.l}
              </span>
            </span>
          ))}
        </span>
      )}
    </div>
  );
}
