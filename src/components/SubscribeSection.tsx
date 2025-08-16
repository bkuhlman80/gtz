
export default function SubscribeSection() {
  return (
    <section id="subscribe" className="max-w-3xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-semibold text-center">Subscribe</h2>
      <p className="mt-2 text-center opacity-80">
        Get playlists, artwork, gaming picks, and insights with each Sun ↔ Moon shift.
      </p>

      <div className="mt-6 rounded-2xl overflow-hidden border border-neutral-700 bg-[#1a1b1d]">
        {/* Substack iframe embed */}
        <iframe
          src="https://z0di.substack.com/embed"
          width="100%"
          height="320"
          style={{ border: "0", background: "transparent" }}
          title="Substack Subscribe"
        />
      </div>

      {/* Fallback email capture (optional, posts to your API for later import to Substack) */}
      {/* <form className="mt-6 flex gap-2" onSubmit={...}>
        <input type="email" required placeholder="you@example.com" className="flex-1 px-4 py-3 rounded-xl bg-[#1a1b1d] border border-neutral-700" />
        <button className="px-5 py-3 rounded-xl bg-pink-500 text-white font-semibold">Join</button>
      </form> */}
    </section>
  );
}
