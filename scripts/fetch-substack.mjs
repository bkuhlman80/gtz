// scripts/fetch-substack.mjs
import fs from "fs/promises";
import path from "path";
import Parser from "rss-parser";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "data", "substack");
const BYTAG = path.join(OUT, "byTag");
const FEED_BASE = "https://z0di.substack.com/feed";

// canonical sign slugs
const SIGNS = [
  "aries","taurus","gemini","cancer","leo","virgo",
  "libra","scorpio","sagittarius","capricorn","aquarius","pisces"
];

// basic aliases you might use
const ALIAS = new Map([
  ["sag", "sagittarius"],
  ["scorp", "scorpio"]
]);

const normTag = (t) => {
  if (!t) return null;
  const v = String(t).trim().toLowerCase();
  return ALIAS.get(v) || v;
};

const stripHtml = (s="") => s.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const normalizeItem = (it) => ({
  id: it.guid || it.id || it.link,
  title: it.title || "",
  url: it.link || "",
  isoDate: it.isoDate || (it.pubDate ? new Date(it.pubDate).toISOString() : null),
  tags: (it.categories || []).map(normTag).filter(Boolean),
  excerpt: stripHtml(it.contentSnippet || it.content || it["content:encoded"] || "")
});

const sortDesc = (a, b) => String(b.isoDate || "").localeCompare(String(a.isoDate || ""));

async function writeJSON(file, data) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(data, null, 2) + "\n", "utf8");
}

function dedupe(items) {
  const seen = new Set();
  const out = [];
  for (const x of items) {
    const k = x.id || x.url;
    if (k && !seen.has(k)) { seen.add(k); out.push(x); }
  }
  return out;
}

async function main() {
  const parser = new Parser();
  const base = await parser.parseURL(FEED_BASE);

  const all = (base.items || []).map(normalizeItem);

  const untagged = all.filter(i => (i.tags?.length || 0) === 0).sort(sortDesc);
  await writeJSON(path.join(OUT, "index.json"), untagged);

  for (const tag of SIGNS) {
    // tag-specific feed is cleaner than filtering base
    const feed = await parser.parseURL(`${FEED_BASE}?tag=${encodeURIComponent(tag)}`);
    const items = (feed.items || []).map(normalizeItem);
    const list = dedupe(items).sort(sortDesc);
    await writeJSON(path.join(BYTAG, `${tag}.json`), list);
  }

  // optional: single merged file for other uses
  const merged = dedupe([...untagged, ...SIGNS.flatMap(() => [])]).sort(sortDesc);
  await writeJSON(path.join(OUT, "all.json"), merged);

  console.log(`Wrote: index.json (${untagged.length}) and ${SIGNS.length} tag files`);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
