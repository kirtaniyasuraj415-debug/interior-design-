import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HomeLane Park Street Kolkata | Interior Design Studio",
  description: "HomeLane Park Street, Kolkata — end-to-end home interiors, modular kitchens, wardrobes, 3D design, transparent pricing and installation.",
  icons: {
    icon: "https://super.homelane.com/hlico4.ico",
    shortcut: "https://super.homelane.com/hlico4.ico",
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
