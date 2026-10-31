import type { Character } from "@/lib/types";

// Only characters officially announced by Rockstar Games (GTA VI website,
// trailers, and official screenshots) are listed here. Community-reported
// or leaked characters must not be added until verified.
const ROCKSTAR_GTA6 = {
  label: "Rockstar Games — Grand Theft Auto VI official website",
  url: "https://www.rockstargames.com/VI",
};

export const characters: Character[] = [
  {
    id: "char-lucia-caminos",
    slug: "lucia-caminos",
    name: "Lucia Caminos",
    role: "Protagonist",
    description:
      "One of the two playable protagonists of Grand Theft Auto VI. Lucia begins the story behind bars at Leonida Penitentiary, determined to fight for the better life her mother dreamed of.",
    biography:
      "Lucia Caminos grew up fighting — her father taught her to scrap from a young age. According to Rockstar's official character reveal, life handed her a string of bad luck that eventually landed her in Leonida Penitentiary. Fresh out of prison and determined to change her odds, Lucia partners with Jason Duval, and together the pair are pulled into a criminal conspiracy stretching across the state of Leonida. She is one of the two playable protagonists and the first playable female lead in a modern mainline Grand Theft Auto title.",
    verificationStatus: "officially_confirmed",
    sourceReferences: [ROCKSTAR_GTA6],
    lastVerifiedAt: "2026-10-31",
  },
  {
    id: "char-jason-duval",
    slug: "jason-duval",
    name: "Jason Duval",
    role: "Protagonist",
    description:
      "One of the two playable protagonists of Grand Theft Auto VI. Jason wants an easy life, but things keep getting harder — he works in the Leonida Keys doing jobs for local drug runners.",
    biography:
      "Jason Duval grew up around grifters and crooks and spent time in the Army before washing up in the Leonida Keys. According to Rockstar's official reveal, he does odd jobs for local drug runners out of the Keys — until he meets Lucia, and the two of them end up entangled in a conspiracy far bigger than anything he planned. He is the second of the two playable protagonists.",
    verificationStatus: "officially_confirmed",
    sourceReferences: [ROCKSTAR_GTA6],
    lastVerifiedAt: "2026-10-31",
  },
  {
    id: "char-cal-hampton",
    slug: "cal-hampton",
    name: "Cal Hampton",
    role: "Supporting character",
    description:
      "A friend of Jason's who works with drug runner Brian Heder. Cal is a conspiracy-minded homebody happiest monitoring the world from behind a screen.",
    biography:
      "Cal Hampton is one of Jason's associates in the Leonida Keys, introduced on Rockstar's official GTA VI website. He works errands for Brian Heder's smuggling operation while preferring the safety of his own home — tracking ships, planes and conspiracies. What he isn't prepared for is how deep Jason and Lucia's troubles will pull him.",
    verificationStatus: "officially_confirmed",
    sourceReferences: [ROCKSTAR_GTA6],
    lastVerifiedAt: "2026-10-31",
  },
  {
    id: "char-brian-heder",
    slug: "brian-heder",
    name: "Brian Heder",
    role: "Supporting character",
    description:
      "A Leonida Keys boat-yard owner and old-school drug runner. Brian's marina serves as a front for moving product through the Keys.",
    biography:
      "Brian Heder is a fixture of the Leonida Keys, running a boat yard and marina that doubles as a staging ground for drug smuggling, as described on Rockstar's official GTA VI website. Jason works occasional jobs for him. Brian is portrayed as a self-made smuggler who has kept the authorities guessing for years.",
    verificationStatus: "officially_confirmed",
    sourceReferences: [ROCKSTAR_GTA6],
    lastVerifiedAt: "2026-10-31",
  },
  {
    id: "char-drequan-priest",
    slug: "drequan-priest",
    name: "Dre'Quan Priest",
    role: "Supporting character",
    description:
      "A former street dealer turned music businessman running the Only Raw Records label in Vice City.",
    biography:
      "Dre'Quan Priest left the street life behind to build Only Raw Records, the label home of rap duo Real Dimez, according to Rockstar's official character profiles. Ambitious and calculating, Dre'Quan is looking for his next big move in Vice City's music scene.",
    verificationStatus: "officially_confirmed",
    sourceReferences: [ROCKSTAR_GTA6],
    lastVerifiedAt: "2026-10-31",
  },
  {
    id: "char-boobie-ike",
    slug: "boobie-ike",
    name: "Boobie Ike",
    role: "Supporting character",
    description:
      "A local Vice City legend who turned street credibility into a legitimate business empire.",
    biography:
      "Boobie Ike is described on Rockstar's official GTA VI website as a Vice City legend who converted his reputation into a business empire spanning real estate, a strip club, and a recording studio — partnering with Dre'Quan Priest on the Only Raw Records venture.",
    verificationStatus: "officially_confirmed",
    sourceReferences: [ROCKSTAR_GTA6],
    lastVerifiedAt: "2026-10-31",
  },
  {
    id: "char-raul-bautista",
    slug: "raul-bautista",
    name: "Raul Bautista",
    role: "Supporting character",
    description:
      "A professional bank robber whose biggest score is always the next one — and who is always on the lookout for new talent.",
    biography:
      "Raul Bautista is introduced on Rockstar's official GTA VI website as an experienced bank robber with a knack for recruiting. He is shown scouting for crew members willing to take on bigger, riskier scores — putting him on a collision course with the game's protagonists.",
    verificationStatus: "officially_confirmed",
    sourceReferences: [ROCKSTAR_GTA6],
    lastVerifiedAt: "2026-10-31",
  },
  {
    id: "char-phil",
    slug: "phil",
    name: "Phil",
    role: "Supporting character",
    description:
      "The face of Phil's Ammu-Nation, the returning gun-store chain — heard pitching 'more guns than the law allows' in Trailer 2's in-world ad.",
    biography:
      "Phil fronts the Ammu-Nation franchise in Leonida, delivering the gun store's gleefully lawless ad copy heard over Trailer 2's gun-shop sequence. His full name and story role haven't been detailed — for now he's the voice (and name) of Leonida's favorite place to buy more guns than the law allows.",
    verificationStatus: "community_reported",
    sourceReferences: [ROCKSTAR_GTA6],
    lastVerifiedAt: "2026-10-31",
  },
  {
    id: "char-real-dimez",
    slug: "real-dimez",
    name: "Real Dimez",
    role: "Supporting characters",
    description:
      "Rap duo Bae-Luxe and Roxy — best friends turned Vice City rap stars, signed to Only Raw Records.",
    biography:
      "Real Dimez is the stage name of duo Bae-Luxe and Roxy, childhood friends who turned raw street lyricism into chart success, per Rockstar's official character profiles. Signed to Dre'Quan Priest's Only Raw Records, they are chasing their next hit and whatever comes with Vice City fame.",
    verificationStatus: "officially_confirmed",
    sourceReferences: [ROCKSTAR_GTA6],
    lastVerifiedAt: "2026-10-31",
  },
];
