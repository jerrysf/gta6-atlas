import Link from "next/link";
import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import JsonLd from "@/components/json-ld";
import { breadcrumbJsonLd } from "@/lib/seo";

export function PageBreadcrumbs({
  items,
  className,
}: {
  items: { name: string; href: string }[];
  className?: string;
}) {
  const crumbs = [{ name: "Home", href: "/" }, ...items];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Breadcrumb className={className}>
        <BreadcrumbList>
          {crumbs.map((item, i) => {
            const last = i === crumbs.length - 1;
            return (
              <Fragment key={item.href}>
                <BreadcrumbItem>
                  {last ? (
                    <BreadcrumbPage>{item.name}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={item.href}>{item.name}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!last && <BreadcrumbSeparator />}
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
}
