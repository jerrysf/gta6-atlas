import { Info } from "lucide-react";

/**
 * Honest "awaiting verification" notice shown on sections whose data cannot
 * exist until GTA VI releases (Nov 19, 2026) and gameplay is verified.
 */
export function PendingBanner({
  title = "Awaiting gameplay verification",
  children,
}: {
  title?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex items-start gap-3 rounded-lg border border-brand-cyan/30 bg-brand-cyan/5 p-4">
      <Info className="mt-0.5 size-5 shrink-0 text-brand-cyan" />
      <div className="text-sm">
        <p className="font-semibold text-foreground">{title}</p>
        <div className="mt-1 text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}
