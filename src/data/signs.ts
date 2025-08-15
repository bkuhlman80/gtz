export type SignSlug="aries"|"taurus"|"gemini"|"cancer"|"leo"|"virgo"|"libra"|"scorpio"|
"sagittarius"|"capricorn"|"aquarius"|"pisces";
export const SIGNS={aries:"Aries",taurus:"Taurus",gemini:"Gemini",cancer:"Cancer",
leo:"Leo",virgo:"Virgo",libra:"Libra",scorpio:"Scorpio",sagittarius:"Sagittarius",
capricorn:"Capricorn",aquarius:"Aquarius",pisces:"Pisces"} as const;
export const SIGN_LIST=Object.entries(SIGNS).map(([slug,name])=>({
  slug:slug as SignSlug, name,
  element:{aries:"Fire",leo:"Fire",sagittarius:"Fire",taurus:"Earth",virgo:"Earth",
  capricorn:"Earth",gemini:"Air",libra:"Air",aquarius:"Air",cancer:"Water",
  scorpio:"Water",pisces:"Water"}[slug as keyof typeof SIGNS] as "Fire"|"Earth"|"Air"|"Water",
  dateRange:{aries:"Mar 21–Apr 20",taurus:"Apr 21–May 20",gemini:"May 21–Jun 20",
  cancer:"Jun 21–Jul 22",leo:"Jul 23–Aug 22",virgo:"Aug 23–Sep 22",libra:"Sep 23–Oct 22",
  scorpio:"Oct 23–Nov 21",sagittarius:"Nov 22–Dec 21",capricorn:"Dec 22–Jan 19",
  aquarius:"Jan 20–Feb 18",pisces:"Feb 19–Mar 20"}[slug as keyof typeof SIGNS],
  image:`/assets/signs/${slug}.png`,
}));
