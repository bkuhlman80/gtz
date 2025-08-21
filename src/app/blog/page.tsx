export const runtime = "nodejs";

import { getSubstackLiveAll } from "@/lib/substack-live";
import SubstackPostCard from "@/components/SubstackPostCard";

export default async function BlogPage() {
  const posts = await getSubstackLiveAll();
  return (
    <main className="max-w-5xl mx-auto p-4 space-y-12">
      <h1 className="text-6xl font-bold">Blog</h1>
      {posts.map(p => <SubstackPostCard key={p.id} post={p} />)}
    </main>
  );
}
