import type { SourceReference, VerificationStatus } from "@/lib/types";

export type TrackContext = "trailer" | "album" | "score";

export interface Track {
  id: string;
  slug: string;
  name: string;
  artist: string;
  featuring?: string;
  /** Where the track is confirmed to appear. */
  context: TrackContext;
  contextLabel: string;
  description: string;
  verificationStatus: VerificationStatus;
  sourceReferences: SourceReference[];
  lastVerifiedAt?: string;
}

const ROCKSTAR_VI: SourceReference = {
  label: "Rockstar Games — Grand Theft Auto VI",
  url: "https://www.rockstargames.com/VI",
};

const VARIETY_SCORE: SourceReference = {
  label: "Variety — GTA VI trailer confirms Justice original score",
  url: "https://variety.com/2026/music/news/gta-vi-trailer-justice-original-score-song-sza-tame-impala-1236913120/",
};

const RADIO_TIMES: SourceReference = {
  label: "Radio Times — GTA 6 soundtrack confirmed songs",
  url: "https://www.radiotimes.com/technology/gaming/gta-6-trailer-song/",
};

// Grand Theft Auto VI: The Album — officially announced soundtrack.
// 34 original tracks, releasing November 19, 2026 alongside the game
// via Rockstar Games / Atlantic Records, on vinyl, CD and streaming.
// Justice compose the game's original score.
export const tracks: Track[] = [
  {
    id: "trk-flower",
    slug: "flower-in-a-hurricane",
    name: "Flower in a Hurricane",
    artist: "Justice",
    featuring: "Tame Impala, SZA & King Gizzard & The Lizard Wizard",
    context: "trailer",
    contextLabel: "Launch Trailer (Oct 15, 2026)",
    description:
      "The Launch Trailer song and the debut single from GTA VI's original score. Justice — the French electronic duo of Gaspard Augé and Xavier de Rosnay — compose the game's full original score, making this the first GTA built around an original composed soundtrack.",
    verificationStatus: "officially_confirmed",
    sourceReferences: [ROCKSTAR_VI, VARIETY_SCORE],
    lastVerifiedAt: "2026-11-01",
  },
  {
    id: "trk-love-is-a-long-road",
    slug: "love-is-a-long-road",
    name: "Love Is a Long Road",
    artist: "Tom Petty",
    context: "trailer",
    contextLabel: "Trailer 1 (Dec 4, 2023)",
    description:
      "The song that soundtracked the world's first look at GTA VI. The 1989 track from Petty's Full Moon Fever era saw its streams surge tens of thousands of percent in the week after the trailer, and Petty's estate called its use an honour.",
    verificationStatus: "officially_confirmed",
    sourceReferences: [ROCKSTAR_VI, RADIO_TIMES],
    lastVerifiedAt: "2026-11-01",
  },
  {
    id: "trk-hot-together",
    slug: "hot-together",
    name: "Hot Together",
    artist: "The Pointer Sisters",
    context: "trailer",
    contextLabel: "Trailer 2 (May 6, 2025)",
    description:
      "The 1986 track written by Sharon Robinson that powers Trailer 2's sun-soaked Leonida montage. Robinson's own original demo version went unreleased for decades until 2021's We Were Dreamers '85.",
    verificationStatus: "officially_confirmed",
    sourceReferences: [ROCKSTAR_VI, RADIO_TIMES],
    lastVerifiedAt: "2026-11-01",
  },
  {
    id: "trk-thats-it",
    slug: "thats-it",
    name: "That's It",
    artist: "Yung Lean",
    featuring: "Future & Metro Boomin",
    context: "album",
    contextLabel: "Grand Theft Auto VI: The Album",
    description:
      "One of the first six songs Rockstar and Atlantic Records announced for the soundtrack — Swedish cloud-rap pioneer Yung Lean linking with Future and Metro Boomin.",
    verificationStatus: "officially_confirmed",
    sourceReferences: [VARIETY_SCORE, RADIO_TIMES],
    lastVerifiedAt: "2026-11-01",
  },
  {
    id: "trk-rhyno",
    slug: "rhyno",
    name: "Rhyno",
    artist: "Travis Scott",
    featuring: "prod. Guy-Manuel de Homem-Christo",
    context: "album",
    contextLabel: "Grand Theft Auto VI: The Album",
    description:
      "Travis Scott on the official soundtrack, produced by Guy-Manuel de Homem-Christo of Daft Punk — one of the headline original recordings written for the game.",
    verificationStatus: "officially_confirmed",
    sourceReferences: [VARIETY_SCORE, RADIO_TIMES],
    lastVerifiedAt: "2026-11-01",
  },
  {
    id: "trk-sexy-magic",
    slug: "sexy-magic",
    name: "Sexy Magic",
    artist: "Ca7riel & Paco Amoroso",
    featuring: "PinkPantheress, Fred again.. & Etienne de Crécy",
    context: "album",
    contextLabel: "Grand Theft Auto VI: The Album",
    description:
      "Argentinian duo Ca7riel & Paco Amoroso with an all-star lineup — PinkPantheress, Fred again.. and French house legend Etienne de Crécy — part of the soundtrack's first announced wave.",
    verificationStatus: "officially_confirmed",
    sourceReferences: [VARIETY_SCORE, RADIO_TIMES],
    lastVerifiedAt: "2026-11-01",
  },
  {
    id: "trk-last-thing-you-need",
    slug: "last-thing-you-need",
    name: "Last Thing You Need",
    artist: "Morgan Wallen",
    context: "album",
    contextLabel: "Grand Theft Auto VI: The Album",
    description:
      "Country superstar Morgan Wallen contributes an original track — fitting Leonida's mix of city neon and deep-country Ambrosia.",
    verificationStatus: "officially_confirmed",
    sourceReferences: [VARIETY_SCORE, RADIO_TIMES],
    lastVerifiedAt: "2026-11-01",
  },
  {
    id: "trk-macacoa-2000",
    slug: "macacoa-2000",
    name: "Macacoa 2000",
    artist: "Rauw Alejandro",
    context: "album",
    contextLabel: "Grand Theft Auto VI: The Album",
    description:
      "Puerto Rican star Rauw Alejandro brings reggaeton energy to the soundtrack — a natural fit for Vice City's Latin nightlife.",
    verificationStatus: "officially_confirmed",
    sourceReferences: [VARIETY_SCORE, RADIO_TIMES],
    lastVerifiedAt: "2026-11-01",
  },
  {
    id: "trk-bright-lights-big-city",
    slug: "bright-lights-big-city",
    name: "Bright Lights, Big City",
    artist: "Keith Richards",
    context: "album",
    contextLabel: "Grand Theft Auto VI: The Album",
    description:
      "The Rolling Stones guitarist covers the Jimmy Reed blues standard for the soundtrack — the veteran counterweight to the album's contemporary lineup.",
    verificationStatus: "officially_confirmed",
    sourceReferences: [VARIETY_SCORE, RADIO_TIMES],
    lastVerifiedAt: "2026-11-01",
  },
  {
    id: "trk-dont-chart",
    slug: "dont-chart",
    name: "Don't Chart",
    artist: "Cardi B",
    context: "album",
    contextLabel: "Grand Theft Auto VI: The Album",
    description:
      "Cardi B's contribution, released in the second wave of soundtrack singles in the lead-up to launch.",
    verificationStatus: "officially_confirmed",
    sourceReferences: [VARIETY_SCORE],
    lastVerifiedAt: "2026-11-01",
  },
  {
    id: "trk-suzuki",
    slug: "suzuki",
    name: "Suzuki",
    artist: "Fuerza Regida",
    context: "album",
    contextLabel: "Grand Theft Auto VI: The Album",
    description:
      "Regional Mexican hitmakers Fuerza Regida add corridos tumbados flavour — released alongside Cardi B's track in the second announcement wave.",
    verificationStatus: "officially_confirmed",
    sourceReferences: [VARIETY_SCORE],
    lastVerifiedAt: "2026-11-01",
  },
];

export const trackContexts: { slug: TrackContext; label: string }[] = [
  { slug: "trailer", label: "Trailer Songs" },
  { slug: "album", label: "The Album" },
];
