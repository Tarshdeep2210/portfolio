import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tarshdeep Kaur | 3D Portfolio",
  description: "3D developer portfolio built with Next.js and Three.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}