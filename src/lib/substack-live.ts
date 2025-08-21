// src/lib/substack-live.ts
export const runtime = "nodejs";
import "server-only";
import Parser from "rss-parser";
import bakedAll from "../../data/substack/all.json";

export type SubstackPost = {
  id: string;
  title: string;
  url: string;
  isoDate: string | null;
  tags: string[];
  excerpt?: string | null;
  subtitle?: string | null;
  image?: string | null;
};

type RawItem = {
  ["content:encoded"]?: string;
  content?: string;
  description?: string;
  title?: string;
  categories?: string[];
  guid?: string;
  id?: string | number;
  link?: string;
  isoDate?: string;
  pubDate?: string;
  contentSnippet?: string;
};

const FEED_URL = "https://z0di.substack.com/feed";
const SIGNS = [
  "aries","taurus","gemini","cancer","leo","virgo",
  "libra","scorpio","sagittarius","capricorn","aquarius","pisces"
];
const UA = "GTZ/1.0 (+https://gtz-one.vercel.app)";

const parser = new Parser<unknown, RawItem>();

// helpers
const stripHtml = (s = "") => s.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
const firstImg = (html = "") => html.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1] || null;
const firstPara = (html = "") => {
  const m = html.match(/<p>([\s\S]*?)<\/p>/i);
  if (!m) return null;
  const text = stripHtml(m[1]);
  return text.length <= 200 ? text : text.slice(0, 197) + "…";
};
const normTag = (t?: string | null) => {
  if (!t) return null;
  const v = String(t).trim().toLowerCase();
  if (v === "sag") return "sagittarius";
  if (v === "scorp") return "scorpio";
  return v;
};
const tagsFromHtmlLinks = (html = "") => {
  const out = new Set<string>();
  for (const m of html.matchAll(/href=["']https?:\/\/[^"']+\/t\/([^"'/?#]+)["']/gi)) {
    const v = normTag(m[1]);
    if (v) out.add(v);
  }
  return [...out];
};
const tagsFromHashtags = (text = "") => {
  const out = new Set<string>();
  for (const m of text.matchAll(/(^|[^A-Za-z0-9_&])#([a-z][a-z0-9_-]{1,30})/gi)) {
    const v = normTag(m[2]);
    if (v) out.add(v);
  }
  return [...out];
};
const tagsFromPlainTextSigns = (text = "") => {
  const s = stripHtml(text).toLowerCase();
  const out: string[] = [];
  for (const sign of SIGNS) {
    const re = new RegExp(`(^|\\W)${sign}(\\W|$)`, "i");
    if (re.test(s)) out.push(sign);
  }
  return out;
};

function normalizeItem(it: RawItem): SubstackPost {
  const raw = it["content:encoded"] ?? it.content ?? "";
  const desc = it.description ?? "";

  const cats = Array.isArray(it.categories)
    ? (it.categories.map(normTag).filter(Boolean) as string[])
    : [];

  const links = tagsFromHtmlLinks(raw);
  const hash = tagsFromHashtags(`${raw} ${desc} ${it.title ?? ""}`);
  let tags = [...new Set([...cats, ...links, ...hash])];
  if (tags.length === 0) tags = tagsFromPlainTextSigns(`${raw} ${desc} ${it.title ?? ""}`);

  return {
    id: String(it.guid ?? it.id ?? it.link ?? ""),
    title: it.title ?? "",
    url: it.link ?? "",
    isoDate: it.isoDate ?? (it.pubDate ? new Date(it.pubDate).toISOString() : null),
    tags,
    excerpt: stripHtml(it.contentSnippet ?? raw ?? ""),
    subtitle: firstPara(raw) ?? null,
    image: firstImg(raw),
  };
}

function sortDesc(a: SubstackPost, b: SubstackPost) {
  return String(b.isoDate ?? "").localeCompare(String(a.isoDate ?? ""));
}

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }
function jitter(n: number) { return Math.floor(n * (0.8 + Math.random() * 0.4)); }

async function fetchWithRetry(url: string, tries = 3): Promise<Response> {
  let lastErr: unknown;
  for (let i = 0; i < tries; i++) {
    const ac = new AbortController();
    const to = setTimeout(() => ac.abort(), 8000);
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": UA, "Accept": "application/rss+xml" },
        next: { revalidate: 3600, tags: ["substack"] },
        signal: ac.signal,
      });
      clearTimeout(to);
      if (res.status === 429 || res.status >= 500) throw new Error(String(res.status));
      if (!res.ok) return res; // 4xx: do not retry
      return res;
    } catch (e) {
      clearTimeout(to);
      lastErr = e;
      await sleep(jitter(500 * 2 ** i));
    }
  }
  throw lastErr ?? new Error("fetch failed");
}

export async function getSubstackLiveAll(): Promise<SubstackPost[]> {
  try {
    const res = await fetchWithRetry(FEED_URL);
    const xml = await res.text();
    const feed = await parser.parseString(xml);
    const items = (feed.items ?? []).map(normalizeItem).sort(sortDesc);
    return items;
  } catch {
    return (bakedAll as SubstackPost[]).sort(sortDesc);
  }
}

export async function getSubstackPostsForSignLive(slug: string): Promise<SubstackPost[]> {
  const s = slug.toLowerCase();
  const all = await getSubstackLiveAll();
  return all.filter(p => (p.tags ?? []).map(t => t.toLowerCase()).includes(s));
}
