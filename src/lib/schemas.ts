import { z } from "zod";

export const verificationStatusSchema = z.enum([
  "officially_confirmed",
  "gameplay_verified",
  "community_reported",
  "unverified",
]);

const sourceReferenceSchema = z.object({
  label: z.string(),
  url: z.url(),
});

const baseEntity = {
  id: z.string(),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be kebab-case"),
  name: z.string().min(1),
  description: z.string(),
  image: z.string().optional(),
  verificationStatus: verificationStatusSchema,
  sourceReferences: z.array(sourceReferenceSchema).default([]),
  lastVerifiedAt: z.string().optional(),
};

export const vehicleSchema = z.object({
  ...baseEntity,
  category: z.enum(["cars", "motorcycles", "boats", "aircraft", "other"]),
  manufacturer: z.string().optional(),
  performance: z
    .object({
      topSpeed: z.number().optional(),
      acceleration: z.number().optional(),
      braking: z.number().optional(),
      handling: z.number().optional(),
    })
    .optional(),
  location: z.string().optional(),
  acquisition: z.string().optional(),
});

export const weaponSchema = z.object({
  ...baseEntity,
  category: z.string(),
  damage: z.number().optional(),
  accuracy: z.number().optional(),
  fireRate: z.number().optional(),
  acquisition: z.string().optional(),
});

export const characterSchema = z.object({
  ...baseEntity,
  role: z.string(),
  biography: z.string(),
  relatedMissions: z.array(z.string()).optional(),
});

export const locationSchema = z.object({
  ...baseEntity,
  region: z.string(),
  relatedMissions: z.array(z.string()).optional(),
  coordinates: z.object({ x: z.number(), y: z.number() }).optional(),
  mapCategory: z.enum(["location", "poi"]).optional(),
});

export const collectibleSchema = z.object({
  ...baseEntity,
  kind: z.enum(["collectible", "secret"]),
  category: z.string(),
  location: z.string().optional(),
  coordinates: z.object({ x: z.number(), y: z.number() }).optional(),
  discoveryInstructions: z.string().optional(),
});

export const missionSchema = z.object({
  ...baseEntity,
  type: z.enum(["main", "side"]),
  summary: z.string(),
  coverImage: z.string().optional(),
  difficulty: z.enum(["easy", "medium", "hard", "unknown"]).optional(),
  estimatedTime: z.string().optional(),
  objectives: z.array(z.string()).optional(),
  steps: z.array(z.string()).optional(),
  rewards: z.array(z.string()).optional(),
  relatedMissions: z.array(z.string()).optional(),
  relatedLocations: z.array(z.string()).optional(),
  faq: z
    .array(z.object({ question: z.string(), answer: z.string() }))
    .optional(),
  updatedAt: z.string(),
});

export const guideFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  seoTitle: z.string().optional(),
  metaDescription: z.string(),
  category: z.enum([
    "beginner",
    "money",
    "combat",
    "wanted-level",
    "exploration",
    "gameplay-mechanics",
    "advanced",
    "news",
  ]),
  author: z.string(),
  publishedAt: z.string(),
  updatedAt: z.string(),
  verificationStatus: verificationStatusSchema,
  faq: z
    .array(z.object({ question: z.string(), answer: z.string() }))
    .optional(),
  related: z.array(z.string()).optional(),
  draft: z.boolean().optional(),
});

export const completionItemSchema = z.object({
  id: z.string(),
  label: z.string(),
  detail: z.string().optional(),
});

export const completionCategorySchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  items: z.array(completionItemSchema),
});

export const completionDataSchema = z.object({
  isSampleData: z.boolean(),
  categories: z.array(completionCategorySchema),
});
