import { SIGN_LIST } from "@/data/signs";
import { notFound } from "next/navigation";

export default function SignPage({ params:{slug} }:{params:{slug:string}}){
  const sign = SIGN_LIST.find(s=>s.slug===slug);
  if(!sign) return notFound();
  return (
    <main className="max-w-6xl mx-auto p-4">
      <header className="flex items-center gap-4">
        <img src={sign.image} alt={sign.name} className="w-24 rounded-xl"/>
        <div>
          <h1 className="text-4xl">{sign.name}</h1>
          <p className="opacity-70">{sign.dateRange} · {sign.element}</p>
        </div>
      </header>
      <section className="mt-8">
        <p className="opacity-80">MDX feed will render here once we add the loader.</p>
      </section>
    </main>
  );
}
