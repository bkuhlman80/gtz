// scripts/fetch-substack.mjs
import fs from "fs/promises";
import path from "path";
import Parser from "rss-parser";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "data", "substack");
const BYTAG = path.join(OUT, "byTag");
const FEED_BASE = "https://z0di.substack.com/feed";

const SIGNS = [
  "aries","taurus","gemini","cancer","leo","virgo",
  "libra","scorpio","sagittarius","capricorn","aquarius","pisces"
];

const ALIAS = new Map([
  ["sag", "sagittarius"],
  ["scorp", "scorpio"]
]);

const parser = new Parser({
  headers: { "User-Agent": "gtz-rss/1.0 (+https://gtz-one.vercel.app)" }
});

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function fetchFeedWithFallbacks(baseUrl, tag) {
  const urls = tag
    ? [
        `${baseUrl}?tag=${encodeURIComponent(tag)}`,
        `${baseUrl.replace(/\/feed$/, "/feed.rss")}?tag=${encodeURIComponent(tag)}`
      ]
    : [baseUrl, baseUrl.replace(/\/feed$/, "/feed.rss")];

  let lastErr;
  for (const url of urls) {
    // simple retry x2 per URL
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        console.log(`Fetching RSS (${attempt}/2): ${url}`);
        const feed = await parser.parseURL(url);
        // Return even if empty; caller can handle empty lists
        return feed || { items: [] };
      } catch (e) {
        lastErr = e;
        console.error(`RSS fetch failed [${url}] attempt ${attempt}: ${e?.message || e}`);
        await sleep(500 * attempt);
      }
    }
  }
  throw lastErr || new Error("All RSS fallbacks failed");
}

const normTag = (t) => {
  if (!t) return null;
  const v = String(t).trim().toLowerCase();
  return ALIAS.get(v) || v;
};

const stripHtml = (s = "") =>
  s.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

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
  const base = await fetchFeedWithFallbacks(FEED_BASE);
  const all = (base.items || []).map(normalizeItem);

  // write untagged
  const untagged = all.filter(i => (i.tags?.length || 0) === 0).sort(sortDesc);
  await writeJSON(path.join(OUT, "index.json"), untagged);

  // write each sign by filtering the one base feed
  const perTag = {};
  for (const tag of SIGNS) {
    const list = all.filter(i => i.tags?.includes(tag)).sort(sortDesc);
    perTag[tag] = list;
    await writeJSON(path.join(BYTAG, `${tag}.json`), list);
  }

  // merged
  const merged = dedupe([...untagged, ...Object.values(perTag).flat()]).sort(sortDesc);
  await writeJSON(path.join(OUT, "all.json"), merged);

  console.log(`Wrote index.json (${untagged.length}), ${SIGNS.length} tag files, all.json (${merged.length})`);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
