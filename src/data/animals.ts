import type { SourceReference, VerificationStatus } from "@/lib/types";

export type AnimalClass = "mammal" | "reptile" | "bird" | "marine";

export interface Animal {
  id: string;
  slug: string;
  name: string;
  species: string;
  class: AnimalClass;
  habitat: string;
  /** Where in official footage it was spotted. */
  firstSeen: string;
  description: string;
  verificationStatus: VerificationStatus;
  sourceReferences: SourceReference[];
  lastVerifiedAt?: string;
}

const TRAILER_1: SourceReference = {
  label: "Rockstar Games — GTA VI Trailer 1",
  url: "https://www.youtube.com/watch?v=QdBZY2fkU-0",
};
const TRAILER_2: SourceReference = {
  label: "Rockstar Games — GTA VI Trailer 2",
  url: "https://www.youtube.com/watch?v=VQRLujxTm3c",
};
const EXTENDED_LOOK: SourceReference = {
  label: "Rockstar Games — An Extended Look",
  url: "https://www.youtube.com/watch?v=tJbzMqJGH4k",
};

// Wildlife spotted in official GTA VI footage. Behaviour and species
// names are community-reported until verified in-game after release.
export const animals: Animal[] = [
  {
    id: "anm-alligator",
    slug: "american-alligator",
    name: "American Alligator",
    species: "Alligator mississippiensis",
    class: "reptile",
    habitat: "Grassrivers wetlands, suburban pools & waterways",
    firstSeen: "Trailer 1 & Trailer 2",
    description:
      "The star of GTA VI's wildlife — hauled out of a family swimming pool in Trailer 1 and filmed storming a convenience store on CCTV. Florida's signature reptile looks set to be Leonida's signature menace.",
    verificationStatus: "community_reported",
    sourceReferences: [TRAILER_1, TRAILER_2],
    lastVerifiedAt: "2026-11-01",
  },
  {
    id: "anm-flamingo",
    slug: "flamingo",
    name: "Flamingo",
    species: "Phoenicopterus ruber",
    class: "bird",
    habitat: "Leonida Keys shallows & Grassrivers",
    firstSeen: "Trailer 1",
    description:
      "Flocks of flamingos lift off over the wetlands in the reveal trailer — an instantly iconic shot that sold Leonida as more than just Vice City.",
    verificationStatus: "community_reported",
    sourceReferences: [TRAILER_1],
    lastVerifiedAt: "2026-11-01",
  },
  {
    id: "anm-dolphin",
    slug: "bottlenose-dolphin",
    name: "Bottlenose Dolphin",
    species: "Tursiops truncatus",
    class: "marine",
    habitat: "Leonida Keys coastal waters",
    firstSeen: "Trailer 1",
    description:
      "Dolphins surf the bow wake of a speedboat tearing through the Keys — suggesting open-water wildlife activity, not just shoreline decoration.",
    verificationStatus: "community_reported",
    sourceReferences: [TRAILER_1],
    lastVerifiedAt: "2026-11-01",
  },
  {
    id: "anm-dog",
    slug: "domestic-dog",
    name: "Domestic Dog",
    species: "Canis familiaris",
    class: "mammal",
    habitat: "Vice City streets & suburbs",
    firstSeen: "Trailer 2 & An Extended Look",
    description:
      "Dogs appear across multiple shots — street scenes and beachfront life. Whether they can be interacted with beyond ambient behaviour is unconfirmed until launch.",
    verificationStatus: "community_reported",
    sourceReferences: [TRAILER_2, EXTENDED_LOOK],
    lastVerifiedAt: "2026-11-01",
  },
  {
    id: "anm-deer",
    slug: "white-tailed-deer",
    name: "White-tailed Deer",
    species: "Odocoileus virginianus",
    class: "mammal",
    habitat: "Mount Kalaga National Park woodlands",
    firstSeen: "An Extended Look",
    description:
      "Deer move through the forested slopes of Mount Kalaga — wildlife presence in the national park suggests hunting or ambient encounters in the backcountry.",
    verificationStatus: "community_reported",
    sourceReferences: [EXTENDED_LOOK],
    lastVerifiedAt: "2026-11-01",
  },
  {
    id: "anm-pelican",
    slug: "brown-pelican",
    name: "Brown Pelican",
    species: "Pelecanus occidentalis",
    class: "bird",
    habitat: "Vice Beach & Leonida coastline",
    firstSeen: "Trailer 1",
    description:
      "Pelicans skim the coastline in the reveal trailer's beach montage — part of the dense ambient bird life along Leonida's shore.",
    verificationStatus: "community_reported",
    sourceReferences: [TRAILER_1],
    lastVerifiedAt: "2026-11-01",
  },
  {
    id: "anm-iguana",
    slug: "green-iguana",
    name: "Green Iguana",
    species: "Iguana iguana",
    class: "reptile",
    habitat: "Vice City — walls, sidewalks & gardens",
    firstSeen: "Trailer 2",
    description:
      "An iguana lounges on a sidewalk in Trailer 2's street montage — South Florida's famous invasive lizard rendered as ambient city wildlife.",
    verificationStatus: "community_reported",
    sourceReferences: [TRAILER_2],
    lastVerifiedAt: "2026-11-01",
  },
  {
    id: "anm-raccoon",
    slug: "raccoon",
    name: "Raccoon",
    species: "Procyon lotor",
    class: "mammal",
    habitat: "Suburban bins & back alleys",
    firstSeen: "Trailer 2",
    description:
      "Community frame-by-frame analysis spots a raccoon in Trailer 2's suburban shots — another layer of the living-streets ambience.",
    verificationStatus: "community_reported",
    sourceReferences: [TRAILER_2],
    lastVerifiedAt: "2026-11-01",
  },
  {
    id: "anm-shark",
    slug: "shark",
    name: "Shark",
    species: "Unidentified — open water",
    class: "marine",
    habitat: "Deep ocean around Leonida",
    firstSeen: "Community screenshots — An Extended Look",
    description:
      "Sharp-eyed viewers reported shark silhouettes in open-water shots. Unconfirmed — treat as likely but not verified until in-game footage is checked post-launch.",
    verificationStatus: "unverified",
    sourceReferences: [EXTENDED_LOOK],
    lastVerifiedAt: "2026-11-01",
  },
];

export const animalClasses: { slug: AnimalClass; label: string }[] = [
  { slug: "mammal", label: "Mammals" },
  { slug: "reptile", label: "Reptiles" },
  { slug: "bird", label: "Birds" },
  { slug: "marine", label: "Marine Life" },
];
