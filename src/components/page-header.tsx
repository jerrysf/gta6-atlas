import { PageBreadcrumbs } from "@/components/breadcrumbs";

export function PageHeader({
  title,
  description,
  breadcrumbs,
  children,
}: {
  title: string;
  description?: string;
  breadcrumbs?: { name: string; href: string }[];
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-8 space-y-4">
      {breadcrumbs && <PageBreadcrumbs items={breadcrumbs} />}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
            {title}
          </h1>
          {description && (
            <p className="mt-2 text-muted-foreground">{description}</p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
