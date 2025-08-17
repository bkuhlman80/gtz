import Card from "@/components/Card"; 
import { SIGNS } from "@/data/signs";
import React from "react";

type Sign = {
  slug: string;
  name: string;
  image: string;
};

export default function Landing() {
  const style: React.CSSProperties = {
    // custom CSS vars must be indexed as string
    ["--wheel" as string]: "33vmin",
    ["--card" as string]: "clamp(140px, calc(var(--wheel)/4), 280px)",
  };

  return (
    <main className="mx-auto max-w-[1600px] px-4" style={style}>
      {/* hero: top on tall screens, centered on wide */}
      <section className="min-h-[50vh] lg:min-h-screen grid items-start lg:place-items-center pt-6 lg:pt-0">
        <div className="w-[var(--wheel)] h-[var(--wheel)]">{/* wheel */}</div>
      </section>

      <section className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
        {SIGNS.map((s: Sign) => (
          <Card
            key={s.slug}
            slug={s.slug}
            name={s.name}
            image={s.image}
            className="w-[var(--card)] aspect-[3/4]"
          />
        ))}
      </section>
    </main>
  );
}
