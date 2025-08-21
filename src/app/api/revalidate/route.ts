
import { revalidateTag } from "next/cache";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const ok = url.searchParams.get("token") === process.env.REVALIDATE_TOKEN;
  if (!ok) return new Response("forbidden", { status: 403 });
  revalidateTag("substack");
  return Response.json({ ok: true });
}
