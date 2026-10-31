export interface ExploreSpot {
  slug: string;
  name: string;
  /** The real-world place it maps to. */
  analog: string;
  blurb: string;
  lat: number;
  lng: number;
}

/**
 * Every Leonida location mapped to the real South Florida place it is
 * based on — Miami is Vice City, the Everglades are the Grassrivers,
 * Belle Glade is Ambrosia's sugar country, and Hobe Mountain is the
 * closest thing South Florida has to Mount Kalaga.
 */
export const roamPois: ExploreSpot[] = [
  {
    slug: "vice-city",
    name: "Vice City",
    analog: "Downtown Miami / Brickell",
    lat: 25.7617,
    lng: -80.1918,
    blurb: "The neon heart of Leonida — Jason and Lucia's playground.",
  },
  {
    slug: "vice-beach",
    name: "Vice Beach",
    analog: "South Beach, Miami Beach",
    lat: 25.7826,
    lng: -80.134,
    blurb: "The oceanfront strip — hotels, nightlife, postcard views.",
  },
  {
    slug: "crosstown",
    name: "Crosstown",
    analog: "Wynwood, Miami",
    lat: 25.801,
    lng: -80.1994,
    blurb: "Vice City's working-class neighborhood.",
  },
  {
    slug: "vice-city-intl-airport",
    name: "Vice City Intl. Airport",
    analog: "Miami International Airport",
    lat: 25.7959,
    lng: -80.287,
    blurb: "Leonida's air gateway — spotted in Trailer 2.",
  },
  {
    slug: "brians-boat-works",
    name: "Brian's Boat Works",
    analog: "Dinner Key Marina, Coconut Grove",
    lat: 25.7258,
    lng: -80.2344,
    blurb: "Brian Heder's marina — where the crew's work starts.",
  },
  {
    slug: "hanks-waffles",
    name: "Hank's Waffles",
    analog: "Calle Ocho, Little Havana",
    lat: 25.7654,
    lng: -80.2194,
    blurb: "Roadside diner from Trailer 1's night shots.",
  },
  {
    slug: "leonida-penitentiary",
    name: "Leonida Penitentiary",
    analog: "Dade Correctional Institution",
    lat: 25.4566,
    lng: -80.4926,
    blurb: "The state prison where Lucia's story begins.",
  },
  {
    slug: "gellhorn-raceway",
    name: "Gellhorn Intl. Raceway",
    analog: "Homestead-Miami Speedway",
    lat: 25.4505,
    lng: -80.4092,
    blurb: "Oval speedway from the Extended Look's race footage.",
  },
  {
    slug: "grassrivers",
    name: "Grassrivers",
    analog: "Shark Valley, Everglades",
    lat: 25.7596,
    lng: -80.7662,
    blurb: "Wetland wilderness — airboats, gators, mud.",
  },
  {
    slug: "thrillbilly",
    name: "Thrillbilly Mud Club",
    analog: "Loop Road, Big Cypress",
    lat: 25.861,
    lng: -80.988,
    blurb: "Mud, ATVs and monster trucks in the wetlands.",
  },
  {
    slug: "ambrosia",
    name: "Ambrosia",
    analog: "Belle Glade sugar country",
    lat: 26.6845,
    lng: -80.6676,
    blurb: "Sugar-refinery company town — Allied Crystal's home.",
  },
  {
    slug: "starlet-motel",
    name: "Starlet Motel",
    analog: "US-1 motel row, Florida City",
    lat: 25.4479,
    lng: -80.4792,
    blurb: "Faded roadside motel on the Port Gellhorn strip.",
  },
  {
    slug: "nine1nine",
    name: "nine1nine",
    analog: "Key Largo",
    lat: 25.0865,
    lng: -80.4473,
    blurb: "Dre'Quan Priest's strip club in the Keys.",
  },
  {
    slug: "leonida-keys",
    name: "Leonida Keys",
    analog: "Key West",
    lat: 24.5551,
    lng: -81.78,
    blurb: "Island chain south of the mainland — boat country.",
  },
  {
    slug: "port-gellhorn",
    name: "Port Gellhorn",
    analog: "Everglades City",
    lat: 25.8585,
    lng: -81.3851,
    blurb: "Faded panhandle port town where the story opens.",
  },
  {
    slug: "mount-kalaga",
    name: "Mount Kalaga",
    analog: "Hobe Mountain (86 ft)",
    lat: 26.985,
    lng: -80.107,
    blurb: "Northern highlands — the wild roof of Leonida.",
  },
];

/** Real landmarks worth flying over — the Golden Rings of the 2D roam. */
export const roamLandmarks: ExploreSpot[] = [
  {
    slug: "ocean-drive",
    name: "Ocean Drive",
    analog: "Art Deco District",
    lat: 25.7772,
    lng: -80.1311,
    blurb: "The postcard strip — neon, palms and pastel hotels.",
  },
  {
    slug: "stiltsville",
    name: "Stiltsville",
    analog: "Biscayne Bay",
    lat: 25.6535,
    lng: -80.169,
    blurb: "Stilt houses standing in open water since the 1930s.",
  },
  {
    slug: "venetian-causeway",
    name: "Venetian Causeway",
    analog: "Miami ↔ Miami Beach",
    lat: 25.791,
    lng: -80.17,
    blurb: "The island-hop bridge — straight out of the trailer flyover.",
  },
  {
    slug: "wynwood-walls",
    name: "Wynwood Walls",
    analog: "Wynwood",
    lat: 25.8009,
    lng: -80.1992,
    blurb: "Street-art capital — the murals behind countless GTA fan shots.",
  },
  {
    slug: "freedom-tower",
    name: "Freedom Tower",
    analog: "Downtown Miami",
    lat: 25.7801,
    lng: -80.1899,
    blurb: "Miami's Ellis Island — the skyline's grand old tower.",
  },
  {
    slug: "christ-of-the-abyss",
    name: "Christ of the Abyss",
    analog: "John Pennekamp Reef",
    lat: 25.129,
    lng: -80.297,
    blurb: "A bronze statue sunk 25 ft under the sea off Key Largo.",
  },
  {
    slug: "seven-mile-bridge",
    name: "Seven Mile Bridge",
    analog: "Overseas Highway",
    lat: 24.706,
    lng: -81.149,
    blurb: "The endless ocean causeway — pure Keys energy.",
  },
  {
    slug: "lake-okeechobee",
    name: "Lake Okeechobee",
    analog: "Clewiston",
    lat: 26.7542,
    lng: -80.9337,
    blurb: "Florida's inland sea — the sugar fields' beating heart.",
  },
];

/** Hidden curiosities — invisible until you roam close. */
export const roamStashes: ExploreSpot[] = [
  {
    slug: "cape-florida-light",
    name: "Cape Florida Lighthouse",
    analog: "Bill Baggs State Park",
    lat: 25.6665,
    lng: -80.1558,
    blurb: "Miami's oldest standing structure, guarding the cape since 1825.",
  },
  {
    slug: "fowey-rocks",
    name: "Fowey Rocks Light",
    analog: "Biscayne Channel",
    lat: 25.5909,
    lng: -80.0975,
    blurb: "A skeletal iron lighthouse rising straight out of the reef.",
  },
  {
    slug: "coral-castle",
    name: "Coral Castle",
    analog: "Homestead",
    lat: 25.501,
    lng: -80.446,
    blurb: "A one-man stone monument — Florida's strangest roadside mystery.",
  },
  {
    slug: "aerojet-rocket",
    name: "Aerojet Rocket Silo",
    analog: "Everglades backcountry",
    lat: 25.381,
    lng: -80.565,
    blurb: "An abandoned Apollo-era solid rocket still lying in its pit.",
  },
  {
    slug: "pigeon-key",
    name: "Pigeon Key",
    analog: "Under Seven Mile Bridge",
    lat: 24.7039,
    lng: -81.1554,
    blurb: "A tiny island work-camp preserved under the great causeway.",
  },
  {
    slug: "monkey-jungle",
    name: "Monkey Jungle",
    analog: "South Miami-Dade",
    lat: 25.5679,
    lng: -80.3764,
    blurb: "Where the monkeys run free and the humans walk in cages.",
  },
];

export const ROAM_START = { lat: 25.775, lng: -80.2, zoom: 12 };
export const ROAM_BOUNDS: [[number, number], [number, number]] = [
  [24.0, -82.4],
  [27.4, -79.7],
];
/** Zoom needed before a spot counts as discovered when centered. */
export const DISCOVER_ZOOM = 12;
/** Screen-radius (px) around map center that counts as "on the spot". */
export const DISCOVER_RADIUS_PX = 130;
