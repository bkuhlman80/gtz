import "./globals.css";

export const metadata = { title: "Welcome to the Starcade", description: "Such a Zodiac!" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0f0f10] text-[#e9dfcf] antialiased">{children}</body>
    </html>
  );
}
