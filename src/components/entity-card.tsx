import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EntityCover } from "@/components/entity-cover";
import { VerificationBadge } from "@/components/verification-badge";
import type { VerificationStatus } from "@/lib/types";

export function EntityCard({
  name,
  description,
  href,
  meta,
  verificationStatus,
}: {
  name: string;
  description: string;
  href: string;
  meta?: string;
  verificationStatus?: VerificationStatus;
}) {
  return (
    <Link href={href} className="group block">
      <Card className="lift h-full overflow-hidden group-hover:border-brand/40">
        <EntityCover name={name} />
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base group-hover:text-brand">
              {name}
            </CardTitle>
            {verificationStatus && (
              <VerificationBadge status={verificationStatus} />
            )}
          </div>
          {meta && <p className="text-xs text-muted-foreground">{meta}</p>}
        </CardHeader>
        <CardContent>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
