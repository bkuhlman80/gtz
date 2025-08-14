import { SIGNS } from "@/data/signs";
import Card from "./Card";

export default function CardGrid(){
  return (
    <section className="mx-auto max-w-6xl p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {SIGNS.map(s => (
        <Card key={s.slug} {...s}/>
      ))}
    </section>
  );
}
