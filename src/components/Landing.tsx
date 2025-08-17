
import Card from "@/components/Card"; 

export default function Landing() {
  return (
    <main
      className="mx-auto max-w-[1600px] px-4"
      style={
        {['--wheel' as any]: '33vmin',
		 ['--card'  as any]: 'clamp(140px, calc(var(--wheel)/4), 280px)',
        } as React.CSSProperties
      }
    >
    
      {/* hero: top on tall screens, centered on wide */}

    <section className="min-h-[50vh] lg:min-h-screen grid items-start lg:place-items-center pt-6 lg:pt-0">
  <div className="w-[var(--wheel)] h-[var(--wheel)]">{/* wheel */}</div>
</section>



      <section className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
        {SIGNS.map(s => (
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
