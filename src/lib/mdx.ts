import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { guideFrontmatterSchema } from "@/lib/schemas";
import type { Guide } from "@/lib/types";

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "guides");

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function extractHeadings(markdown: string) {
  return markdown
    .split("\n")
    .map((line) => {
      const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
      if (!match) return null;
      const text = match[2].replace(/\{#.+\}$/, "").trim();
      return { depth: match[1].length, text, id: slugify(text) };
    })
    .filter((h): h is NonNullable<typeof h> => h !== null);
}

export function getGuideSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export async function getGuide(slug: string): Promise<Guide | null> {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const parsed = guideFrontmatterSchema.safeParse({ ...data, slug });
  if (!parsed.success || parsed.data.draft) return null;
  return {
    ...parsed.data,
    body: content,
    headings: extractHeadings(content),
  };
}

export async function getAllGuides(): Promise<Guide[]> {
  const slugs = getGuideSlugs();
  const guides = await Promise.all(slugs.map(getGuide));
  return guides
    .filter((g): g is Guide => g !== null)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

