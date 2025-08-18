import fs from "fs";
import path from "path";
import type { SubstackPost } from "@/components/SubstackPostCard";

const FILE = path.join(process.cwd(), "data", "substack", "all.json"); // adjust if needed

export function getAllSubstackPosts(): SubstackPost[] {
  const raw = fs.readFileSync(FILE, "utf8");
  const posts: SubstackPost[] = JSON.parse(raw);
  return posts.sort((a, b) => +new Date(b.isoDate) - +new Date(a.isoDate));
}

export function getSubstackPostsForSign(slug: string): SubstackPost[] {
  const s = slug.toLowerCase();
  return getAllSubstackPosts().filter(p => (p.tags || []).map(t => t.toLowerCase()).includes(s));
}
