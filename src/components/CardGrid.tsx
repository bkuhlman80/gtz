
import Card from "./Card";
import { SIGN_LIST } from "@/data/signs";

export default function CardGrid() {
  return (
    <section className="mx-auto max-w-6xl p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {SIGN_LIST.map(s => (
        <Card key={s.slug} {...s} />
      ))}
    </section>
  );
}


<Card name={s.name} image={s.image} href={`/${s.slug}`} />
