import type { Metadata } from "next";
import { Inter, Geist_Mono, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  axes: ["opsz"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const devanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Tanay Agrawal",
  description: "Tanay's Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistMono.variable} ${devanagari.variable} antialiased`}
      >
        <div className="page-scroller bg-background">
          <div className="min-h-full flex justify-center">
            <div className="relative w-full max-w-[668px] flex flex-col px-7 sm:px-16 pt-24 sm:pt-[120px] pb-20 sm:pb-[111px] border-x">
              <AnimatedThemeToggler className="absolute top-4 right-4" />
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
