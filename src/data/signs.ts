export const SIGNS = [
  {
    slug: "aries",
    name: "Aries",
    image: "/assets/signs/aries.png",
    element: "🔥 Fire",
    modality: "🎬 Cardinal",
    gameSlug: "doom-1993",
    spotifyPlaylistId: "04F5NqNLU8V0f6pMSLVaWV"
  },
  {
    slug: "taurus",
    name: "Taurus",
    image: "/assets/signs/taurus.png",
    element: "🌍 Earth",
    modality: "🔒 Fixed",
    gameSlug: "oregon-trail-1985",
    spotifyPlaylistId: "3iymWNOxmgG2CxMOEe12WL"
  },
  {
    slug: "gemini",
    name: "Gemini",
    image: "/assets/signs/gemini.png",
    element: "🌬 Air",
    modality: "🌀 Mutable",
    gameSlug: "street-fighter-1987",
    spotifyPlaylistId: "349e5sjJ2K5Ae0WI2UgrZh"
  },
  {
    slug: "cancer",
    name: "Cancer",
    image: "/assets/signs/cancer.png",
    element: "🌊 Water",
    modality: "🎬 Cardinal",
    gameSlug: "harvest-moon-1996",
    spotifyPlaylistId: "3EBNytXHbh9hGKXSmaPefH"
  },
  {
    slug: "leo",
    name: "Leo",
    image: "/assets/signs/leo.png",
    element: "🔥 Fire",
    modality: "🔒 Fixed",
    gameSlug: "ddr-1998",
    spotifyPlaylistId: "4vnhgroAMAzW61vfRfGiiV"
  },
  {
    slug: "virgo",
    name: "Virgo",
    image: "/assets/signs/virgo.png",
    element: "🌍 Earth",
    modality: "🌀 Mutable",
    gameSlug: "earthbound-1994",
    spotifyPlaylistId: "18b2vuovmsQxMhcH6C4iW6"
  },
  {
    slug: "libra",
    name: "Libra",
    image: "/assets/signs/libra.png",
    element: "🌬 Air",
    modality: "🎬 Cardinal",
    gameSlug: "zelda-alttp-1991",
    spotifyPlaylistId: "47titu9ry0AQmckL5jkOGt"
  },
  {
    slug: "scorpio",
    name: "Scorpio",
    image: "/assets/signs/scorpio.png",
    element: "🌊 Water",
    modality: "🔒 Fixed",
    gameSlug: "max-payne-2001",
    spotifyPlaylistId: "31GPttHPzthJnvWZPxzEkp"
  },
  {
    slug: "sagittarius",
    name: "Sagittarius",
    image: "/assets/signs/sagittarius.png",
    element: "🔥 Fire",
    modality: "🌀 Mutable",
    gameSlug: "journey-2012",
    spotifyPlaylistId: "55CNLQOcHVx89JDRB96xEX"
  },
  {
    slug: "capricorn",
    name: "Capricorn",
    image: "/assets/signs/capricorn.png",
    element: "🌍 Earth",
    modality: "🎬 Cardinal",
    gameSlug: "altered-beast-1988",
    spotifyPlaylistId: "1SZZsoadwMPnYsMF74KACI"
  },
  {
    slug: "aquarius",
    name: "Aquarius",
    image: "/assets/signs/aquarius.png",
    element: "🌬 Air",
    modality: "🔒 Fixed",
    gameSlug: "simcity-2000-1995",
    spotifyPlaylistId: "52ZQ4IZfKN7Y3viWJIJlmg"
  },
  {
    slug: "pisces",
    name: "Pisces",
    image: "/assets/signs/pisces.png",
    element: "🌊 Water",
    modality: "🌀 Mutable",
    gameSlug: "ecco-the-dolphin-1992",
    spotifyPlaylistId: "5RVNTPy631GnDtI6ekA8iS"
  }
] as const;

export type Sign = typeof SIGNS[number];
export type SignSlug = Sign["slug"];

// Backward-compat alias for existing imports
export const SIGN_LIST = SIGNS;