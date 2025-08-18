import { getUntaggedPosts, type SubstackItem } from "@/lib/substack";

export default async function BlogPage() {
  const items: SubstackItem[] = await getUntaggedPosts();
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <ul className="space-y-10">
        {items.map((it: SubstackItem) => (
          <li key={it.id} className="flex gap-4">
            {it.image ? (
              <a href={it.url} className="shrink-0">
                <img src={it.image} alt="" className="w-40 h-28 object-cover rounded-lg border border-neutral-700" />
              </a>
            ) : null}
            <div>
              <a href={it.url} className="text-2xl underline">{it.title}</a>
              {it.isoDate && <div className="text-sm opacity-70">{new Date(it.isoDate).toDateString()}</div>}
              {it.subtitle ? (
                <p className="mt-1 opacity-90">{it.subtitle}</p>
              ) : it.excerpt ? (
                <p className="mt-1 opacity-80">{it.excerpt}</p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}