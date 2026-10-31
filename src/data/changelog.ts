export interface ChangelogEntry {
  date: string;
  title: string;
  detail: string;
  tag: "content" | "feature" | "data" | "fix";
}

/** Public record of site updates — newest first. */
export const changelog: ChangelogEntry[] = [
  {
    date: "Nov 1, 2026",
    title: "Watch, Timeline & Changelog pages",
    detail:
      "New /watch page for every official trailer, a full road-to-launch timeline, and this changelog.",
    tag: "feature",
  },
  {
    date: "Nov 1, 2026",
    title: "Image coverage expansion",
    detail:
      "20 new entity images — wildlife now has official VI screenshots, 14 more locations illustrated, music tracks show trailer thumbnails.",
    tag: "data",
  },
  {
    date: "Nov 1, 2026",
    title: "Per-page share cards",
    detail:
      "Every guide and database entry now generates its own OpenGraph card for social embeds.",
    tag: "feature",
  },
  {
    date: "Oct 31, 2026",
    title: "Media gallery + UX polish",
    detail:
      "85-image gallery with filters and keyboard-navigable lightbox; reading progress bar, scroll-spy TOC, back-to-top.",
    tag: "feature",
  },
  {
    date: "Oct 30, 2026",
    title: "Music & Wildlife databases",
    detail:
      "11 confirmed tracks (The Album + trailer songs) and 9 Leonida animals with filters and detail pages.",
    tag: "content",
  },
  {
    date: "Oct 29, 2026",
    title: "Map detail cards + 47 markers",
    detail:
      "Marker popovers replaced by a full detail panel; 30 new community-reported trailer locations mapped.",
    tag: "feature",
  },
  {
    date: "Oct 28, 2026",
    title: "Official videos + launch countdown",
    detail:
      "All four Rockstar videos playable in-site; countdown to November 19 on the homepage.",
    tag: "feature",
  },
  {
    date: "Oct 27, 2026",
    title: "Real-life basis data",
    detail:
      "Every vehicle and weapon now lists its real-world counterpart — Viper, Corvette, Glock and more.",
    tag: "data",
  },
  {
    date: "Oct 25, 2026",
    title: "Launch-week guide series",
    detail:
      "File size, pre-load, day-one patch, PC requirements, controls, price and ESRB guides published.",
    tag: "content",
  },
  {
    date: "Oct 20, 2026",
    title: "GTA6 Atlas launches",
    detail:
      "Interactive map, completion tracker, walkthrough framework, five databases and the first guides go live.",
    tag: "feature",
  },
];
