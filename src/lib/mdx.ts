import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Post = {
  slug: string;
  title: string;
  date: string;
  type?: string;
  cover?: string;
  cover_alt?: string; 
  spotifyUrl?: string;
  body: string;
};

export function getPostsForSign(signSlug: string): Post[] {
  const dir = path.join(process.cwd(), "content", signSlug);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith(".mdx"))
    .map(file => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.mdx$/, ""),
        title: String(data.title ?? "Untitled"),
        date: String(data.date ?? "1970-01-01"),
        type: data.type ? String(data.type) : undefined,
        cover: data.cover ? String(data.cover) : undefined,
        spotifyUrl: data.spotifyUrl ? String(data.spotifyUrl) : undefined,
        body: content,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
