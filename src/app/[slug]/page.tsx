import { SIGNS } from "@/data/signs";
import { notFound } from "next/navigation";
import { getPostsForSign } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

export default function SignPage({ params: { slug } }: { params: { slug: string } }) {
  const sign = SIGNS.find(s => s.slug === slug);
  if (!sign) return notFound();

  const posts = getPostsForSign(slug);

  return (
    <main className="max-w-6xl mx-auto p-4">
      <header className="flex items-center gap-4">
        <img src={sign.image} alt={sign.name} className="w-24 rounded-xl" />
        <div>
          <h1 className="text-4xl">{sign.name}</h1>
          <p className="opacity-70">{sign.dateRange} · {sign.element}</p>
        </div>
      </header>

      <section className="mt-8 space-y-12">
        {posts.length === 0 && (
          <p className="opacity-80">No posts yet. Add `.mdx` files to <code>content/{slug}</code>.</p>
        )}

        {posts.map(p => (
          <article key={p.slug} className="bg-[#1a1b1d] p-5 rounded-2xl prose prose-invert max-w-none">
            <h2 className="!mt-0">{p.title}</h2>
            {p.cover && <img src={p.cover} alt="" className="rounded-xl mb-4" />}
            {/* Front‑matter Spotify URL helper */}
            {p.spotifyUrl && (
              <iframe
                style={{ borderRadius: 12 }}
                src={`https://open.spotify.com/embed/${p.spotifyUrl.split("open.spotify.com/")[1]}`}
                width="100%" height="352" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              />
            )}
            {/* MDX body (also supports iframes inside the MDX) */}
            <MDXRemote source={p.body} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
          </article>
        ))}
      </section>
    </main>
  );
}
