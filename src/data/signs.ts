export type SignSlug =
  | "aries"|"taurus"|"gemini"|"cancer"|"leo"|"virgo"
  | "libra"|"scorpio"|"sagittarius"|"capricorn"|"aquarius"|"pisces";

export const SIGNS:{slug:SignSlug; name:string; element:"Fire"|"Earth"|"Air"|"Water"; dateRange:string; image:string;}[] = [
  {slug:"aries", name:"Aries", element:"Fire", dateRange:"Mar 21–Apr 20", image:"/assets/signs/aries.png"},
  {slug:"taurus", name:"Taurus", element:"Earth", dateRange:"Apr 21–May 20", image:"/assets/signs/taurus.png"},
  {slug:"gemini", name:"Gemini", element:"Air", dateRange:"May 21–Jun 20", image:"/assets/signs/gemini.png"},
  {slug:"cancer", name:"Cancer", element:"Water", dateRange:"Jun 21–Jul 22", image:"/assets/signs/cancer.png"},
  {slug:"leo", name:"Leo", element:"Fire", dateRange:"Jul 23–Aug 22", image:"/assets/signs/leo.png"},
  {slug:"virgo", name:"Virgo", element:"Earth", dateRange:"Aug 23–Sep 22", image:"/assets/signs/virgo.png"},
  {slug:"libra", name:"Libra", element:"Air", dateRange:"Sep 23–Oct 22", image:"/assets/signs/libra.png"},
  {slug:"scorpio", name:"Scorpio", element:"Water", dateRange:"Oct 23–Nov 21", image:"/assets/signs/scorpio.png"},
  {slug:"sagittarius", name:"Sagittarius", element:"Fire", dateRange:"Nov 22–Dec 21", image:"/assets/signs/sagittarius.png"},
  {slug:"capricorn", name:"Capricorn", element:"Earth", dateRange:"Dec 22–Jan 19", image:"/assets/signs/capricorn.png"},
  {slug:"aquarius", name:"Aquarius", element:"Air", dateRange:"Jan 20–Feb 18", image:"/assets/signs/aquarius.png"},
  {slug:"pisces", name:"Pisces", element:"Water", dateRange:"Feb 19–Mar 20", image:"/assets/signs/pisces.png"},
];
