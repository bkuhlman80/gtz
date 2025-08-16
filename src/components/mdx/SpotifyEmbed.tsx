

type Props = { url: string; height?: number };

function toEmbedSrc(input: string): string {
  if (input.includes("open.spotify.com/embed/")) return input;
  if (input.includes("open.spotify.com/")) {
    return input.replace("open.spotify.com/", "open.spotify.com/embed/");
  }
  // bare path like "playlist/ID" or "/track/ID"
  return `https://open.spotify.com/embed/${input.replace(/^\/+/, "")}`;
}

function toWebUrl(embedSrc: string): string {
  return embedSrc.replace("open.spotify.com/embed/", "open.spotify.com/");
}

function toDeepLink(webUrl: string): string {
  try {
    const u = new URL(webUrl);
    // pathname like "/playlist/ID" -> "playlist:ID"
    const path = u.pathname.replace(/^\/+/, "").replace(/\//g, ":");
    return `spotify:${path}`;
  } catch {
    return webUrl;
  }
}

export default function SpotifyEmbed({ url, height = 352 }: Props) {
  const embedSrc = toEmbedSrc(url);
  const webUrl = toWebUrl(embedSrc);
  const deepLink = toDeepLink(webUrl);

  return (
    <div className="w-full">
      {/* Desktop/tablet: keep iframe */}
      <div className="hidden md:block rounded-xl overflow-hidden">
        <iframe
          title="Spotify embed"
          src={embedSrc}
          width="100%"
          height={height}
          // remove autoplay to avoid mid-track starts
          allow="encrypted-media; fullscreen; picture-in-picture"
          style={{ borderRadius: 12 }}
          loading="lazy"
        />
      </div>

      {/* Mobile: nudge to full app or web player for continuous playback */}
      <div className="md:hidden">
        <div className="rounded-2xl border border-neutral-700 p-4 bg-[#1a1b1d]">
          <p className="text-sm opacity-80">For full songs, open in Spotify.</p>
          <div className="mt-3 flex gap-2">
            <a href={deepLink} className="px-4 py-2 rounded-xl bg-emerald-500 text-black font-semibold">
              Open in App
            </a>
            <a
              href={webUrl}
              className="px-4 py-2 rounded-xl bg-neutral-800 text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Web Player
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
