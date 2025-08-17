import { SIGNS } from "@/data/signs";
import Card from "./Card";

export default function CardGrid() {
  return (
    <section
      data-testid="card-grid"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8"
    >
      {SIGNS.map((s) => (
        <Card
          key={s.slug}
          name={s.name}
          image={s.image}
          alt={s.name}
          href={`/${s.slug}`}
        />
      ))}
    </section>
  );
}
