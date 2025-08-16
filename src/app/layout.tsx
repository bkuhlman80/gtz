import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZODI",
  description: "Zodiac playlists + retro game pairings.",
  openGraph: { title: "Hello, Zodiacs", description: "Zodiac playlists + retro game pairings." },
  twitter: { title: "Hello, Zodiacs", description: "Zodiac playlists + retro game pairings." },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0f0f10] text-[#e9dfcf] antialiased">{children}</body>
    </html>
  );
}
