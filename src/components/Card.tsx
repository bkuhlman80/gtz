type Props = { slug:string; name:string; dateRange:string; image:string };
export default function Card({ slug, name, dateRange, image }: Props) {
  return (
    <a href={`/sign/${slug}`} className="block rounded-2xl overflow-hidden bg-[#1a1b1d] shadow hover:scale-[1.01] transition">
      <img src={image} alt={name} className="w-full object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-sm opacity-70">{dateRange}</p>
      </div>
    </a>
  );
}
