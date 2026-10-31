export function StatStrip({
  stats,
}: {
  stats: { label: string; value: number | string }[];
}) {
  return (
    <div className="mb-6 flex flex-wrap gap-x-6 gap-y-1.5 border-y border-border/60 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
      {stats.map((s) => (
        <span key={s.label}>
          <span className="mr-1.5 font-semibold text-brand">{s.value}</span>
          {s.label}
        </span>
      ))}
    </div>
  );
}
