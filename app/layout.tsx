import type { Metadata } from "next";
import { Syne, DM_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yash Rawat — Software Engineer (UI)",
  description:
    "Portfolio of Yash Rawat, a Software Engineer specialising in React, Next.js, TypeScript, and performance engineering.",
  keywords: ["React", "Next.js", "TypeScript", "Frontend", "Software Engineer"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmMono.variable}`}>
      <body className="font-syne bg-[#0a0a0a] text-ink">{children}</body>
    </html>
  );
}
