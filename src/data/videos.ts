export interface OfficialVideo {
  youtubeId: string;
  title: string;
  publishedAt: string;
  duration: string;
  note: string;
}

/** Official Rockstar Games uploads — linked out to YouTube. */
export const officialVideos: OfficialVideo[] = [
  {
    youtubeId: "rz1B4B2yBZY",
    title: "Grand Theft Auto VI — Launch Trailer",
    publishedAt: "Oct 15, 2026",
    duration: "1:30",
    note: "Final trailer featuring \"Flower in a Hurricane\" by Justice, captured on PS5.",
  },
  {
    youtubeId: "tJbzMqJGH4k",
    title: "Grand Theft Auto VI: An Extended Look",
    publishedAt: "Aug 27, 2026",
    duration: "26:48",
    note: "26 minutes of in-game footage — character swapping, activities, combat and Leonida in detail.",
  },
  {
    youtubeId: "VQRLujxTm3c",
    title: "Grand Theft Auto VI — Trailer 2",
    publishedAt: "May 6, 2025",
    duration: "2:47",
    note: "Second trailer — Jason & Lucia's story, Leonida Keys, Vice City and the supporting cast.",
  },
  {
    youtubeId: "QdBZY2fkU-0",
    title: "Grand Theft Auto VI — Trailer 1",
    publishedAt: "Dec 4, 2023",
    duration: "1:31",
    note: "The reveal trailer — Lucia's introduction and the first look at Leonida.",
  },
];
