import type { GameLocation } from "@/lib/types";

// Locations are split into two groups:
// 1. Regions officially profiled by Rockstar (officially_confirmed).
// 2. Named businesses/POIs visible on signage in official footage
//    (officially_confirmed existence) or community-documented trailer
//    sightings (community_reported).
//
// Coordinates are COMMUNITY ESTIMATES from trailer analysis, placed on
// our schematic canvas — not official map data. They exist so the
// interactive map is explorable before launch and are replaced with
// verified in-game coordinates after Nov 19, 2026.
const ROCKSTAR_GTA6 = {
  label: "Rockstar Games — Grand Theft Auto VI official website",
  url: "https://www.rockstargames.com/VI",
};
const FOOTAGE = {
  label: "Rockstar Games — official GTA VI footage & screenshots",
  url: "https://www.rockstargames.com/VI",
};

export const locations: GameLocation[] = [
  // ── Officially profiled regions ────────────────────────────────────
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
    mapCategory: "location",
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
    coordinates: { x: 1200, y: 600 },
    mapCategory: "location",
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
    coordinates: { x: -6740, y: -7041 },
    mapCategory: "location",
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
    coordinates: { x: -3115, y: -5026 },
    mapCategory: "location",
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
    coordinates: { x: -6235, y: 3951 },
    mapCategory: "location",
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
    coordinates: { x: -4200, y: 2700 },
    mapCategory: "location",
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
    coordinates: { x: -3500, y: 8300 },
    mapCategory: "location",
  },

  // ── Named places seen on signage in official footage ───────────────
  {
    id: "loc-leonida-penitentiary",
    slug: "leonida-penitentiary",
    name: "Leonida Penitentiary",
    region: "Leonida",
    description:
      "The state prison where Lucia Caminos' story begins — shown in Trailer 2 during her release, with name visible on signage. Exact in-game role and interior access unconfirmed.",
    verificationStatus: "officially_confirmed",
    sourceReferences: [FOOTAGE],
    lastVerifiedAt: "2026-10-31",
    coordinates: { x: -2727, y: -2731 },
    mapCategory: "poi",
  },
  {
    id: "loc-vice-beach",
    slug: "vice-beach",
    name: "Vice Beach",
    region: "Vice City",
    description:
      "The barrier-island beachfront district east of downtown Vice City — neon hotels, boardwalk crowds and ocean views, repeatedly shown across trailers and screenshots.",
    verificationStatus: "officially_confirmed",
    sourceReferences: [FOOTAGE],
    lastVerifiedAt: "2026-10-31",
    coordinates: { x: 2600, y: 1400 },
    mapCategory: "poi",
  },
  {
    id: "loc-brians-boat-works",
    slug: "brians-boat-works",
    name: "Brian's Boat Works & Marina",
    region: "Leonida Keys",
    description:
      "Brian Heder's boat yard in the Leonida Keys — the floodlit marina that fronts his smuggling operation, signage visible in Trailer 2.",
    verificationStatus: "officially_confirmed",
    sourceReferences: [FOOTAGE],
    lastVerifiedAt: "2026-10-31",
    coordinates: { x: -2350, y: -5550 },
    mapCategory: "poi",
  },
  {
    id: "loc-starlet-motel",
    slug: "starlet-motel",
    name: "Starlet Motel",
    region: "Port Gellhorn",
    description:
      "A faded roadside motel on the Port Gellhorn strip, name visible on signage in Trailer 2 — emblematic of the town's tourist-bust decline.",
    verificationStatus: "officially_confirmed",
    sourceReferences: [FOOTAGE],
    lastVerifiedAt: "2026-10-31",
    coordinates: { x: -5345, y: 3495 },
    mapCategory: "poi",
  },
  {
    id: "loc-hanks-waffles",
    slug: "hanks-waffles",
    name: "Hank's Waffles",
    region: "Leonida",
    description:
      "A roadside diner spotted in Trailer 2 with signage visible — Leonida's take on the waffle-house institution.",
    verificationStatus: "officially_confirmed",
    sourceReferences: [FOOTAGE],
    lastVerifiedAt: "2026-10-31",
    coordinates: { x: -6182, y: 4514 },
    mapCategory: "poi",
  },
  {
    id: "loc-phils-ammu-nation",
    slug: "phils-ammu-nation",
    name: "Phil's Ammu-Nation",
    region: "Vice City",
    description:
      "The returning gun-shop chain with Phil fronting its in-world ad in Trailer 2 — 'Come to Phil's Ammu-Nation today! We got more guns than the law allows.'",
    verificationStatus: "officially_confirmed",
    sourceReferences: [FOOTAGE],
    lastVerifiedAt: "2026-10-31",
    coordinates: { x: -465, y: 1256 },
    mapCategory: "poi",
  },
  {
    id: "loc-jack-of-hearts",
    slug: "jack-of-hearts",
    name: "Jack of Hearts",
    region: "Vice City",
    description:
      "A nightclub or venue spotted in Trailer 2 footage — community-documented name from the trailer's club sequence.",
    verificationStatus: "community_reported",
    sourceReferences: [FOOTAGE],
    lastVerifiedAt: "2026-10-31",
    coordinates: { x: -300, y: 1000 },
    mapCategory: "poi",
  },
  {
    id: "loc-dominion-hotel",
    slug: "dominion-hotel",
    name: "Dominion Hotel",
    region: "Vice Beach",
    description:
      "An oceanfront hotel visible in the Vice Beach strip shots of Trailer 2 — community-documented name from signage analysis.",
    verificationStatus: "community_reported",
    sourceReferences: [FOOTAGE],
    lastVerifiedAt: "2026-10-31",
    coordinates: { x: 2021, y: 921 },
    mapCategory: "poi",
  },
  {
    id: "loc-ocean-view-hotel",
    slug: "ocean-view-hotel",
    name: "Ocean View Hotel",
    region: "Vice Beach",
    description:
      "A hotel appearing in official screenshots on the Vice Beach frontage — notable for its callback name to GTA: Vice City's iconic safehouse.",
    verificationStatus: "community_reported",
    sourceReferences: [FOOTAGE],
    lastVerifiedAt: "2026-10-31",
    coordinates: { x: 1964, y: 611 },
    mapCategory: "poi",
  },
  {
    id: "loc-allied-crystal",
    slug: "allied-crystal-refinery",
    name: "Allied Crystal Refinery",
    region: "Ambrosia",
    description:
      "The sugar refinery that anchors Ambrosia's industry — named in official materials as the town's economic heart.",
    verificationStatus: "officially_confirmed",
    sourceReferences: [FOOTAGE],
    lastVerifiedAt: "2026-10-31",
    coordinates: { x: -2800, y: 3100 },
    mapCategory: "poi",
  },
  {
    id: "loc-leonida-port",
    slug: "port-of-vice-city",
    name: "Port of Vice City",
    region: "Vice City",
    description:
      "The container port visible in Trailer 2's shipping-yard sequences — cranes, container stacks and cargo infrastructure on the city waterfront.",
    verificationStatus: "community_reported",
    sourceReferences: [FOOTAGE],
    lastVerifiedAt: "2026-10-31",
    coordinates: { x: 1531, y: -790 },
    mapCategory: "poi",
  },
];
