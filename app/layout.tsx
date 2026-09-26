import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Furnt — Designed to Fit Your Life",
  description: "Timeless wooden furniture, thoughtful craftsmanship, and interiors made for the way you live. Discover the Furnt collection.",
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
