import Image from "next/image";
import Link from "next/link";

type Props = { name: string; image: string; alt?: string; href?: string };

export default function Card({ name, image, alt, href }: Props) {
  const content = (
    <div className="rounded-2xl overflow-hidden border shadow-sm hover:shadow-md transition">
      <Image src={image} alt={alt ?? name} width={400} height={300} className="w-full h-auto object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{name}</h3>
      </div>
    </div>
  );

  return href ? (
    <Link href={href} className="block focus:outline-none focus:ring-2 focus:ring-amber-400">
      {content}
    </Link>
  ) : (
    content
  );
}
