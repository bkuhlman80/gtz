# Z0DI is the app's overarching brand. GTZ is the first implementation (v0).

# GTZ = Gaming the Zodiac

**Gaming the Zodiac** is a Next.js 15 app that blends astrology, Spotify playlists, and retro gaming.

## Features

- **Dynamic landing page (`/`)**
  - Hero section with logo, zodiac wheel, and intro
  - Grid of 12 zodiac sign cards
  - Substack subscription embed

- **Sign pages (`/[slug]`)**
  - Each of the 12 signs has an MDX file in `/content`
  - MDX includes: curated Spotify playlist + retro game recommendation
  - Components: `SpotifyEmbed`, `GameCover`, `ZoomImg`, `SubstackPostCard`

- **Substack integration**
  - `/api/rss-proxy`: fetches Substack RSS safely
  - `/api/revalidate`: triggers Next.js ISR revalidation
  - GitHub Action (`.github/workflows/substack.yml`): runs every 30 minutes
    - Pulls fresh Substack feed via `scripts/fetch-substack.mjs`
    - Writes JSON cache into `/data/substack`
    - Site uses cached data at runtime (`src/lib/substack-live.ts`)

- **Content & media**
  - `/content/*/gaming_*.mdx`: 12 posts, one per sign
  - `/public/assets`: brand/logo, hero art, zodiac icons
  - `/public/og`: Open Graph images for sharing links
  - `/public/playlists`: screenshots of Spotify playlists
  - `/public/games`: retro game cover art

- **Deployment**
  - Built with Next.js 15 (App Router, MDX support)
  - Hosted on Vercel (builds from `main` branch)
  - Incremental Static Regeneration for fresh Substack content

## Development

```bash
npm ci
npm run dev     # start dev server
npm run build   # production build
npm run start   # run prod build locally
