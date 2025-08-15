import GameCover from "@/components/GameCover";
import { bySlug } from "@/lib/covers";

export default function GameBlock({ gameSlug }: { gameSlug: string }) {
  const c = bySlug(gameSlug);
  if (!c) return null;
  return (
    <GameCover
      title={c.title}
      year={c.year}
      cdn_webp={c.cdn_webp}
      cdn_png={c.cdn_png}
      credit_text={c.credit_text}
      credit_href={c.credit_href}
      alt={`${c.title} (${c.year}) title/cover`}
    />
  );
}
