import type { LucideIcon } from "lucide-react";
import { Database } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function EmptyState({
  icon: Icon = Database,
  title,
  description,
  children,
}: {
  icon?: LucideIcon;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-surface-2">
          <Icon className="size-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="max-w-md text-sm text-muted-foreground">{description}</p>
        {children}
      </CardContent>
    </Card>
  );
}
