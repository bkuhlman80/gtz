type Props = { url: string; height?: number };

export default function SpotifyEmbed({ url, height = 352 }: Props) {
  // Accept both full URLs and bare "embed/..." paths
  const src = url.includes("open.spotify.com")
    ? url
    : `https://open.spotify.com/embed/${url.replace(/^\/+/, "")}`;

  return (
    <iframe
      style={{ borderRadius: 12 }}
      src={src}
      width="100%"
      height={height}
      frameBorder={0}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      allowFullScreen
      loading="lazy"
    />
  );
}
