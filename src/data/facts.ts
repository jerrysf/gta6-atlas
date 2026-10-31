import type { VerificationStatus } from "@/lib/types";

export interface Fact {
  stat: string;
  label: string;
  context: string;
  verificationStatus: VerificationStatus;
  href?: string;
}

/** Documented GTA 6 numbers — each carries a verification status. */
export const facts: Fact[] = [
  {
    stat: "93M+",
    label: "Trailer 1 views in 24 hours",
    context:
      "GTA VI's reveal trailer broke the YouTube record for a non-music video debut in December 2023 — a mark previously held by MrBeast.",
    verificationStatus: "officially_confirmed",
    href: "/watch",
  },
  {
    stat: "475M",
    label: "Trailer 2 first-day views",
    context:
      "Rockstar reported Trailer 2's cross-platform debut in May 2025 as the largest video launch in history at the time.",
    verificationStatus: "officially_confirmed",
    href: "/watch",
  },
  {
    stat: "34",
    label: "Tracks on the official album",
    context:
      "Grand Theft Auto VI: The Album — including an original score by Justice — releases day-and-date with the game on streaming, vinyl and CD.",
    verificationStatus: "officially_confirmed",
    href: "/music",
  },
  {
    stat: "26:48",
    label: "Minutes of gameplay shown",
    context:
      "The Extended Look deep dive is the longest official gameplay reveal — character switching, activities, combat and the Keys.",
    verificationStatus: "officially_confirmed",
    href: "/watch",
  },
  {
    stat: "2",
    label: "Playable protagonists",
    context:
      "Lucia Caminos and Jason Duval — the series' first two-lead structure and the first female protagonist in a mainline 3D GTA.",
    verificationStatus: "officially_confirmed",
    href: "/characters",
  },
  {
    stat: "6+",
    label: "Confirmed Leonida regions",
    context:
      "Vice City, the Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia and Mount Kalaga National Park — all named in official materials.",
    verificationStatus: "officially_confirmed",
    href: "/locations",
  },
  {
    stat: "13",
    label: "Years between mainline releases",
    context:
      "GTA 5 launched September 17, 2013 — GTA VI arrives November 19, 2026. The longest gap between numbered entries in series history.",
    verificationStatus: "officially_confirmed",
    href: "/timeline",
  },
  {
    stat: "~90",
    label: "Clips in the 2022 leak",
    context:
      "The September 2022 breach published roughly 90 work-in-progress clips — Rockstar confirmed their authenticity in an official statement.",
    verificationStatus: "officially_confirmed",
    href: "/timeline",
  },
  {
    stat: "2",
    label: "Launch platforms",
    context:
      "PS5 and Xbox Series X|S at launch. No PC date announced — Rockstar's last three major titles arrived on PC later.",
    verificationStatus: "officially_confirmed",
    href: "/guides/gta-6-platforms-ps4",
  },
  {
    stat: "1",
    label: "Delay so far",
    context:
      "Originally announced for 2025, then narrowed to Fall 2025, GTA VI was given its final November 19, 2026 date in a later update.",
    verificationStatus: "officially_confirmed",
    href: "/guides/gta-6-release-date",
  },
  {
    stat: "150–250GB",
    label: "Estimated install size",
    context:
      "Community estimates based on current-gen open-world installs — Rockstar has not confirmed a file size.",
    verificationStatus: "community_reported",
    href: "/guides/gta-6-file-size",
  },
  {
    stat: "M 17+",
    label: "Expected ESRB rating",
    context:
      "Every mainline GTA since GTA 2 has shipped rated M — the VI rating is expected, not yet published by the ESRB.",
    verificationStatus: "community_reported",
    href: "/guides/gta-6-age-rating",
  },
];
