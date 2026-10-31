// World-space coordinates for the 3D Explorer diorama, derived from the
// community map coordinates in locations.ts (world = map / 20, y inverted).
// This is a stylized fan-made diorama — not to scale, not the official map.

export interface ExplorePoi {
  slug: string;
  name: string;
  x: number;
  z: number;
  blurb: string;
}

export interface ExploreIsland {
  id: string;
  name: string;
  cx: number;
  cz: number;
  rx: number;
  rz: number;
  y: number;
  kind: "city" | "mainland" | "swamp" | "keys" | "mountain";
}

export const explorePois: ExplorePoi[] = [
  { slug: "vice-city", name: "Vice City", x: 60, z: -30, blurb: "The neon heart of Leonida — Jason and Lucia's playground." },
  { slug: "vice-beach", name: "Vice Beach", x: 130, z: -70, blurb: "The oceanfront strip — hotels, nightlife, postcard views." },
  { slug: "leonida-keys", name: "Leonida Keys", x: -337, z: 352, blurb: "Island chain south of the mainland — boat country." },
  { slug: "grassrivers", name: "Grassrivers", x: -156, z: 251, blurb: "Wetland wilderness — airboats, gators, mud." },
  { slug: "port-gellhorn", name: "Port Gellhorn", x: -312, z: -198, blurb: "Faded panhandle port town where the story opens." },
  { slug: "ambrosia", name: "Ambrosia", x: -210, z: -135, blurb: "Sugar-refinery company town — Allied Crystal's home." },
  { slug: "mount-kalaga", name: "Mount Kalaga", x: -175, z: -415, blurb: "Northern highlands — the wild roof of Leonida." },
  { slug: "nine1nine", name: "nine1nine", x: -118, z: 278, blurb: "Dre'Quan Priest's strip club in the Keys." },
  { slug: "starlet-motel", name: "Starlet Motel", x: -267, z: -175, blurb: "Faded roadside motel on the Port Gellhorn strip." },
  { slug: "crosstown", name: "Crosstown", x: -131, z: 6, blurb: "Vice City's working-class neighborhood." },
  { slug: "vice-city-intl-airport", name: "Vice City Intl. Airport", x: -62, z: 16, blurb: "Leonida's air gateway — spotted in Trailer 2." },
  { slug: "gellhorn-raceway", name: "Gellhorn Intl. Raceway", x: -217, z: -109, blurb: "Oval speedway from the Extended Look's race footage." },
  { slug: "leonida-penitentiary", name: "Leonida Penitentiary", x: -150, z: 125, blurb: "The state prison where Lucia's story begins." },
  { slug: "thrillbilly", name: "Thrillbilly Mud Club", x: -120, z: 150, blurb: "Mud, ATVs and monster trucks in the wetlands." },
  { slug: "brians-boat-works", name: "Brian's Boat Works", x: -38, z: -56, blurb: "Brian Heder's marina — where the crew's work starts." },
  { slug: "hanks-waffles", name: "Hank's Waffles", x: 33, z: 95, blurb: "Roadside diner from Trailer 1's night shots." },
];

export const exploreIslands: ExploreIsland[] = [
  { id: "vice-city-metro", name: "Vice City Metro", cx: 85, cz: -15, rx: 105, rz: 125, y: 2.5, kind: "city" },
  { id: "west-mainland", name: "West Mainland", cx: -150, cz: -50, rx: 160, rz: 140, y: 2.5, kind: "mainland" },
  { id: "port-gellhorn", name: "Port Gellhorn", cx: -305, cz: -195, rx: 55, rz: 65, y: 2, kind: "mainland" },
  { id: "kalaga", name: "Mount Kalaga", cx: -175, cz: -400, rx: 95, rz: 95, y: 3, kind: "mountain" },
  { id: "grassrivers", name: "Grassrivers", cx: -150, cz: 255, rx: 115, rz: 80, y: 1.5, kind: "swamp" },
  { id: "key-1", name: "Keys", cx: -335, cz: 350, rx: 45, rz: 40, y: 1.5, kind: "keys" },
  { id: "key-2", name: "Keys", cx: -285, cz: 330, rx: 35, rz: 32, y: 1.5, kind: "keys" },
  { id: "key-3", name: "Keys", cx: -235, cz: 310, rx: 38, rz: 34, y: 1.5, kind: "keys" },
  { id: "key-4", name: "Keys", cx: -185, cz: 295, rx: 32, rz: 30, y: 1.5, kind: "keys" },
  { id: "key-5", name: "Keys", cx: -140, cz: 285, rx: 40, rz: 36, y: 1.5, kind: "keys" },
  { id: "key-6", name: "Keys", cx: -112, cz: 272, rx: 26, rz: 24, y: 1.5, kind: "keys" },
];

export interface ExploreRing {
  id: string;
  x: number;
  z: number;
  y: number;
  hint: string;
}

/** Golden rings to fly through — bonus collectibles scattered over water,
 * channels and one over Mount Kalaga's peak. */
export const exploreRings: ExploreRing[] = [
  { id: "r1", x: -270, z: 200, y: 14, hint: "South channel" },
  { id: "r2", x: -60, z: 205, y: 15, hint: "Keys strait" },
  { id: "r3", x: 60, z: 60, y: 20, hint: "Vice City bay" },
  { id: "r4", x: 140, z: 40, y: 24, hint: "East coast" },
  { id: "r5", x: -175, z: -400, y: 72, hint: "Kalaga summit — climb!" },
  { id: "r6", x: -330, z: -110, y: 18, hint: "West coast" },
  { id: "r7", x: -140, z: 60, y: 15, hint: "Mainland lake" },
  { id: "r8", x: -30, z: -140, y: 16, hint: "North bay" },
];

export interface ExploreStash {
  id: string;
  x: number;
  z: number;
  label: string;
}

/** Hidden supply stashes — deliberately NOT shown on the minimap or with
 * beacons. You have to actually explore to find them. */
export const exploreStashes: ExploreStash[] = [
  { id: "s1", x: -190, z: -435, label: "Kalaga backcountry" },
  { id: "s2", x: -160, z: 295, label: "Keys backwater" },
  { id: "s3", x: -150, z: 258, label: "Grassrivers deep swamp" },
  { id: "s4", x: -318, z: -215, label: "Port Gellhorn docks" },
  { id: "s5", x: 92, z: -18, label: "Vice City rooftops" },
  { id: "s6", x: -220, z: -105, label: "Raceway infield" },
];

/** Terrain height at a world position — islands get their flat top plus a
 * soft coastal falloff; Mount Kalaga rises into a peak. Water is 0. */
export function terrainHeight(x: number, z: number): number {
  let h = 0;
  for (const isl of exploreIslands) {
    const dx = (x - isl.cx) / isl.rx;
    const dz = (z - isl.cz) / isl.rz;
    const d = dx * dx + dz * dz;
    if (d >= 1) continue;
    // smooth edge falloff from 90% radius inward
    const edge = Math.min(1, (1 - d) / 0.12);
    const t = isl.y * (0.4 + 0.6 * edge);
    h = Math.max(h, t);
    if (isl.kind === "mountain") {
      const peak = Math.exp(-d * 4) * 55;
      h = Math.max(h, t + peak);
    }
  }
  return h;
}
