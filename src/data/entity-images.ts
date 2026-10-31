/**
 * Entity images hotlinked from GTA Wiki (gta.fandom.com) — images stay on
 * Fandom's CDN; nothing is copied into this repo. Each entry carries a
 * caption stating exactly what the image shows, so GTA V/Online renders
 * used as reference are never mistaken for confirmed GTA VI visuals.
 */
export interface EntityImage {
  url: string;
  caption: string;
}

const W = "https://static.wikia.nocookie.net/gtawiki/images";
const VI = "Official GTA VI media";
const REF = "Reference render of the same model in GTA V/Online — the GTA VI version may look different";

export const entityImages: Record<string, EntityImage> = {
  /* ------------------------------ Characters ----------------------------- */
  "lucia-caminos": {
    url: `${W}/2/2a/LuciaCaminos-GTAVI-Portrait.png/revision/latest/scale-to-width-down/800?cb=20250506145927`,
    caption: `${VI} — official character portrait`,
  },
  "jason-duval": {
    url: `${W}/d/de/JasonDuval-GTAVI-Portrait.png/revision/latest/scale-to-width-down/800?cb=20250506145706`,
    caption: `${VI} — official character portrait`,
  },
  "cal-hampton": {
    url: `${W}/2/2a/CalHampton-GTAVI-Portrait.png/revision/latest/scale-to-width-down/800?cb=20250506151414`,
    caption: `${VI} — official character portrait`,
  },
  "brian-heder": {
    url: `${W}/b/b8/BrianHeder-GTAVI-Portrait.png/revision/latest/scale-to-width-down/800?cb=20250506151410`,
    caption: `${VI} — official character portrait`,
  },
  "drequan-priest": {
    url: `${W}/e/e6/DreQuanPriest-GTAVI-Portrait.png/revision/latest/scale-to-width-down/800?cb=20250506151418`,
    caption: `${VI} — official character portrait`,
  },
  "boobie-ike": {
    url: `${W}/1/16/BoobieIke-GTAVI-Portrait.png/revision/latest/scale-to-width-down/800?cb=20250506151417`,
    caption: `${VI} — official character portrait`,
  },
  "raul-bautista": {
    url: `${W}/3/39/RaulBautista-GTAVI-Portrait.png/revision/latest/scale-to-width-down/800?cb=20250506151424`,
    caption: `${VI} — official character portrait`,
  },
  "real-dimez": {
    url: `${W}/f/f4/RealDimez-GTAVI-Portrait.png/revision/latest/scale-to-width-down/800?cb=20250506154511`,
    caption: `${VI} — official character portrait`,
  },
  phil: {
    url: `${W}/f/fa/Phil-GTAVI-Portrait.png/revision/latest?cb=20250721095103`,
    caption: `${VI} — official character portrait`,
  },

  /* ------------------------------- Vehicles ------------------------------ */
  "vapid-caracara": {
    url: `${W}/1/17/Caracara-GTAO-front.png/revision/latest/scale-to-width-down/800?cb=20190823173205`,
    caption: REF,
  },
  "maibatsu-penumbra": {
    url: `${W}/f/ff/Penumbra-GTAVe-front.png/revision/latest/scale-to-width-down/800?cb=20230623151708`,
    caption: REF,
  },
  "invetero-coquette": {
    url: `${W}/3/34/Coquette-GTAVee-FrontQuarter.png/revision/latest/scale-to-width-down/800?cb=20251011172025`,
    caption: REF,
  },
  "bravado-banshee": {
    url: `${W}/6/64/Banshee-GTAVI-Trailer2.png/revision/latest?cb=20250506212454`,
    caption: `${VI} — Trailer 2 screenshot`,
  },
  "emperor-vectre": {
    url: `${W}/8/8a/Vectre-GTAO-front.png/revision/latest/scale-to-width-down/800?cb=20210720164526`,
    caption: REF,
  },
  "pfister-growler": {
    url: `${W}/9/9c/Growler-GTAOee-FrontQuarter.png/revision/latest/scale-to-width-down/800?cb=20251025212601`,
    caption: REF,
  },
  "imponte-phoenix": {
    url: `${W}/a/af/Phoenix-GTAV-front.png/revision/latest/scale-to-width-down/800?cb=20160304230504`,
    caption: REF,
  },
  "bravado-gauntlet-hellfire": {
    url: `${W}/6/6e/GauntletHellfire-GTAOee-FrontQuarter.png/revision/latest/scale-to-width-down/800?cb=20260115103149`,
    caption: REF,
  },
  "bravado-buffalo-stx": {
    url: `${W}/c/ce/BuffaloSTX-GTAOee-FrontQuarter.png/revision/latest/scale-to-width-down/800?cb=20251024132650`,
    caption: REF,
  },
  "dundreary-landstalker-xl": {
    url: `${W}/1/1b/LandstalkerXL-GTAO-front.png/revision/latest/scale-to-width-down/800?cb=20200811143139`,
    caption: REF,
  },
  "pfister-astron": {
    url: `${W}/3/3e/Astron-GTAOe-front.png/revision/latest/scale-to-width-down/800?cb=20211223020232`,
    caption: REF,
  },
  "brute-police-riot": {
    url: `${W}/1/16/PoliceRiot-GTAV-front.png/revision/latest/scale-to-width-down/800?cb=20241019170113`,
    caption: REF,
  },
  "mtl-packer": {
    url: `${W}/6/68/Packer-GTAV-front.png/revision/latest/scale-to-width-down/800?cb=20230217192026`,
    caption: REF,
  },
  "lcc-avarus": {
    url: `${W}/1/1a/Avarus-GTAO-front.png/revision/latest/scale-to-width-down/800?cb=20161014164948`,
    caption: REF,
  },
  "western-zombie-chopper": {
    url: `${W}/7/70/ZombieChopper-GTAO-front.png/revision/latest/scale-to-width-down/800?cb=20161004181804`,
    caption: REF,
  },
  "maibatsu-sanchez": {
    url: `${W}/0/0a/Sanchez-GTAVI-Trailer1.png/revision/latest/scale-to-width-down/800?cb=20250923002752`,
    caption: `${VI} — Trailer 1 screenshot`,
  },
  "speedophile-seashark": {
    url: `${W}/6/60/Seashark-GTAV-front.png/revision/latest/scale-to-width-down/800?cb=20160410145815`,
    caption: REF,
  },
  "dinka-marquis": {
    url: `${W}/2/22/Marquis-GTAV-front.png/revision/latest/scale-to-width-down/800?cb=20160410145220`,
    caption: REF,
  },
  "nagasaki-dinghy": {
    url: `${W}/b/b6/Dinghy-GTAV-front.png/revision/latest/scale-to-width-down/800?cb=20170723192359`,
    caption: REF,
  },
  "nagasaki-buzzard": {
    url: `${W}/d/d1/BuzzardAttackChopper-GTAV-front.png/revision/latest/scale-to-width-down/800?cb=20250814173031`,
    caption: REF,
  },
  "police-maverick": {
    url: `${W}/5/50/PoliceMaverick-GTAV-front.png/revision/latest/scale-to-width-down/800?cb=20250814173156`,
    caption: REF,
  },
  dodo: {
    url: `${W}/d/df/Dodo-GTAVI-OfficialScreenshot-LeonidaKeys01.png/revision/latest/scale-to-width-down/800?cb=20250508205843`,
    caption: `${VI} — official screenshot over the Leonida Keys`,
  },
  jet: {
    url: `${W}/e/ed/Jet-GTAV-front.png/revision/latest/scale-to-width-down/800?cb=20230216195549`,
    caption: REF,
  },
  "vapid-ranchero-ute": {
    url: `${W}/c/cd/Rat-Loader-GTAV-front.png/revision/latest/scale-to-width-down/800?cb=20160304220227`,
    caption: "Closest GTA Online equivalent (Rat-Loader ute) — the GTA VI vehicle may look different",
  },
  "albany-classic": {
    url: `${W}/9/9b/Hermes-GTAO-front.png/revision/latest/scale-to-width-down/800?cb=20190625095208`,
    caption: "Closest GTA Online equivalent (Hermes) — the GTA VI vehicle may look different",
  },
  "declasse-rancher": {
    url: `${W}/4/48/Rancher-GTAIV-front.png/revision/latest/scale-to-width-down/800?cb=20170223191804`,
    caption: "Reference render of the same model in GTA IV — the GTA VI version may look different",
  },
  "bravado-bison": {
    url: `${W}/6/69/Bison-GTAV-front.png/revision/latest/scale-to-width-down/800?cb=20160406172803`,
    caption: REF,
  },
  "vapid-aleutian": {
    url: `${W}/a/af/Aleutian-GTAOe-front.png/revision/latest/scale-to-width-down/800?cb=20241114210901`,
    caption: REF,
  },
  "declasse-granger": {
    url: `${W}/6/6c/Granger-GTAVe-FrontQuarter.png/revision/latest/scale-to-width-down/800?cb=20250208193143`,
    caption: REF,
  },
  "vapid-montagne": {
    url: `${W}/b/b6/Radius-GTAV-front.png/revision/latest/scale-to-width-down/800?cb=20160409181754`,
    caption: "Closest GTA Online equivalent (Radius SUV) — the GTA VI vehicle may look different",
  },
  "emperor-police-cruiser": {
    url: `${W}/b/bd/PoliceCruiser-GTAV-front.png/revision/latest/scale-to-width-down/800?cb=20160311203102`,
    caption: REF,
  },
  "schafter-style-sedan": {
    url: `${W}/6/6d/Schafter-GTAIV-front.png/revision/latest/scale-to-width-down/800?cb=20170122142823`,
    caption: "Reference render of the same model in GTA IV — the GTA VI version may look different",
  },
  "pegassi-tempesta": {
    url: `${W}/f/f1/Tempesta-GTAOee-FrontQuarter.png/revision/latest/scale-to-width-down/800?cb=20251002012902`,
    caption: REF,
  },
  "vcmm-metro-train": {
    url: `${W}/f/f4/FreightTrain-GTAVe-front.png/revision/latest/scale-to-width-down/800?cb=20240121152533`,
    caption: "Reference render of a GTA V train — the Leonida metro train may look different",
  },
  lowrider: {
    url: `${W}/1/15/Voodoo-GTAV-front.png/revision/latest/scale-to-width-down/800?cb=20160929171018`,
    caption: "Closest GTA Online equivalent (Voodoo lowrider) — the GTA VI vehicle may look different",
  },
  "vapid-suv": {
    url: `${W}/b/b6/Radius-GTAV-front.png/revision/latest/scale-to-width-down/800?cb=20160409181754`,
    caption: "Closest GTA Online equivalent (Radius SUV) — the GTA VI vehicle may look different",
  },

  /* ------------------------------- Weapons ------------------------------- */
  "klose-k17": {
    url: `${W}/7/7f/PolymerPistol-GTAVI-OfficialScreenshot-BoobieIke01.png/revision/latest?cb=20250815214448`,
    caption: `${VI} — polymer pistol believed to be the K17 (unconfirmed)`,
  },
  "girardi-es9": {
    url: `${W}/f/f8/UnnamedBeretta92FSPistol-GTAVI-OfficialScreenshot-JasonDuval02.png/revision/latest/scale-to-width-down/800?cb=20250815205329`,
    caption: `${VI} — Beretta-style pistol believed to be the ES9 (unconfirmed)`,
  },
  "duke-556-assault-rifle": {
    url: `${W}/9/90/UnnamedDukeSpecialOpsCarbine-GTAVI-Videos-RaulBautista.png/revision/latest/scale-to-width-down/800?cb=20250828011308`,
    caption: `${VI} — Duke carbine believed to be the 556 (unconfirmed)`,
  },
  "mustang-357": {
    url: `${W}/c/c8/Mustang357-GTAVI-OfficialScreenshot-Ambrosia03.png/revision/latest/scale-to-width-down/800?cb=20250815183522`,
    caption: `${VI} — official screenshot`,
  },
  "nipper-38": {
    url: `${W}/7/75/UnnamedBersaThunder380Pistol-GTAVI-Videos-LuciaJasonTrunk.png/revision/latest?cb=20250815194839`,
    caption: `${VI} — compact pistol believed to be the Nipper (unconfirmed)`,
  },
  "capo-pistol": {
    url: `${W}/8/80/UnnamedCapoPistol-GTAVI-OfficialScreenshot-RaulBautista02.png/revision/latest/scale-to-width-down/800?cb=20250815193115`,
    caption: `${VI} — official screenshot`,
  },
  "mp5-smg": {
    url: `${W}/7/74/UnnamedHecklerKochMP540SubmachineGun-GTAVI-Trailer2.png/revision/latest/scale-to-width-down/800?cb=20250815220531`,
    caption: `${VI} — Trailer 2 screenshot`,
  },
  "grenade-launcher": {
    url: `${W}/2/2a/GrenadeLauncher-GTAVI-Trailer2.png/revision/latest/scale-to-width-down/800?cb=20250920212840`,
    caption: `${VI} — Trailer 2 screenshot`,
  },
  "hunting-rifle": {
    url: `${W}/e/e8/BoltActionSniper-GTAVI-OfficialScreenshot-MountKalagaNationalPark03.jpeg/revision/latest?cb=20250914144431`,
    caption: `${VI} — official screenshot`,
  },
  "ak-rifle": {
    url: `${W}/3/3e/AssaultRifle-GTAVee.png/revision/latest/scale-to-width-down/800?cb=20250619181541`,
    caption: "Reference render of a GTA V AK-pattern rifle — the GTA VI model may look different",
  },
  molotov: {
    url: `${W}/4/4d/MolotovCocktail-GTAVee.png/revision/latest/scale-to-width-down/800?cb=20250619221642`,
    caption: "Reference render of the GTA V Molotov — the GTA VI model may look different",
  },
  "melee-weapons": {
    url: `${W}/a/ac/BaseballBat-GTAVI-OfficialScreenshot-PortGellhorn02.png/revision/latest/scale-to-width-down/800?cb=20250829140925`,
    caption: `${VI} — official screenshot`,
  },
  "double-barreled-shotgun": {
    url: `${W}/5/5d/UnnamedDoubleBarreledShotgun-GTAVI-OfficialScreenshot-Grassrivers03.png/revision/latest?cb=20250828001612`,
    caption: `${VI} — official screenshot`,
  },
  "belt-fed-machine-gun": {
    url: `${W}/c/c1/CombatMG-GTAVee.png/revision/latest/scale-to-width-down/800?cb=20250619181433`,
    caption: "Reference render of a GTA V belt-fed MG — the GTA VI model may look different",
  },
  "machine-pistol": {
    url: `${W}/7/7b/MachinePistol-GTAVee.png/revision/latest/scale-to-width-down/800?cb=20250619181439`,
    caption: "Reference render of a GTA V machine pistol — the GTA VI model may look different",
  },
  "compensated-pistol": {
    url: `${W}/1/17/Pistol-GTAVI-Trailer1Artwork.jpg/revision/latest?cb=20250816021143`,
    caption: `${VI} — Trailer 1 key art detail`,
  },
  "duke-sniper-rifle": {
    url: `${W}/f/ff/UnnamedDukeAssaultSniperRifle-GTAVI-OfficialScreenshot-Grassrivers01.png/revision/latest/scale-to-width-down/800?cb=20250828004135`,
    caption: `${VI} — official screenshot`,
  },

  /* ------------------------------- Locations ----------------------------- */
  leonida: {
    url: `${W}/8/89/LeonidaStateFlag-GTAVI-RockstarWebsiteCinematic.png/revision/latest?cb=20250506203041`,
    caption: `${VI} — the Leonida state flag`,
  },
  "vice-city": {
    url: `${W}/2/26/ViceCity-GTAVI-Montage.jpg/revision/latest/scale-to-width-down/569?cb=20250509052851`,
    caption: `${VI} — official montage`,
  },
  "leonida-keys": {
    url: `${W}/5/59/LeonidaKeys-GTAVI-CroppedPostcard.png/revision/latest/scale-to-width-down/800?cb=20250507043056`,
    caption: `${VI} — official postcard art`,
  },
  grassrivers: {
    url: `${W}/d/d3/Grassrivers-GTAVI-CroppedPostcard.png/revision/latest/scale-to-width-down/800?cb=20250507043042`,
    caption: `${VI} — official postcard art`,
  },
  "port-gellhorn": {
    url: `${W}/9/9f/PortGellhorn-GTAVI-CroppedPostcard.png/revision/latest/scale-to-width-down/800?cb=20250507043050`,
    caption: `${VI} — official postcard art`,
  },
  ambrosia: {
    url: `${W}/6/60/Ambrosia-GTAVI-CroppedPostcard.png/revision/latest/scale-to-width-down/800?cb=20250507043048`,
    caption: `${VI} — official postcard art`,
  },
  "mount-kalaga": {
    url: `${W}/1/1e/MountKalaga-GTAVI-CroppedPostcard.png/revision/latest/scale-to-width-down/800?cb=20250507043045`,
    caption: `${VI} — official postcard art`,
  },
  "leonida-penitentiary": {
    url: `${W}/4/46/LeonidaDepartmentofCorrection-GTAVI-Trailer1.png/revision/latest/scale-to-width-down/800?cb=20241019122012`,
    caption: `${VI} — Trailer 1 screenshot`,
  },
  "vice-beach": {
    url: `${W}/7/7b/ViceBeach-GTAVI-Trailer1.png/revision/latest/scale-to-width-down/800?cb=20231206200047`,
    caption: `${VI} — Trailer 1 screenshot`,
  },
  "brians-boat-works": {
    url: `${W}/1/13/Brian%27s_boat_works_and_marina_.png/revision/latest/scale-to-width-down/800?cb=20261015144657`,
    caption: `${VI} — official media`,
  },
  "starlet-motel": {
    url: `${W}/0/0d/OfficialScreenshots-GTAVI-PromotionalWebsite-PortGellhorn-SS1.jpg/revision/latest/scale-to-width-down/800?cb=20250506164248`,
    caption: `${VI} — official screenshot`,
  },
  "hanks-waffles": {
    url: `${W}/d/d0/GTAVI-Hanks-Waffles-logo.jpg/revision/latest/scale-to-width-down/800?cb=20260924120731`,
    caption: `${VI} — official logo`,
  },
  "phils-ammu-nation": {
    url: `${W}/c/cc/Ammu-Nation-GTACW.png/revision/latest?cb=20100402065704`,
    caption: "Ammu-Nation brand logo — Phil's storefront appears in the GTA VI Ammu-Nation ad",
  },
  "jack-of-hearts": {
    url: `${W}/f/fd/JackofHearts-GTAVI-Logo-OfficialScreenshot-BoobieIke04.png/revision/latest/scale-to-width-down/800?cb=20250509112212`,
    caption: `${VI} — official screenshot`,
  },
  "dominion-hotel": {
    url: `${W}/7/78/DominionHotel-GTAVI-Trailer2.png/revision/latest/scale-to-width-down/800?cb=20250516045009`,
    caption: `${VI} — Trailer 2 screenshot`,
  },
  "ocean-view-hotel": {
    url: `${W}/4/4f/Artwork-RealDimezBG-GTAVI.png/revision/latest/scale-to-width-down/800?cb=20250813100554`,
    caption: `${VI} — Ocean View Hotel appears in the Real Dimez key art`,
  },
  "allied-crystal-refinery": {
    url: `${W}/f/f3/AlliedCrystalSugarRefinery-GTAVI-AmbrosiaPostcardVideo.png/revision/latest/scale-to-width-down/800?cb=20250821091245`,
    caption: `${VI} — official postcard video still`,
  },
  "port-of-vice-city": {
    url: `${W}/b/b1/GTAVITrailer-GTAVI-SS12.png/revision/latest/scale-to-width-down/800?cb=20231206020448`,
    caption: `${VI} — Trailer 1 screenshot`,
  },

  /* ------------------------------ Collectibles ---------------------------- */
  "gator-in-the-store": {
    url: `${W}/5/58/Alligator-GTAVI-SecurityCameraFootage-Trailer1.png/revision/latest/scale-to-width-down/800?cb=20250925063416`,
    caption: `${VI} — Trailer 1 security-camera footage`,
  },
  "leonida-lottery": {
    url: `${W}/6/6d/LeonidaLottery-GTAVI-Trailer2.png/revision/latest?cb=20250828071442`,
    caption: `${VI} — Trailer 2 screenshot`,
  },
  "patriot-beer": {
    url: `${W}/3/3c/PatriotBeer-GTAIV-Logo.png/revision/latest?cb=20150427122951`,
    caption: "Patriot Beer logo from GTA IV — the brand returns in GTA VI",
  },
  "phils-ammu-nation-ad": {
    url: `${W}/f/fa/Phil-GTAVI-Portrait.png/revision/latest?cb=20250721095103`,
    caption: `${VI} — Phil, star of the in-world Ammu-Nation ad`,
  },
  "ocean-view-callback": {
    url: `${W}/4/4f/Artwork-RealDimezBG-GTAVI.png/revision/latest/scale-to-width-down/800?cb=20250813100554`,
    caption: `${VI} — Ocean View Hotel in the Real Dimez key art`,
  },

  /* ------------------------- Additional vehicles ------------------------- */
  "golf-cart": {
    url: `${W}/0/0e/Caddy-GTAV-front.png/revision/latest/scale-to-width-down/800?cb=20161018175900`,
    caption: "Reference render of the Caddy golf cart in GTA V — the GTA VI version may look different",
  },
  "ambulance": {
    url: `${W}/e/ee/Ambulance-GTAV-front-LSMC.png/revision/latest/scale-to-width-down/800?cb=20160116221217`,
    caption: REF,
  },
  "transit-bus": {
    url: `${W}/9/93/Bus-GTAV-front.png/revision/latest/scale-to-width-down/800?cb=20180331183551`,
    caption: REF,
  },
  "vice-city-taxi": {
    url: `${W}/f/f6/Taxi-GTAVe-front.png/revision/latest/scale-to-width-down/800?cb=20230119194740`,
    caption: REF,
  },
  "beach-cruiser-bicycle": {
    url: `${W}/f/f7/MountainBike-GTASA-front.jpg/revision/latest/scale-to-width-down/800?cb=20230619200858`,
    caption: "Reference render of a bicycle in GTA San Andreas — the GTA VI version may look different",
  },

  /* ------------------------- Additional weapons -------------------------- */
  "morgan-revolver": {
    url: `${W}/7/7e/DoubleActionRevolver-GTAOee.png/revision/latest/scale-to-width-down/800?cb=20250619123623`,
    caption: "Reference render of the Double-Action Revolver in GTA Online — the engraved Morgan pair may look different",
  },

  /* ------------------------- Additional locations ------------------------ */
  "crosstown": {
    url: `${W}/6/64/GTAVITrailer-GTAVI-SS26.png/revision/latest/scale-to-width-down/800?cb=20231206020911`,
    caption: `${VI} — Trailer 1 screenshot`,
  },
  "effluvia": {
    url: `${W}/a/af/GTAVI-Effluvia-Sign.jpg/revision/latest/scale-to-width-down/800?cb=20260924113447`,
    caption: `${VI} — Effluvia town sign`,
  },
  "key-lento": {
    url: `${W}/c/cd/KeyLento-GTAVI-Trailer2.png/revision/latest/scale-to-width-down/800?cb=20250516033700`,
    caption: `${VI} — Trailer 2 screenshot`,
  },
  "tequesta-condos": {
    url: `${W}/4/45/GTAVITrailer-GTAVI-SS8.png/revision/latest/scale-to-width-down/800?cb=20231206020308`,
    caption: `${VI} — Trailer 1 screenshot`,
  },
  "stockyard-car-meet": {
    url: `${W}/6/6f/Stockyard-GTAVI-Trailer1.png/revision/latest/scale-to-width-down/800?cb=20250826012138`,
    caption: `${VI} — Trailer 1 screenshot`,
  },
  "sinfrontera-national-bank": {
    url: `${W}/8/83/SinfronteraNationalBank-GTAVI-Trailer2-Logo.png/revision/latest?cb=20250812034513`,
    caption: `${VI} — bank logo from Trailer 2`,
  },
  "thrillbilly-mud-club": {
    url: `${W}/1/15/ThrillbillyMudClub-GTAVI-Trailer1Logo.png/revision/latest/scale-to-width-down/800?cb=20231205175335`,
    caption: `${VI} — Thrillbilly Mud Club logo from Trailer 1`,
  },
  "venetian-islands": {
    url: `${W}/9/9d/GTAVITrailer-GTAVI-SS17.png/revision/latest/scale-to-width-down/800?cb=20231206020623`,
    caption: `${VI} — Rialto Islands frame from Trailer 1`,
  },
  "vice-city-international-airport": {
    url: `${W}/f/f1/GTAVITrailer-GTAVI-SS22.png/revision/latest/scale-to-width-down/800?cb=20231206020843`,
    caption: `${VI} — Trailer 1 screenshot`,
  },
  "gloriana-key": {
    url: `${W}/b/b3/Gloriana-GTAVI-PlateMontage.png/revision/latest/scale-to-width-down/800?cb=20250507212831`,
    caption: `${VI} — State of Gloriana license-plate montage`,
  },
  "megamundo": {
    url: `${W}/5/50/Mega-Noticias-GTAVI-Logo-Trailer1.png/revision/latest?cb=20231205093735`,
    caption: `${VI} — Megamundo logo seen in Trailer 1`,
  },
  "fleeca-bank": {
    url: `${W}/b/bd/Fleeca-GTAV-Logo.png/revision/latest/scale-to-width-down/800?cb=20151005150527`,
    caption: "Fleeca logo from GTA V — the brand returns in GTA VI's trailers",
  },

  /* ------------------------------- Wildlife ------------------------------ */
  "american-alligator": {
    url: `${W}/5/58/Alligator-GTAVI-SecurityCameraFootage-Trailer1.png/revision/latest/scale-to-width-down/800?cb=20250925063416`,
    caption: `${VI} — security-camera footage in Trailer 1`,
  },
  "flamingo": {
    url: `${W}/8/8a/GTAVITrailer-GTAVI-SS10.png/revision/latest/scale-to-width-down/800?cb=20231206020323`,
    caption: `${VI} — Trailer 1 screenshot`,
  },
  "green-iguana": {
    url: `${W}/9/94/Iguana-GTAVI.png/revision/latest/scale-to-width-down/800?cb=20250509032118`,
    caption: `${VI} — official screenshot`,
  },
  "raccoon": {
    url: `${W}/e/e9/Raccoon-GTAVI.png/revision/latest?cb=20250509052914`,
    caption: `${VI} — official screenshot`,
  },
  "white-tailed-deer": {
    url: `${W}/c/c2/Deer-GTAV.png/revision/latest?cb=20191125223938`,
    caption: "Reference render of a deer in GTA V — the GTA VI version may look different",
  },
  "bottlenose-dolphin": {
    url: `${W}/1/12/Dolphin-GTAV.jpg/revision/latest/scale-to-width-down/800?cb=20191127215043`,
    caption: "Reference image of a dolphin in GTA V — the GTA VI version may look different",
  },
  "domestic-dog": {
    url: `${W}/3/3f/Labrador-GTAV.png/revision/latest?cb=20191127213701`,
    caption: "Reference render of a dog in GTA V — GTA VI dog breeds are unconfirmed",
  },

  /* ------------------------- Additional collectibles --------------------- */
  "gator-in-the-pool": {
    url: `${W}/5/58/Alligator-GTAVI-SecurityCameraFootage-Trailer1.png/revision/latest/scale-to-width-down/800?cb=20250925063416`,
    caption: `${VI} — Trailer 1 security-camera footage`,
  },

  /* ------------------------------- Music --------------------------------- */
  "flower-in-a-hurricane": {
    url: "https://i.ytimg.com/vi/rz1B4B2yBZY/maxresdefault.jpg",
    caption: `${VI} — Launch Trailer thumbnail (the track debuted in this video)`,
  },
  "love-is-a-long-road": {
    url: "https://i.ytimg.com/vi/QdBZY2fkU-0/maxresdefault.jpg",
    caption: `${VI} — Trailer 1 thumbnail (the track debuted in this video)`,
  },
  "hot-together": {
    url: "https://i.ytimg.com/vi/VQRLujxTm3c/maxresdefault.jpg",
    caption: `${VI} — Trailer 2 thumbnail (the track debuted in this video)`,
  },
};
