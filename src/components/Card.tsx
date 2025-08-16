import Image from "next/image";

type Props = {
  name: string;
  image: string;        // URL or /public path
  alt?: string;
  href?: string;
};

export default function Card({ name, image, alt, href }: Props) {
  const card = (
    <div className="rounded-2xl overflow-hidden border shadow-sm hover:shadow-md transition">
      <Image
        src={image}
        alt={alt ?? name}
        width={400}
        height={300}
        className="w-full h-auto object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{name}</h3>
      </div>
    </div>
  );

  return href ? <a href={href}>{card}</a> : card;
}
