import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Z0DI",
  description: "Playlists | Insights | Games",
  openGraph: { title: "Z0DI", description: "Playlists | Insights | Games" },
  twitter: { title: "Z0DI", description: "Playlists | Insights | Games" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0f0f10] text-[#e9dfcf] antialiased">{children}</body>
    </html>
  );
}
