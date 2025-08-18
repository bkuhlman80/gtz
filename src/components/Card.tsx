
import Image from "next/image";

type Props = { name: string; image: string; href: string; alt?: string; className?: string };
export default function Card({ name, image, href, alt = name, className }: Props) {
  return (
    <a href={href} className={`block rounded-2xl overflow-hidden bg-[#1a1b1d] shadow hover:scale-[1.01] transition ${className ?? ""}`}>
      <div className="relative aspect-square">
        <Image
          src={image}             // works for /public paths; for remote see note below
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={false}
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold">{name}</h3>
      </div>
    </a>
  );
}
