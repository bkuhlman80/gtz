/* eslint-disable @next/next/no-img-element */
import { SIGNS } from "@/data/signs";
import { notFound } from "next/navigation";
import { getPostsForSign } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import GameBlock from "@/components/GameBlock";
import SpotifyEmbed from "@/components/mdx/SpotifyEmbed";
import GameCover from "@/components/GameCover";
import { bySlug as coverBySlug } from "@/lib/covers";
import Link from "next/link";

type Params = { slug: string };
type Sign = {
  slug: string;
  name: string;
  image: string;
  element: string;
  modality?: string;
  dateRange?: string;
  spotifyPlaylistId?: string;
  gameSlug?: string;
};

export default async function SignPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;

  const sign = (SIGNS as ReadonlyArray<Sign>).find((s) => s.slug === slug);
  if (!sign) return notFound();

  const posts = getPostsForSign(slug);
  const cover = sign.gameSlug ? coverBySlug(sign.gameSlug) : null;

  return (
    <main className="max-w-6xl mx-auto p-4">
      <nav className="mb-4" aria-label="Breadcrumb">
        <Link href="/" className="inline-flex items-center text-sm text-amber-400 hover:underline">
          ← Back to Home
        </Link>
      </nav>

      <header className="flex items-center gap-4">
        <img src={sign.image} alt={sign.name} className="w-24 rounded-xl" />
        <div>
          <h1 className="text-4xl">{sign.name}</h1>
          <p className="opacity-70">{sign.element}</p>
          {sign.modality && <p className="opacity-70">{sign.modality}</p>}
        </div>
      </header>

      <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-8">
          {sign.spotifyPlaylistId && (
            <div className="rounded-xl overflow-hidden">
              <iframe
                style={{ borderRadius: 12 }}
                src={`https://open.spotify.com/embed/playlist/${sign.spotifyPlaylistId}?utm_source=generator`}
                width="100%"
                height="352"
                frameBorder={0}
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                title={`${sign.name} playlist`}
              />
            </div>
          )}

          {posts.length === 0 && (
            <p className="opacity-80">
              No posts yet. Add <code>content/{slug}</code> files.
            </p>
          )}

          {posts.map((p) => (
            <article
              key={p.slug}
              className="bg-[#1a1b1d] p-5 rounded-2xl prose prose-invert max-w-none space-y-6"
            >
              <h2 className="!mt-0 text-2xl font-bold">{p.title}</h2>
              {p.cover && <img src={p.cover} alt="" className="rounded-xl mb-4" />}
              {p.spotifyUrl && (
                <iframe
                  style={{ borderRadius: 12 }}
                  src={`https://open.spotify.com/embed/${p.spotifyUrl.split("open.spotify.com/")[1]}`}
                  width="100%"
                  height="352"
                  frameBorder={0}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  title="Post Spotify embed"
                />
              )}
              <MDXRemote
                source={p.body}
                options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                components={{ GameBlock, SpotifyEmbed }}
              />
            </article>
          ))}
        </div>

        <aside className="space-y-4">
          {cover && (
            <GameCover
              title={cover.title}
              year={cover.year}
              cdn_webp={cover.cdn_webp}
              cdn_png={cover.cdn_png}
              credit_text={cover.credit_text}
              credit_href={cover.credit_href}
              alt={`${cover.title} (${cover.year})`}
            />
          )}
        </aside>
      </section>
    </main>
  );
}
