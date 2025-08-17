
type Props = { name: string; image: string; href: string; alt?: string; className?: string };
export default function Card({ name, image, href, alt = name, className }: Props) {
  return (
    <a href={href} className={`block rounded-2xl overflow-hidden bg-[#1a1b1d] shadow hover:scale-[1.01] transition ${className ?? ""}`}>
      <img src={image} alt={alt} className="w-full object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{name}</h3>
      </div>
    </a>
  );
}

