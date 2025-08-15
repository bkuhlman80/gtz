
import covers from "@/data/game-credits.json"; 

export type Cover = {
  slug: string;
  title: string;
  year: number;
  cdn_webp: string;
  cdn_png: string;
  credit_text: string;
  credit_href: string;
};

export const allCovers = covers as Cover[];

export const bySlug = (slug: string) =>
  allCovers.find((c) => c.slug === slug);
