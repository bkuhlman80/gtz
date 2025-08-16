
import Image from "next/image";

type Props = { slug: string; name: string; image: string };

export default function Card({ slug, name, image }: Props) {
  return (
    <a
      href={`/${slug}`}
      className="block rounded-2xl overflow-hidden bg-[#1a1b1d] shadow hover:scale-[1.01] transition"
    >
    
    <Image src={src} alt={alt} width={400} height={400} className="w-full h-auto" />

      <div className="p-4">
        <h3 className="text-xl font-semibold">{name}</h3>
      </div>
    </a>
  );
}
