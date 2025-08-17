import React from "react";
import Card from "@/components/Card";
import { SIGNS } from "@/data/signs";

type Sign = { slug: string; name: string; image: string };

export default function Landing() {
  const style: React.CSSProperties = {
    ["--wheel" as string]: "33vmin",
    ["--card" as string]: "clamp(140px, calc(var(--wheel)/4), 280px)",
  };

  return (
    <main className="mx-auto max-w-[1600px] px-4" style={style}>
      {/* Hero / wheel */}
      <section
        className="min-h-[50vh] lg:min-h-screen grid items-start lg:place-items-center pt-6 lg:pt-0"
        data-testid="wheel"
      >
        <div className="w-[var(--wheel)] h-[var(--wheel)]">{/* wheel img renders elsewhere */}</div>
      </section>

      {/* Grid */}
      <section
        className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center"
        data-testid="card-grid"
      >
        {SIGNS.map((s: Sign) => (
          <div key={s.slug} className="w-[var(--card)] aspect-[3/4]">
            <Card
              name={s.name}
              image={s.image}
              alt={s.name}
              href={`/${s.slug}`}
            />
          </div>
        ))}
      </section>
    </main>
  );
}
