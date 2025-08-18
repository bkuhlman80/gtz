// scripts/fetch-substack.mjs
import fs from "fs/promises";
import path from "path";
import Parser from "rss-parser";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "data", "substack");
const BYTAG = path.join(OUT, "byTag");
const FEED_BASE = "https://z0di.substack.com/feed";
const PROXY_BASE = process.env.PROXY_BASE || ""; // e.g. https://gtz-one.vercel.app/api/rss-proxy?url=

const SIGNS = [
  "aries","taurus","gemini","cancer","leo","virgo",
  "libra","scorpio","sagittarius","capricorn","aquarius","pisces"
];

const ALIAS = new Map([
  ["sag", "sagittarius"],
  ["scorp", "scorpio"]
]);

const parser = new Parser(); // we parse strings, not URLs
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36";

const sleep = (ms) => new Promise(r => setTimeout(r, ms));



async function fetchFeedString(url) {
  const target = PROXY_BASE ? `${PROXY_BASE}${encodeURIComponent(url)}` : url;
  const res = await fetch(target, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
      "Accept": "application/rss+xml, application/xml;q=0.9, */*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
      "Referer": "https://z0di.substack.com/"
    }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

async function fetchFeedWithFallbacks(baseUrl) {
  const urls = [baseUrl, baseUrl.replace(/\/feed$/, "/feed.rss")];
  let lastErr;
  for (const url of urls) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        console.log(`Fetching RSS (${attempt}/2): ${url}`);
        const xml = await fetchFeedString(url);
        const feed = await parser.parseString(xml);
        return feed || { items: [] };
      } catch (e) {
        lastErr = e;
        console.error(`RSS fetch failed [${url}] attempt ${attempt}: ${e?.message || e}`);
        await sleep(700 * attempt);
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
const stripHtml = (s="") => s.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const firstImg = (html="") => {
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return m?.[1] || null;
};
const firstPara = (html="") => {
  const m = html.match(/<p>([\s\S]*?)<\/p>/i);
  if (!m) return null;
  const text = stripHtml(m[1]);
  return text.length <= 200 ? text : text.slice(0, 197) + "…";
};

const normalizeItem = (it) => {
  const raw = it["content:encoded"] || it.content || "";
  return {
    id: it.guid || it.id || it.link,
    title: it.title || "",
    url: it.link || "",
    isoDate: it.isoDate || (it.pubDate ? new Date(it.pubDate).toISOString() : null),
    tags: (it.categories || []).map(normTag).filter(Boolean),
    excerpt: stripHtml(it.contentSnippet || raw || ""),
    subtitle: firstPara(raw) || null,
    image: firstImg(raw)
  };
};

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

  const untagged = all.filter(i => (i.tags?.length || 0) === 0).sort(sortDesc);
  await writeJSON(path.join(OUT, "index.json"), untagged);

  const perTag = {};
  for (const tag of SIGNS) {
    const list = all.filter(i => i.tags?.includes(tag)).sort(sortDesc);
    perTag[tag] = list;
    await writeJSON(path.join(BYTAG, `${tag}.json`), list);
  }

  const merged = dedupe([...untagged, ...Object.values(perTag).flat()]).sort(sortDesc);
  await writeJSON(path.join(OUT, "all.json"), merged);

  console.log(`Wrote index.json (${untagged.length}), ${SIGNS.length} tag files, all.json (${merged.length})`);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
