import type {
  Character,
  Collectible,
  GameLocation,
  Mission,
  Vehicle,
  Weapon,
} from "@/lib/types";
import { vehicles } from "@/data/vehicles";
import { weapons } from "@/data/weapons";
import { characters } from "@/data/characters";
import { locations } from "@/data/locations";
import { collectibles, secrets } from "@/data/collectibles";
import { missions } from "@/data/missions";

/**
 * Repository interfaces abstract the data source. The MVP is backed by
 * static TypeScript data files; a Supabase-backed implementation can be
 * swapped in (e.g. via a provider factory reading env vars) without
 * changing page components.
 */
export interface Repository<T> {
  getAll(): Promise<T[]>;
  getBySlug(slug: string): Promise<T | undefined>;
}

function createStaticRepository<T extends { slug: string }>(
  rows: T[],
): Repository<T> {
  return {
    getAll: async () => rows,
    getBySlug: async (slug) => rows.find((r) => r.slug === slug),
  };
}

export const vehicleRepo: Repository<Vehicle> = createStaticRepository(vehicles);
export const weaponRepo: Repository<Weapon> = createStaticRepository(weapons);
export const characterRepo: Repository<Character> =
  createStaticRepository(characters);
export const locationRepo: Repository<GameLocation> =
  createStaticRepository(locations);
export const collectibleRepo: Repository<Collectible> =
  createStaticRepository(collectibles);
export const secretRepo: Repository<Collectible> =
  createStaticRepository(secrets);
export const missionRepo: Repository<Mission> =
  createStaticRepository(missions);
