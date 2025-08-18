export const runtime = "edge";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  if (!url) return new Response("Missing url", { status: 400 });

  // allow only Substack feeds
  try {
    const u = new URL(url);
    const okHost = u.hostname.endsWith(".substack.com");
    const okPath = u.pathname === "/feed" || u.pathname === "/feed.rss";
    if (!okHost || !okPath) return new Response("Forbidden", { status: 403 });
  } catch {
    return new Response("Bad url", { status: 400 });
  }

  const r = await fetch(url, {
    headers: {
      "User-Agent": UA,
      "Accept": "application/rss+xml, application/xml;q=0.9, */*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
      "Referer": "https://substack.com/"
    },
    // optional: cache a bit at the edge
    cache: "no-store"
  });
  const body = await r.text();
  return new Response(body, {
    status: r.status,
    headers: { "content-type": "application/rss+xml; charset=utf-8" }
  });
}
