import "./globals.css";

export const metadata = { title: "Gaming the Zodiac", description: "Mixtapes from the Messenger" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0f0f10] text-[#e9dfcf] antialiased">{children}</body>
    </html>
  );
}
