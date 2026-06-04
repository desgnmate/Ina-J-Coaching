import type { Metadata } from "next";
import { Caveat, Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { SmoothScroll } from "@/components/shared/SmoothScroll";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://coaching.inajphotography.com"),
  title: {
    default:
      "Ina J Coaching — Business & Marketing Coaching for Pet Photographers",
    template: "%s · Ina J Coaching",
  },
  description:
    "Practical marketing and business coaching for pet photographers who want clearer messaging, intentional marketing, and consistent bookings — from an award-winning pet photographer and Sony Digital Imaging Advocate.",
  keywords: [
    "pet photography coaching",
    "photography business coach",
    "pet photographer marketing",
    "photography mentoring",
    "Ina J",
  ],
  authors: [{ name: "Ina Jalil" }],
  creator: "Ina J Photography",
  openGraph: {
    type: "website",
    locale: "en_AU",
    title: "Ina J Coaching — Coaching for Pet Photographers",
    description:
      "Marketing and business coaching from an award-winning pet photographer. Build a pet photography business that books consistently.",
    siteName: "Ina J Coaching",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ina J Coaching",
    description: "Coaching for pet photographers who want consistent bookings.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} ${caveat.variable} antialiased`}
    >
      <body
        className="flex min-h-screen flex-col bg-cream text-ink"
        suppressHydrationWarning
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-terracotta focus:px-5 focus:py-2 focus:text-cream"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <ScrollToTop />
        <SmoothScroll>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
