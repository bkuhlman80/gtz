// src/components/GameBlock.tsx
import GameCover from "@/components/GameCover";
import { bySlug } from "@/lib/covers";

type Props = { gameSlug: string; className?: string };

export default function GameBlock({ gameSlug, className }: Props) {
  const c = bySlug(gameSlug);
  if (!c) return null; // unknown slug → render nothing
  return (
    <div className={className}>
      <GameCover
        title={c.title}
        year={c.year}
        cdn_webp={c.cdn_webp}
        cdn_png={c.cdn_png}
        credit_text={c.credit_text}
        credit_href={c.credit_href}
        alt={`${c.title} (${c.year}) title/cover`}
      />
    </div>
  );
}
