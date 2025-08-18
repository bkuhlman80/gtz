/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export type SubstackPost = {
  id: string;
  title: string;
  url: string;
  isoDate: string;
  tags?: string[];
  excerpt?: string | null;
  subtitle?: string | null;
  image?: string | null;
};

const decode = (s: string) =>
  s
    ?.replace(/&#x27;/g, "'")
    .replace(/&#8212;|&mdash;/g, "—")
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"') ?? "";

const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export default function SubstackPostCard({ post }: { post: SubstackPost }) {
  const blurb = (post.excerpt && post.excerpt.trim()) || decode(post.subtitle || "");
  return (
    <article className="flex gap-6">
      {post.image ? (
        <a href={post.url} target="_blank" rel="noopener noreferrer" className="shrink-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-48 h-36 object-cover rounded-xl border border-white/10"
          />
        </a>
      ) : null}
      <div className="min-w-0">
        <h3 className="text-3xl leading-tight">
          <a href={post.url} target="_blank" rel="noopener noreferrer" className="underline">
            {post.title}
          </a>
        </h3>
        <p className="opacity-70">{fmt(post.isoDate)}</p>
        {blurb ? <p className="mt-2">{blurb}</p> : null}
      </div>
    </article>
  );
}
