/* eslint-disable @next/next/no-img-element */
import { SIGNS } from "@/data/signs";
import { notFound } from "next/navigation";
import { getPostsForSign } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import GameBlock from "@/components/GameBlock";
import GameCover from "@/components/GameCover";
import { bySlug as coverBySlug } from "@/lib/covers";
import SpotifyEmbed from "@/components/mdx/SpotifyEmbed";
import Link from "next/link";
import Image from "next/image";
import ZoomImg from "@/components/ZoomImg";

type Params = { slug: string };
type Sign = {
  slug: string;
  name: string;
  image: string;
  element: string;
  modality?: string;
  dateRange?: string;
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
<Image
  src={sign.image}
  alt={sign.name}
  width={96}
  height={96}
  className="w-24 h-24 rounded-xl"
/>
        <div>
          <h1 className="text-4xl">{sign.name}</h1>
          <p className="opacity-70">{sign.element}</p>
          {sign.modality && <p className="opacity-70">{sign.modality}</p>}
        </div>
      </header>

      <section className="mt-8 space-y-8">
        {posts.length === 0 && (
          <p className="opacity-80">
            No posts yet. Add <code>content/{slug}</code> files.
          </p>
        )}

{posts.map((p) => (
  <article key={p.slug} className="bg-[#1a1b1d] p-5 rounded-2xl prose prose-invert max-w-none space-y-6">
    <h2 className="!mt-0 text-2xl font-bold">{p.title}</h2>

    {p.spotifyUrl && <SpotifyEmbed url={p.spotifyUrl} />}

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* Playlist screenshot */}
  {p.cover && (
    <div className="w-full h-80 rounded-xl border border-neutral-700 bg-black/30 p-2 flex items-center justify-center">
      <ZoomImg
        src={p.cover}
        alt={`${sign.name} playlist preview`}
        className="w-full h-full object-contain rounded-lg"
      />
    </div>
  )}

  {/* Game art */}
  {cover && (
    <div className="w-full h-80 rounded-xl border border-neutral-700 bg-black/30 p-2 flex items-center justify-center">
      <GameCover
        title={cover.title}
        year={cover.year}
        cdn_webp={cover.cdn_webp}
        cdn_png={cover.cdn_png}
        credit_text={cover.credit_text}
        credit_href={cover.credit_href}
        alt={`${cover.title} (${cover.year})`}
        className="w-full h-full object-contain rounded-lg"
      />
    </div>
  )}
</div>


    <MDXRemote
      source={p.body}
      options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      components={{ GameBlock, SpotifyEmbed }}
    />
  </article>
))}

      </section>
    </main>
  );
}
