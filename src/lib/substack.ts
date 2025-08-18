import fs from "fs/promises";
import path from "path";

const ROOT = process.cwd();
const BASE = path.join(ROOT, "data", "substack");

export type SubstackItem = {
  id: string;
  title: string;
  url: string;
  isoDate?: string | null;
  tags?: string[];
  excerpt?: string | null;
  subtitle?: string | null;
  image?: string | null;
};

export async function getUntaggedPosts(): Promise<SubstackItem[]>  {
  const p = path.join(BASE, "index.json");
  const raw = await fs.readFile(p, "utf8");
  return JSON.parse(raw);
}

export async function getPostsBySign(slug: string): Promise<SubstackItem[]>  {
  const p = path.join(BASE, "byTag", `${slug}.json`);
  const raw = await fs.readFile(p, "utf8");
  return JSON.parse(raw);
}
