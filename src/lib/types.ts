export type VerificationStatus =
  | "officially_confirmed"
  | "gameplay_verified"
  | "community_reported"
  | "unverified";

export interface SourceReference {
  label: string;
  url: string;
}

interface BaseEntity {
  id: string;
  slug: string;
  name: string;
  description: string;
  image?: string;
  verificationStatus: VerificationStatus;
  sourceReferences: SourceReference[];
  lastVerifiedAt?: string;
}

export type VehicleCategory =
  | "cars"
  | "motorcycles"
  | "boats"
  | "aircraft"
  | "other";

export interface Vehicle extends BaseEntity {
  category: VehicleCategory;
  manufacturer?: string;
  /** Real-life vehicle the design is based on (community-documented). */
  basedOn?: string;
  /** Whether the model is new to the series or returns from an earlier GTA. */
  debut?: "new" | "returning";
  performance?: {
    topSpeed?: number;
    acceleration?: number;
    braking?: number;
    handling?: number;
  };
  location?: string;
  acquisition?: string;
}

export interface Weapon extends BaseEntity {
  category: string;
  /** Real-world firearm the design is based on (community-documented). */
  basedOn?: string;
  damage?: number;
  accuracy?: number;
  fireRate?: number;
  acquisition?: string;
}

export interface Character extends BaseEntity {
  role: string;
  biography: string;
  relatedMissions?: string[];
}

export interface GameLocation extends BaseEntity {
  region: string;
  relatedMissions?: string[];
  coordinates?: { x: number; y: number };
  /** Map layer to display on; community-estimated positions only. */
  mapCategory?: "location" | "poi" | "safehouse";
}

export type CollectibleCategory = "collectible" | "secret";

export interface Collectible extends BaseEntity {
  kind: CollectibleCategory;
  category: string;
  location?: string;
  coordinates?: { x: number; y: number };
  discoveryInstructions?: string;
}

export type MissionType = "main" | "side";

export interface Mission extends BaseEntity {
  type: MissionType;
  summary: string;
  coverImage?: string;
  difficulty?: "easy" | "medium" | "hard" | "unknown";
  estimatedTime?: string;
  objectives?: string[];
  steps?: string[];
  rewards?: string[];
  relatedMissions?: string[];
  relatedLocations?: string[];
  faq?: { question: string; answer: string }[];
  updatedAt: string;
}

export type GuideCategory =
  | "beginner"
  | "money"
  | "combat"
  | "wanted-level"
  | "exploration"
  | "gameplay-mechanics"
  | "advanced"
  | "news";

export interface GuideFrontmatter {
  title: string;
  slug: string;
  seoTitle?: string;
  metaDescription: string;
  category: GuideCategory;
  author: string;
  publishedAt: string;
  updatedAt: string;
  verificationStatus: VerificationStatus;
  faq?: { question: string; answer: string }[];
  related?: string[];
  draft?: boolean;
}

export interface Guide extends GuideFrontmatter {
  body: string;
  headings: { depth: number; text: string; id: string }[];
}

export interface CompletionItem {
  id: string;
  label: string;
  detail?: string;
}

export interface CompletionCategory {
  id: string;
  title: string;
  description?: string;
  items: CompletionItem[];
}

export interface CompletionData {
  isSampleData: boolean;
  categories: CompletionCategory[];
}

export type MapCategory =
  | "location"
  | "mission"
  | "collectible"
  | "shop"
  | "safehouse"
  | "poi"
  | "hidden";
