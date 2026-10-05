import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Creative Interiorz | Interior Designer in Manikonda, Hyderabad",
  description: "Creative Interiorz — modular kitchens, wardrobes, false ceilings, TV units, custom furniture and interior finishes in Manikonda, Hyderabad.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
