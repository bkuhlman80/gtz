import type { Metadata } from "next";
import "./globals.css";
import ZoomBadge from "@/components/ZoomBadge";

export const metadata: Metadata = {
  metadataBase: new URL("https://gtz-one.vercel.app"),
  title: "Z0DI",
  description: "Playlists | Insights | Games",
  openGraph: {
    title: "Z0DI",
    description: "Playlists | Insights | Games",
    images: ["/og/home.png"],   // lives in /public/og/home.png
  },
  twitter: {
    card: "summary_large_image",
    title: "Z0DI",
    description: "Playlists | Insights | Games",
    images: ["/og/home.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ZoomBadge />
      </body>
    </html>
  );
}
