import { entityImages } from "./entity-images";
import { characters } from "./characters";
import { locations } from "./locations";
import { vehicles } from "./vehicles";
import { weapons } from "./weapons";
import { secrets } from "./collectibles";

export type MediaSubject =
  | "character"
  | "location"
  | "vehicle"
  | "weapon"
  | "secret";

export interface MediaItem {
  id: string;
  title: string;
  url: string;
  caption: string;
  subject: MediaSubject;
  /** "official" = actual GTA VI media; "reference" = GTA V-era render. */
  authenticity: "official" | "reference";
  /** Link to the entity this image documents. */
  href: string;
}

function fromEntities(
  entities: { slug: string; name: string }[],
  subject: MediaSubject,
  hrefFor: (slug: string) => string,
): MediaItem[] {
  return entities
    .filter((e) => entityImages[e.slug])
    .map((e) => {
      const img = entityImages[e.slug];
      return {
        id: `${subject}-${e.slug}`,
        title: e.name,
        url: img.url,
        caption: img.caption,
        subject,
        authenticity: img.caption.startsWith("Official GTA VI media")
          ? ("official" as const)
          : ("reference" as const),
        href: hrefFor(e.slug),
      };
    });
}

/** All curated imagery on the site, aggregated for the media gallery. */
export const mediaItems: MediaItem[] = [
  ...fromEntities(characters, "character", (s) => `/characters/${s}`),
  ...fromEntities(locations, "location", (s) => `/locations/${s}`),
  ...fromEntities(vehicles, "vehicle", (s) => `/vehicles/${s}`),
  ...fromEntities(weapons, "weapon", (s) => `/weapons/${s}`),
  ...fromEntities(secrets, "secret", (s) => `/collectibles/${s}`),
];

export const mediaSubjects: { slug: MediaSubject; label: string }[] = [
  { slug: "character", label: "Characters" },
  { slug: "location", label: "Locations" },
  { slug: "vehicle", label: "Vehicles" },
  { slug: "weapon", label: "Weapons" },
  { slug: "secret", label: "Secrets" },
];
