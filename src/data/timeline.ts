import type { VerificationStatus } from "@/lib/types";

export interface TimelineEvent {
  date: string;
  year: string;
  title: string;
  description: string;
  verificationStatus: VerificationStatus;
  links?: { label: string; href: string }[];
}

/**
 * Every documented beat in GTA VI's road to launch — official events marked
 * confirmed, media reports marked community-reported.
 */
export const timelineEvents: TimelineEvent[] = [
  {
    date: "March 2022",
    year: "2022",
    title: "GTA VI confirmed in development",
    description:
      "Bloomberg's Jason Schreier reports that the next Grand Theft Auto is in active development at Rockstar — codenamed Project Americas — with a Latina female protagonist, a series first.",
    verificationStatus: "community_reported",
  },
  {
    date: "September 18, 2022",
    year: "2022",
    title: "Early-development footage leak",
    description:
      "Roughly 90 clips of work-in-progress GTA VI footage surface online. Rockstar confirms the material is genuine in an official statement, calling it an illegal network intrusion — the most public confirmation the game exists.",
    verificationStatus: "officially_confirmed",
  },
  {
    date: "November 8, 2023",
    year: "2023",
    title: "Trailer announcement",
    description:
      "Rockstar announces the first Grand Theft Auto VI trailer will debut in early December — the first official acknowledgement of the title on Rockstar's channels.",
    verificationStatus: "officially_confirmed",
  },
  {
    date: "December 4, 2023",
    year: "2023",
    title: "Trailer 1 premieres",
    description:
      "The reveal trailer arrives hours early after a leak — introducing Lucia, Jason and Leonida, soundtracked by Tom Petty's 'Love Is a Long Road'. It becomes the most-viewed video game trailer launch in YouTube history at the time.",
    verificationStatus: "officially_confirmed",
    links: [
      { label: "Watch Trailer 1", href: "/watch" },
      { label: "Meet the cast", href: "/characters" },
    ],
  },
  {
    date: "February 2024",
    year: "2024",
    title: "2025 release window confirmed",
    description:
      "Take-Two Interactive confirms a calendar-2025 launch window for PS5 and Xbox Series X|S during its earnings call — no PC date announced.",
    verificationStatus: "officially_confirmed",
    links: [{ label: "Platforms guide", href: "/guides/gta-6-platforms-ps4" }],
  },
  {
    date: "May 16, 2024",
    year: "2024",
    title: "Window narrows to Fall 2025",
    description:
      "Take-Two narrows the window to Fall 2025 in its fiscal-year outlook — the first half-step toward a specific date.",
    verificationStatus: "officially_confirmed",
  },
  {
    date: "May 6, 2025",
    year: "2025",
    title: "Trailer 2 — and the delay to May 26, 2026",
    description:
      "After months of silence, Trailer 2 drops alongside a new release date: May 26, 2026. Rockstar's overhauled GTA VI website publishes official character portraits, Leonida postcards and screenshot galleries.",
    verificationStatus: "officially_confirmed",
    links: [
      { label: "Watch Trailer 2", href: "/watch" },
      { label: "Trailer 2 breakdown", href: "/guides/gta-6-trailer-2-breakdown" },
      { label: "Media gallery", href: "/media" },
    ],
  },
  {
    date: "August 27, 2026",
    year: "2026",
    title: "An Extended Look — 26 minutes of gameplay",
    description:
      "Rockstar releases a 26-minute deep dive: character switching between Lucia and Jason, side activities, combat, the Leonida Keys and Vice City in detail.",
    verificationStatus: "officially_confirmed",
    links: [{ label: "Watch the Extended Look", href: "/watch" }],
  },
  {
    date: "September 2026",
    year: "2026",
    title: "Grand Theft Auto VI: The Album announced",
    description:
      "The official soundtrack album is revealed: 34 tracks including an original score by Justice, releasing day-and-date with the game on streaming, vinyl and CD.",
    verificationStatus: "officially_confirmed",
    links: [{ label: "Music database", href: "/music" }],
  },
  {
    date: "October 15, 2026",
    year: "2026",
    title: "Launch Trailer",
    description:
      "The final trailer — 'Flower in a Hurricane' by Justice — arrives a month before release, captured on PS5.",
    verificationStatus: "officially_confirmed",
    links: [
      { label: "Watch the Launch Trailer", href: "/watch" },
      { label: "Launch trailer breakdown", href: "/guides/gta-6-launch-trailer-breakdown" },
    ],
  },
  {
    date: "November 19, 2026",
    year: "2026",
    title: "Grand Theft Auto VI launches",
    description:
      "GTA VI releases worldwide on PlayStation 5 and Xbox Series X|S. A PC version remains undated.",
    verificationStatus: "officially_confirmed",
    links: [
      { label: "Launch-day checklist", href: "/guides/how-to-prepare-for-gta-6" },
      { label: "Editions & pre-order", href: "/guides/gta-6-editions-preorder" },
    ],
  },
];
