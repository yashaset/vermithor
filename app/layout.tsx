import type { Metadata } from "next";
import { Inter, Pacifico } from "next/font/google";
import "./globals.css";

const pacifico = Pacifico({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Yash Rawat | Portfolio",
  description: "Software Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={pacifico.className}>{children}</body>
    </html>
  );
}
