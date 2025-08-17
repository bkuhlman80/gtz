import Image from "next/image";

type Props = {
  title: string; year: number;
  cdn_webp: string; cdn_png: string;
  credit_text: string; credit_href: string;
  alt?: string;
  className?: string;          
};

export default function GameCover(p: Props) {
  return (
    <figure className="rounded-2xl overflow-hidden border shadow-sm">
      <Image
        src={p.cdn_png}
        alt={p.alt ?? `${p.title} (${p.year}) cover/title art`}
        width={600}
        height={800}
        className={p.className ?? "w-full h-auto block"}   // <-- use it
        sizes="(min-width: 768px) 33vw, 100vw"
      />
      <figcaption className="text-xs px-3 py-2 flex items-center justify-between">
        <span>{p.title} ({p.year})</span>
        <a href={p.credit_href} target="_blank" rel="noopener" className="underline opacity-70 hover:opacity-100">
          {p.credit_text}
        </a>
      </figcaption>
    </figure>
  );
}
