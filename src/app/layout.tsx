import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SplashCursor from "../components/SplashCursor";
import PortfolioIntro from "../components/ui/PortfolioIntro";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Susatwik Manuri | AI-Driven Full-Stack Developer",
  description:
    "AI-Driven Full-Stack Developer building intelligent, scalable systems using MERN, LLMs, and automation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <PortfolioIntro />
        <SplashCursor />
        {children}
      </body>
    </html>
  );
}
