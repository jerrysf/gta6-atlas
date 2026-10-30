import { Badge } from "@/components/ui/badge";
import { VERIFICATION_META } from "@/lib/verification";
import type { VerificationStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

export function VerificationBadge({
  status,
  className,
}: {
  status: VerificationStatus;
  className?: string;
}) {
  const meta = VERIFICATION_META[status];
  return (
    <Badge
      variant="outline"
      title={meta.description}
      className={cn("text-[11px] font-medium tracking-wide", meta.className, className)}
    >
      {meta.label}
    </Badge>
  );
}
