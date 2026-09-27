import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="page-scroller bg-background">
          <div className="min-h-full flex justify-center">
            <div className="w-full max-w-2xl flex flex-col p-8 sm:p-20 border-x">
              <Header />
              <div className="flex-1 flex flex-col justify-center py-12">
                {children}
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
