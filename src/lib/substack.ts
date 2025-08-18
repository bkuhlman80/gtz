import fs from "fs/promises";
import path from "path";

const ROOT = process.cwd();
const BASE = path.join(ROOT, "data", "substack");

export async function getUntaggedPosts() {
  const p = path.join(BASE, "index.json");
  const raw = await fs.readFile(p, "utf8");
  return JSON.parse(raw);
}

export async function getPostsBySign(slug: string) {
  const p = path.join(BASE, "byTag", `${slug}.json`);
  const raw = await fs.readFile(p, "utf8");
  return JSON.parse(raw);
}
