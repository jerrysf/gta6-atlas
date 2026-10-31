export { cn } from "cn";

/** Prev/next neighbors of an item inside an ordered list of entities. */
export function prevNextOf<T extends { slug: string; name: string }>(
  list: T[],
  slug: string,
  hrefFor: (s: string) => string,
) {
  const i = list.findIndex((x) => x.slug === slug);
  if (i < 0) return undefined;
  const prev = list[i - 1];
  const next = list[i + 1];
  return {
    prev: prev ? { name: prev.name, href: hrefFor(prev.slug) } : undefined,
    next: next ? { name: next.name, href: hrefFor(next.slug) } : undefined,
  };
}
