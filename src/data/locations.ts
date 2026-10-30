import type { GameLocation } from "@/lib/types";

// Locations below are named on the official GTA VI website and trailers.
// No coordinates are published until the in-game map is verified after release.
const ROCKSTAR_GTA6 = {
  label: "Rockstar Games — Grand Theft Auto VI official website",
  url: "https://www.rockstargames.com/VI",
};

export const locations: GameLocation[] = [
  {
    id: "loc-leonida",
    slug: "leonida",
    name: "Leonida",
    region: "State",
    description:
      "The fictional American state where Grand Theft Auto VI is set — Rockstar's take on Florida, spanning neon cities, swamps, keys, and national parks.",
    verificationStatus: "officially_confirmed",
    sourceReferences: [ROCKSTAR_GTA6],
    lastVerifiedAt: "2026-10-31",
  },
  {
    id: "loc-vice-city",
    slug: "vice-city",
    name: "Vice City",
    region: "Leonida",
    description:
      "The sun-soaked metropolis returning as GTA VI's centerpiece — a modern reimagining of Rockstar's Miami-inspired city, from neon beachfronts to working-class neighborhoods.",
    verificationStatus: "officially_confirmed",
    sourceReferences: [ROCKSTAR_GTA6],
    lastVerifiedAt: "2026-10-31",
  },
  {
    id: "loc-leonida-keys",
    slug: "leonida-keys",
    name: "Leonida Keys",
    region: "Leonida",
    description:
      "A tropical archipelago south of Vice City where Jason Duval runs errands for local smugglers — marinas, boat yards, and easy living with an undercurrent of crime.",
    verificationStatus: "officially_confirmed",
    sourceReferences: [ROCKSTAR_GTA6],
    lastVerifiedAt: "2026-10-31",
  },
  {
    id: "loc-grassrivers",
    slug: "grassrivers",
    name: "Grassrivers",
    region: "Leonida",
    description:
      "Leonida's vast wetland wilderness — an untamed sprawl of sawgrass, gators, and backchannels officially shown in GTA VI promotional materials.",
    verificationStatus: "officially_confirmed",
    sourceReferences: [ROCKSTAR_GTA6],
    lastVerifiedAt: "2026-10-31",
  },
  {
    id: "loc-port-gellhorn",
    slug: "port-gellhorn",
    name: "Port Gellhorn",
    region: "Leonida",
    description:
      "A run-down coastal strip on Leonida's west side — cheap motels, empty storefronts, and shuttered attractions marking a town the tourists forgot.",
    verificationStatus: "officially_confirmed",
    sourceReferences: [ROCKSTAR_GTA6],
    lastVerifiedAt: "2026-10-31",
  },
  {
    id: "loc-ambrosia",
    slug: "ambrosia",
    name: "Ambrosia",
    region: "Leonida",
    description:
      "An industrial heartland town dominated by the Allied Crystal sugar refinery — old money, hard labor, and biker turf, per official GTA VI materials.",
    verificationStatus: "officially_confirmed",
    sourceReferences: [ROCKSTAR_GTA6],
    lastVerifiedAt: "2026-10-31",
  },
  {
    id: "loc-mount-kalaga",
    slug: "mount-kalaga",
    name: "Mount Kalaga National Park",
    region: "Leonida",
    description:
      "The rugged national park on Leonida's northern border — dense forest, river gorges, and backcountry trails officially featured in GTA VI's reveal materials.",
    verificationStatus: "officially_confirmed",
    sourceReferences: [ROCKSTAR_GTA6],
    lastVerifiedAt: "2026-10-31",
  },
];
