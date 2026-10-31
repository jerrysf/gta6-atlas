import { NextResponse } from "next/server";
import { buildSearchDocs } from "@/lib/search";
import { getAllGuides } from "@/lib/mdx";
import { characters } from "@/data/characters";
import { locations } from "@/data/locations";
import { vehicles } from "@/data/vehicles";
import { weapons } from "@/data/weapons";
import { collectibles, secrets } from "@/data/collectibles";

export const dynamic = "force-static";

export async function GET() {
  const guides = await getAllGuides();
  const docs = buildSearchDocs({
    guides,
    characters,
    locations,
    vehicles,
    weapons,
    collectibles: [...collectibles, ...secrets],
  });
  return NextResponse.json(docs);
}
