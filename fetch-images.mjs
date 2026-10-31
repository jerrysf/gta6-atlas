// Resolve GTA Wiki page images for each entity slug via the MediaWiki API.
// Output: image-map.json { slug: { url, wikiTitle } }
const CANDIDATES = {
  // vehicles
  "vapid-caracara": ["Caracara"],
  "maibatsu-penumbra": ["Penumbra"],
  "invetero-coquette": ["Coquette"],
  "bravado-banshee": ["Banshee"],
  "emperor-vectre": ["Vectre"],
  "pfister-growler": ["Growler"],
  "imponte-phoenix": ["Phoenix"],
  "bravado-gauntlet-hellfire": ["Gauntlet Hellfire"],
  "bravado-buffalo-stx": ["Buffalo STX"],
  "dundreary-landstalker-xl": ["Landstalker XL"],
  "pfister-astron": ["Astron"],
  "brute-police-riot": ["Police Riot", "Riot"],
  "mtl-packer": ["Packer"],
  "lcc-avarus": ["Avarus"],
  "western-zombie-chopper": ["Zombie", "Zombie Chopper"],
  "maibatsu-sanchez": ["Sanchez"],
  "speedophile-seashark": ["Seashark"],
  "dinka-marquis": ["Marquis"],
  "nagasaki-dinghy": ["Dinghy"],
  "airboat": ["Airboat"],
  "nagasaki-buzzard": ["Buzzard Attack Chopper"],
  "police-maverick": ["Police Maverick", "Maverick"],
  "dodo": ["Dodo"],
  "jet": ["Jet"],
  "vapid-ranchero-ute": ["Ranchero"],
  "albany-classic": ["Hermes"],
  "declasse-rancher": ["Rancher"],
  "bravado-bison": ["Bison"],
  "vapid-aleutian": ["Aleutian"],
  "declasse-granger": ["Granger"],
  "vapid-montagne": ["Mule"],
  "emperor-police-cruiser": ["Police Cruiser", "Police Car"],
  "schafter-style-sedan": ["Schafter"],
  "pegassi-tempesta": ["Tempesta"],
  "reatta-style-convertible": ["Reatta"],
  "cle-style-convertible": ["CLE"],
  "vcmm-metro-train": ["Metro Train", "Freight Train"],
  "lowrider": ["Voodoo"],
  "vapid-suv": ["Radius", "Vapid SUV"],
  // weapons
  "klose-k17": ["Klose K17"],
  "girardi-es9": ["Girardi ES9"],
  "duke-556-assault-rifle": ["Duke 556 Assault Rifle", "Duke 556"],
  "moreland-850": ["Moreland 850"],
  "hawk-little-morgan": ["Hawk & Little Morgan"],
  "morgan-revolver": ["Morgan Revolver"],
  "mustang-357": ["Mustang .357"],
  "nipper-38": ["Nipper .38"],
  "capo-pistol": ["Capo"],
  "mp5-smg": ["SMG", "MP 5"],
  "grenade-launcher": ["Grenade Launcher"],
  "hunting-rifle": ["Hunting Rifle", "Sniper Rifle"],
  "ak-rifle": ["Assault Rifle"],
  "molotov": ["Molotov Cocktails", "Molotov"],
  "melee-weapons": ["Melee Weapons"],
  "double-barreled-shotgun": ["Double Barrel Shotgun"],
  "belt-fed-machine-gun": ["Combat MG", "Machine Gun"],
  "machine-pistol": ["Machine Pistol"],
  "compensated-pistol": ["Combat Pistol", "Pistol"],
  "duke-sniper-rifle": ["Duke Sniper Rifle"],
  // characters
  "lucia-caminos": ["Lucia Caminos"],
  "jason-duval": ["Jason Duval"],
  "cal-hampton": ["Cal Hampton"],
  "brian-heder": ["Brian Heder"],
  "drequan-priest": ["Dre'Quan Priest"],
  "boobie-ike": ["Boobie Ike"],
  "raul-bautista": ["Raul Bautista"],
  "phil": ["Phil (GTA VI)", "Phil's Ammu-Nation"],
  "real-dimez": ["Real Dimez"],
  // locations
  "leonida": ["Leonida"],
  "vice-city": ["Vice City (HD Universe)", "Vice City"],
  "leonida-keys": ["Leonida Keys"],
  "grassrivers": ["Grassrivers"],
  "port-gellhorn": ["Port Gellhorn"],
  "ambrosia": ["Ambrosia"],
  "mount-kalaga": ["Mount Kalaga National Park", "Mount Kalaga"],
  "leonida-penitentiary": ["Leonida Penitentiary"],
  "vice-beach": ["Vice Beach"],
  "brians-boat-works": ["Brian's Boat Works & Marina", "Brian's Boat Works"],
  "starlet-motel": ["Starlet Motel"],
  "hanks-waffles": ["Hank's Waffles"],
  "phils-ammu-nation": ["Phil's Ammu-Nation"],
  "jack-of-hearts": ["Jack of Hearts"],
  "dreamier-hotel": ["Dreamier Hotel"],
  "ocean-view-hotel": ["Ocean View Hotel"],
  "allied-crystal": ["Allied Crystal Sugar Refinery", "Allied Crystal"],
  "port-of-vice-city": ["Port of Vice City", "PortViceCity"],
};

const allTitles = [...new Set(Object.values(CANDIDATES).flat())];
const titleToThumb = {};

for (let i = 0; i < allTitles.length; i += 40) {
  const batch = allTitles.slice(i, i + 40);
  const params = new URLSearchParams({
    action: "query",
    titles: batch.join("|"),
    prop: "pageimages",
    pithumbsize: "800",
    redirects: "1",
    format: "json",
    origin: "*",
  });
  const res = await fetch(`https://gta.fandom.com/api.php?${params}`, {
    headers: { "User-Agent": "GTA6AtlasBot/1.0 (fan site image lookup)" },
  });
  const data = await res.json();
  const normalized = {};
  (data.query?.normalized ?? []).forEach((n) => (normalized[n.to] = n.from));
  (data.query?.redirects ?? []).forEach((r) => (normalized[r.to] = normalized[r.from] ?? r.from));
  const byTitle = {};
  Object.values(data.query.pages).forEach((p) => {
    if (p.thumbnail?.source) byTitle[p.title] = p.thumbnail.source;
  });
  for (const t of batch) {
    // find which returned title corresponds to our requested title
    const hit =
      byTitle[t] ??
      Object.entries(byTitle).find(([title]) => normalized[title] === t)?.[1];
    if (hit) titleToThumb[t] = hit;
  }
}

const map = {};
for (const [slug, titles] of Object.entries(CANDIDATES)) {
  for (const t of titles) {
    if (titleToThumb[t]) {
      map[slug] = { url: titleToThumb[t], wikiTitle: t };
      break;
    }
  }
}
console.log(JSON.stringify(map, null, 2));
console.error(`resolved ${Object.keys(map).length}/${Object.keys(CANDIDATES).length}`);
