
import type { Metadata } from "next";
import "./globals.css";
import ZoomBadge from "@/components/ZoomBadge";

export const metadata: Metadata = {
  title: "Z0DI",
  description: "Playlists | Insights | Games",
  openGraph: { title: "Z0DI", description: "Playlists | Insights | Games" },
  twitter: { title: "Z0DI", description: "Playlists | Insights | Games" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ZoomBadge /> {/* shows only in development */}
      </body>
    </html>
  );
}
