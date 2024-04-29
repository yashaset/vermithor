import type { Metadata } from "next";
import { Raleway, Pacifico } from "next/font/google";
import "./globals.css";

const pacifico = Pacifico({ subsets: ["latin"], weight: ["400"],variable: '--font-pacifico'  });
const raleway = Raleway({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"],variable: '--font-raleway' });

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
      <body className={`${pacifico.variable} ${raleway.variable}`}>{children}</body>
    </html>
  );
}
