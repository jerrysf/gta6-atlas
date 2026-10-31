import type { SourceReference, VerificationStatus } from "@/lib/types";

export interface TriviaItem {
  slug: string;
  title: string;
  body: string;
  category: "fandom" | "records" | "history" | "lore";
  verificationStatus: VerificationStatus;
  sources?: SourceReference[];
}

const OFFICIAL: SourceReference = {
  label: "Rockstar Games — official announcements",
  url: "https://www.rockstargames.com/VI",
};

export const trivia: TriviaItem[] = [
  {
    slug: "speed-new-zealand",
    title: "IShowSpeed wants to fly to New Zealand just to play GTA 6 early",
    body: "Because the game unlocks at midnight local time, New Zealand gets GTA 6 roughly 19 hours before the US East Coast. IShowSpeed told viewers he plans to fly there to be among the first to stream it — and he's not the only creator who floated the 'New Zealand trick'.",
    category: "fandom",
    verificationStatus: "community_reported",
    sources: [
      {
        label: "Coverage of Speed's New Zealand plan (Dexerto/streaming news)",
        url: "https://www.dexerto.com/",
      },
    ],
  },
  {
    slug: "florida-joker",
    title: "The 'Florida Joker' demanded Rockstar 'talk' over his lookalike",
    body: "Lawrence Sullivan — the tattooed man dubbed the Florida Joker — publicly claimed a Trailer 1 character was modeled on him and asked Rockstar for compensation. Whether Rockstar ever responded has never been confirmed.",
    category: "fandom",
    verificationStatus: "community_reported",
  },
  {
    slug: "moon-phase-theory",
    title: "Fans predicted Trailer 2's date using the moon",
    body: "The community noticed the moon phase in Trailer 1 promotional art matched a specific date — and used it to correctly forecast when the next beat of marketing would land. The 'moon phase theory' became one of the fandom's favorite detective moments.",
    category: "fandom",
    verificationStatus: "community_reported",
  },
  {
    slug: "hammer-lady",
    title: "The hammer lady became an instant meme",
    body: "The woman smashing a windshield with a hammer in Trailer 1's street montage went viral within hours — spawning fan art, name theories and a permanent spot in every 'GTA 6 trailer breakdown' since.",
    category: "fandom",
    verificationStatus: "community_reported",
  },
  {
    slug: "trailer-1-early-drop",
    title: "Rockstar dropped Trailer 1 early because it leaked",
    body: "Trailer 1 was scheduled for a morning premiere — then a low-res copy hit X the night before. Rockstar responded by releasing the official upload roughly 15 hours ahead of schedule, a rare crack in their famously controlled marketing.",
    category: "history",
    verificationStatus: "officially_confirmed",
    sources: [OFFICIAL],
  },
  {
    slug: "93m-record",
    title: "Trailer 1 broke MrBeast's 24-hour view record",
    body: "The first trailer hit ~93 million views in its first 24 hours, passing MrBeast's non-music YouTube record. It's one of the most-viewed game trailers ever released.",
    category: "records",
    verificationStatus: "officially_confirmed",
  },
  {
    slug: "475m-day-one",
    title: "Trailer 2 pulled 475 million views in 24 hours",
    body: "Rockstar reported over 475 million cross-platform views for Trailer 2's first day — the biggest video reveal in entertainment history at the time, ahead of any film trailer.",
    category: "records",
    verificationStatus: "officially_confirmed",
  },
  {
    slug: "2022-leak",
    title: "The 2022 leak was one of gaming's biggest ever",
    body: "A hacker posted ~90 clips of early development footage in September 2022. Rockstar confirmed the breach days later — an unprecedented look at a game still years from release.",
    category: "history",
    verificationStatus: "officially_confirmed",
  },
  {
    slug: "thirteen-year-wait",
    title: "The longest gap between two GTA games — 13 years",
    body: "GTA V launched in 2013; GTA VI arrives November 19, 2026. The 13-year span is the longest wait between mainline entries in series history — fans literally grew up between the two.",
    category: "history",
    verificationStatus: "officially_confirmed",
  },
  {
    slug: "first-female-lead",
    title: "Lucia is the first female lead in a 3D GTA",
    body: "The original 1997 GTA let players pick female characters, but Lucia Caminos is the first woman to headline a 3D-era Grand Theft Auto as a named, story protagonist.",
    category: "lore",
    verificationStatus: "officially_confirmed",
    sources: [OFFICIAL],
  },
  {
    slug: "bonnie-and-clyde",
    title: "Jason and Lucia are built on Bonnie & Clyde",
    body: "Rockstar's own framing casts the dual protagonists as a modern outlaw couple — the series' first true two-lead story, inspired by the infamous Depression-era duo.",
    category: "lore",
    verificationStatus: "officially_confirmed",
  },
  {
    slug: "ankle-monitor",
    title: "Lucia's ankle monitor hints at a parole storyline",
    body: "Sharp-eyed fans spotted what appears to be an ankle monitor on Lucia in official artwork — fueling a widely-discussed theory that her story starts on probation or early release. Rockstar hasn't confirmed it.",
    category: "lore",
    verificationStatus: "community_reported",
  },
  {
    slug: "two-delays",
    title: "GTA 6 was delayed twice — each time to polish",
    body: "First announced for 2025, then moved to May 2026, then to November 19, 2026. Both delays were framed by Rockstar as needing more time to hit the series' quality bar.",
    category: "history",
    verificationStatus: "officially_confirmed",
    sources: [OFFICIAL],
  },
  {
    slug: "first-original-score",
    title: "First GTA built around an original composed score",
    body: "French duo Justice is composing GTA 6's original score — the first mainline GTA built around a bespoke soundtrack rather than only licensed radio. It launches alongside a 34-track companion album the same day.",
    category: "records",
    verificationStatus: "officially_confirmed",
    sources: [OFFICIAL],
  },
];

export const triviaCategoryLabel: Record<TriviaItem["category"], string> = {
  fandom: "Fandom",
  records: "Records",
  history: "History",
  lore: "Lore & Story",
};
