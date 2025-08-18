import { getUntaggedPosts } from "@/lib/substack";

export default async function BlogPage() {
  const items = await getUntaggedPosts();
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <ul className="space-y-6">
        {items.map((it: any) => (
          <li key={it.id}>
            <a href={it.url} className="text-xl underline">{it.title}</a>
            {it.isoDate ? <div className="text-sm opacity-70">{new Date(it.isoDate).toDateString()}</div> : null}
            {it.excerpt ? <p className="opacity-80">{it.excerpt}</p> : null}
          </li>
        ))}
      </ul>
    </main>
  );
}
