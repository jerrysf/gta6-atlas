import type { Collectible } from "@/lib/types";

// Collectibles require in-game verification after release — nothing may be
// published there until locations and counts are confirmed.
export const collectibles: Collectible[] = [];

// Secrets & easter eggs documented by the community in official trailers,
// the Extended Look and screenshots. These are real, observable sightings
// in released footage — marked community_reported and expanded as the
// community finds more. In-game secrets get verified after Nov 19, 2026.
const FOOTAGE = {
  label: "Rockstar Games — official GTA VI footage & screenshots",
  url: "https://www.rockstargames.com/VI",
};

export const secrets: Collectible[] = [
  {
    id: "sec-gator-store",
    slug: "gator-in-the-store",
    name: "Gator in the Convenience Store",
    kind: "secret",
    category: "Trailer Easter Egg",
    description:
      "Trailer 1 shows an alligator casually wandering through a convenience store doorway — peak Leonida energy, and a nod to real Florida gator incidents.",
    location: "Leonida (storefront seen in Trailer 1)",
    discoveryInstructions:
      "Visible in Trailer 1's opening montage. Whether gators enter stores in-game is unverified.",
    verificationStatus: "community_reported",
    sourceReferences: [FOOTAGE],
    lastVerifiedAt: "2026-10-31",
  },
  {
    id: "sec-gator-pool",
    slug: "gator-in-the-pool",
    name: "Gator in the Backyard Pool",
    kind: "secret",
    category: "Trailer Easter Egg",
    description:
      "Official footage shows a gator lounging in a residential swimming pool — another Florida-man headline made flesh.",
    location: "Residential Leonida (seen in official footage)",
    discoveryInstructions:
      "Seen in official footage/screenshots. Whether pool gators spawn dynamically is unverified.",
    verificationStatus: "community_reported",
    sourceReferences: [FOOTAGE],
    lastVerifiedAt: "2026-10-31",
  },
  {
    id: "sec-florida-man",
    slug: "florida-man-clips",
    name: "Florida Man Viral Clips",
    kind: "secret",
    category: "Trailer Easter Egg",
    description:
      "Trailer 1 opens as a feed of in-world viral videos — a winking parody of 'Florida Man' news culture, implying Leonida has its own social media ecosystem.",
    location: "Trailer 1 opening montage",
    discoveryInstructions:
      "Watch the first shots of Trailer 1 — the montage is presented as clips from an in-universe video platform.",
    verificationStatus: "community_reported",
    sourceReferences: [FOOTAGE],
    lastVerifiedAt: "2026-10-31",
  },
  {
    id: "sec-patriot-beer",
    slug: "patriot-beer",
    name: "Patriot Beer",
    kind: "secret",
    category: "In-World Brand",
    description:
      "The returning in-universe beer brand appears on signage in Trailer 2 — one of several familiar GTA product parodies confirmed for Leonida.",
    location: "Signage in Trailer 2",
    verificationStatus: "community_reported",
    sourceReferences: [FOOTAGE],
    lastVerifiedAt: "2026-10-31",
  },
  {
    id: "sec-leonida-lottery",
    slug: "leonida-lottery",
    name: "Leonida Lottery",
    kind: "secret",
    category: "In-World Brand",
    description:
      "Lottery advertising appears on ATMs in Trailer 2 — suggesting Leonida runs its own state lottery, complete with the requisite desperation.",
    location: "ATM signage in Trailer 2",
    verificationStatus: "community_reported",
    sourceReferences: [FOOTAGE],
    lastVerifiedAt: "2026-10-31",
  },
  {
    id: "sec-ammu-nation-ad",
    slug: "phils-ammu-nation-ad",
    name: "Phil's Ammu-Nation Ad",
    kind: "secret",
    category: "Trailer Easter Egg",
    description:
      "'Come to Phil's Ammu-Nation today! We got more guns than the law allows.' — the gun-store chain's cheerfully illegal in-world ad plays over Trailer 2's gun-shop shots.",
    location: "Trailer 2 audio/visual — Phil's Ammu-Nation",
    verificationStatus: "community_reported",
    sourceReferences: [FOOTAGE],
    lastVerifiedAt: "2026-10-31",
  },
  {
    id: "sec-ocean-view-callback",
    slug: "ocean-view-callback",
    name: "Ocean View Hotel Callback",
    kind: "secret",
    category: "Trailer Easter Egg",
    description:
      "An 'Ocean View' hotel appears on the Vice Beach frontage in official screenshots — an apparent callback to Tommy Vercetti's first safehouse in GTA: Vice City.",
    location: "Vice Beach (official screenshots)",
    verificationStatus: "community_reported",
    sourceReferences: [FOOTAGE],
    lastVerifiedAt: "2026-10-31",
  },
];
