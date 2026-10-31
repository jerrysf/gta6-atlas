import type { Weapon } from "@/lib/types";

// Weapons marked `officially_confirmed` were named on-screen in official
// Rockstar materials (pickup prompts in the Extended Look, marketing and
// screenshots). Weapons marked `community_reported` are clearly visible in
// official footage but unnamed. No stats exist yet — damage, accuracy and
// fire-rate fields stay empty until verified in-game after Nov 19, 2026.
const OFFICIAL = {
  label: "Rockstar Games — official GTA VI footage & screenshots",
  url: "https://www.rockstargames.com/VI",
};

export const weapons: Weapon[] = [
  {
    id: "wpn-klose-k17",
    slug: "klose-k17",
    name: "Klose K17",
    category: "Handguns",
    description:
      "Lucia's signature pistol — a Glock-style sidearm named in official GTA VI materials. One of the first GTA VI weapons Rockstar has called by name.",
    basedOn: "Glock 17",
    verificationStatus: "officially_confirmed",
    sourceReferences: [OFFICIAL],
    lastVerifiedAt: "2026-10-31",
  },
  {
    id: "wpn-girardi-es9",
    slug: "girardi-es9",
    name: "Girardi ES9",
    category: "Handguns",
    description:
      "Jason's pistol, named in official materials — a Beretta-style sidearm with an engraved variant seen on his hip across screenshots and footage.",
    basedOn: "Beretta 92",
    verificationStatus: "officially_confirmed",
    sourceReferences: [OFFICIAL],
    lastVerifiedAt: "2026-10-31",
  },
  {
    id: "wpn-duke-556",
    slug: "duke-556-assault-rifle",
    name: "Duke 556 Assault Rifle",
    category: "Rifles",
    description:
      "Duke Arms Company carbine named via its on-screen pickup prompt in the Extended Look — the workhorse rifle Jason grabs during the final firefight.",
    basedOn: "AR-15 / M4 carbine",
    verificationStatus: "officially_confirmed",
    sourceReferences: [OFFICIAL],
    lastVerifiedAt: "2026-10-31",
  },
  {
    id: "wpn-moreland-850",
    slug: "moreland-850",
    name: "Moreland 850",
    category: "Shotguns",
    description:
      "Pump-action shotgun named via its on-screen pickup prompt in the Extended Look — Remington 870-style, seen in the apartment raid sequence.",
    basedOn: "pump-action shotgun",
    verificationStatus: "officially_confirmed",
    sourceReferences: [OFFICIAL],
    lastVerifiedAt: "2026-10-31",
  },
  {
    id: "wpn-hawk-little-morgan",
    slug: "hawk-little-morgan",
    name: "Hawk & Little Morgan",
    category: "Handguns",
    description:
      "A matched pair of engraved revolvers announced with the game's Ultimate Edition — a 'his and hers' set for the dual protagonists.",
    basedOn: "large-frame revolver",
    verificationStatus: "officially_confirmed",
    sourceReferences: [OFFICIAL],
    lastVerifiedAt: "2026-10-31",
  },
  {
    id: "wpn-morgan-revolver",
    slug: "morgan-revolver",
    name: "Morgan Revolver",
    category: "Handguns",
    description:
      "A long-barrel revolver named in official footage — Smith & Wesson-style wheelgun spotted across screenshots and the Extended Look.",
    basedOn: "Colt Python-style revolver",
    verificationStatus: "officially_confirmed",
    sourceReferences: [OFFICIAL],
    lastVerifiedAt: "2026-10-31",
  },
  {
    id: "wpn-mustang-357",
    slug: "mustang-357",
    name: "Mustang .357",
    category: "Handguns",
    description:
      "Colt Python-style .357 revolver named in official footage — the third wheelgun model identified by name so far.",
    basedOn: ".357 Magnum revolver",
    verificationStatus: "officially_confirmed",
    sourceReferences: [OFFICIAL],
    lastVerifiedAt: "2026-10-31",
  },
  {
    id: "wpn-nipper-38",
    slug: "nipper-38",
    name: "Nipper .38",
    category: "Handguns",
    description:
      "Compact .38-caliber handgun named in official footage — a pocket pistol in the Bersa/P228 class.",
    basedOn: ".38 snub-nose revolver",
    verificationStatus: "officially_confirmed",
    sourceReferences: [OFFICIAL],
    lastVerifiedAt: "2026-10-31",
  },
  {
    id: "wpn-capo-pistol",
    slug: "capo-pistol",
    name: "Capo Pistol",
    category: "Handguns",
    description:
      "M1911-style pistol first seen in Jason's hands at the end of the Trailer 1 liquor store robbery, and later with Raul Bautista in screenshots. Only the 'Capo' manufacturer name is confirmed — the full model name is not.",
    basedOn: "Beretta 92FS",
    verificationStatus: "community_reported",
    sourceReferences: [OFFICIAL],
    lastVerifiedAt: "2026-10-31",
  },
  {
    id: "wpn-mp5-smg",
    slug: "mp5-smg",
    name: "MP5-inspired SMG",
    category: "Submachine Guns",
    description:
      "MP5-style submachine gun used by both Lucia and Jason during the bank robbery in Trailer 2 — Jason's was fitted with a red dot sight. No official name yet.",
    basedOn: "Heckler & Koch MP5",
    verificationStatus: "community_reported",
    sourceReferences: [OFFICIAL],
    lastVerifiedAt: "2026-10-31",
  },
  {
    id: "wpn-grenade-launcher",
    slug: "grenade-launcher",
    name: "Grenade Launcher",
    category: "Heavy",
    description:
      "Cylinder-fed launcher Lucia shoulders during the Trailer 2 pursuit — the shot that sends a sedan flying past the Police Riot. No official name yet.",
    basedOn: "Milkor MGL",
    verificationStatus: "community_reported",
    sourceReferences: [OFFICIAL],
    lastVerifiedAt: "2026-10-31",
  },
  {
    id: "wpn-hunting-rifle",
    slug: "hunting-rifle",
    name: "Bolt-Action Hunting Rifle",
    category: "Sniper Rifles",
    description:
      "Remington 700-style scoped rifle carried by hunters on Mount Kalaga in official screenshots. A scoped Duke-manufactured variant also appears — names unconfirmed.",
    basedOn: "Remington 700-style bolt action",
    verificationStatus: "community_reported",
    sourceReferences: [OFFICIAL],
    lastVerifiedAt: "2026-10-31",
  },
  {
    id: "wpn-ak",
    slug: "ak-rifle",
    name: "AK-pattern Rifle",
    category: "Rifles",
    description:
      "Kalashnikov-style rifle — including a gold-plated variant — seen across official footage and the Extended Look raid. No official name yet.",
    basedOn: "AK-47",
    verificationStatus: "community_reported",
    sourceReferences: [OFFICIAL],
    lastVerifiedAt: "2026-10-31",
  },
  {
    id: "wpn-molotov",
    slug: "molotov",
    name: "Molotov",
    category: "Explosives",
    description:
      "Incendiary bottle seen in official footage. The series staple returns — throwable fire in a bottle.",
    basedOn: "improvised incendiary",
    verificationStatus: "community_reported",
    sourceReferences: [OFFICIAL],
    lastVerifiedAt: "2026-10-31",
  },
  {
    id: "wpn-melee",
    slug: "melee-weapons",
    name: "Melee Weapons",
    category: "Melee",
    description:
      "Baseball bat, hammer, pool cue, minigolf club and a switchblade-style knife all appear in official footage — Leonida's quieter problem-solvers.",
    basedOn: "bat & edged weapons",
    verificationStatus: "community_reported",
    sourceReferences: [OFFICIAL],
    lastVerifiedAt: "2026-10-31",
  },
  {
    id: "wpn-double-barrel",
    slug: "double-barreled-shotgun",
    name: "Double-Barreled Shotgun",
    category: "Shotguns",
    description:
      "Break-action side-by-side shotgun spotted in official footage — the classic short-range answer. No official name yet.",
    basedOn: "side-by-side shotgun",
    verificationStatus: "community_reported",
    sourceReferences: [OFFICIAL],
    lastVerifiedAt: "2026-10-31",
  },
  {
    id: "wpn-belt-fed",
    slug: "belt-fed-machine-gun",
    name: "Belt-Fed Machine Gun",
    category: "Heavy",
    description:
      "A squared-receiver, belt-fed machine gun seen on a shop counter in Trailer 2 — Phil's Ammu-Nation stocks the heavy stuff too. No official name yet.",
    basedOn: "M60-style machine gun",
    verificationStatus: "community_reported",
    sourceReferences: [OFFICIAL],
    lastVerifiedAt: "2026-10-31",
  },
  {
    id: "wpn-machine-pistol",
    slug: "machine-pistol",
    name: "Machine Pistol",
    category: "Submachine Guns",
    description:
      "Compact fully-automatic pistol with a long straight magazine and ported compensator, seen in official footage. No official name yet.",
    basedOn: "Micro Uzi",
    verificationStatus: "community_reported",
    sourceReferences: [OFFICIAL],
    lastVerifiedAt: "2026-10-31",
  },
  {
    id: "wpn-compensated-pistol",
    slug: "compensated-pistol",
    name: "Compensated Pistol",
    category: "Handguns",
    description:
      "Stainless pistol with a ribbed muzzle compensator and green fiber-optic sights, held by Lucia in an Extended Look frame. No official name yet.",
    basedOn: "compensated 9mm pistol",
    verificationStatus: "community_reported",
    sourceReferences: [OFFICIAL],
    lastVerifiedAt: "2026-10-31",
  },
  {
    id: "wpn-duke-sniper",
    slug: "duke-sniper-rifle",
    name: "Duke Sniper Rifle",
    category: "Sniper Rifles",
    description:
      "A Duke Arms Company-marked long rifle carried by a hunter in official screenshots — shares the Duke insignia with the 556 carbine but no model name has been shown.",
    basedOn: "designated marksman rifle",
    verificationStatus: "community_reported",
    sourceReferences: [OFFICIAL],
    lastVerifiedAt: "2026-10-31",
  },
];
