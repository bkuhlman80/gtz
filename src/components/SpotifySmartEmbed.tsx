
type Props = { playlistIdOrPath: string; title?: string };

export default function SpotifySmartEmbed({ playlistIdOrPath, title }: Props) {
  const src = playlistIdOrPath.startsWith("playlist/")
    ? `https://open.spotify.com/embed/${playlistIdOrPath}`
    : `https://open.spotify.com/embed/playlist/${playlistIdOrPath}`;

  const webUrl = src.replace("/embed/", "/");
  const deepLink = webUrl.replace("https://open.spotify.com/", "spotify:");

  return (
    <div className="w-full">
      {/* Desktop/tablet: keep iframe */}
      <div className="hidden md:block rounded-xl overflow-hidden">
        <iframe
          title={title ?? "Spotify embed"}
          src={src}
          width="100%"
          height="352"
          // Avoid any chance of autoplay quirks on mobile
          allow="encrypted-media; fullscreen; picture-in-picture"
          style={{ borderRadius: 12 }}
          loading="lazy"
        />
      </div>

      {/* Mobile: use deep links to the app */}
      <div className="md:hidden">
        <div className="rounded-2xl border border-neutral-700 p-4 bg-[#1a1b1d]">
          <p className="text-sm opacity-80">
            For full songs, open in Spotify.
          </p>
          <div className="mt-3 flex gap-2">
            <a
              href={deepLink}
              className="px-4 py-2 rounded-xl bg-emerald-500 text-black font-semibold"
            >
              Open in App
            </a>
            <a
              href={webUrl}
              className="px-4 py-2 rounded-xl bg-neutral-800 text-white"
              target="_blank" rel="noopener noreferrer"
            >
              Open Web Player
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
