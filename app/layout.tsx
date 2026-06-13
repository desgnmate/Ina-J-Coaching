import type { Metadata } from "next";
import { Caveat, DM_Sans, Playfair_Display } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { SmoothScroll } from "@/components/shared/SmoothScroll";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://inajeducation.com"),
  title: {
    default: "Ina J Education — Business Coaching for Pet Photographers",
    template: "%s · Ina J Education",
  },
  description:
    "Business coaching for pet photographers who want clearer positioning, stronger marketing, and more consistent bookings, from a photographer who is still actively in the business.",
  keywords: [
    "pet photography coaching",
    "photography business coach",
    "pet photographer marketing",
    "pet photographer education",
    "Ina J",
  ],
  authors: [{ name: "Ina Jalil" }],
  creator: "Ina J Education",
  openGraph: {
    type: "website",
    locale: "en_AU",
    title: "Ina J Education — Business Coaching for Pet Photographers",
    description:
      "Business coaching for pet photographers who want a clearer path to steadier bookings and a stronger studio.",
    siteName: "Ina J Education",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ina J Education",
    description:
      "Business coaching for pet photographers who want clearer positioning and more consistent bookings.",
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfairDisplay.variable} ${dmSans.variable} ${caveat.variable} antialiased`}
    >
      <body
        className={`flex min-h-screen flex-col bg-cream text-ink ${isAdmin ? "overflow-hidden" : ""}`}
        suppressHydrationWarning
      >
        {!isAdmin && (
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-terracotta focus:px-5 focus:py-2 focus:text-cream"
          >
            Skip to content
          </a>
        )}
        {!isAdmin && <ScrollProgress />}
        {!isAdmin && <ScrollToTop />}
        <SmoothScroll>
          {!isAdmin && <Header />}
          <main id="main" className="flex-1">
            {children}
          </main>
          {!isAdmin && <Footer />}
        </SmoothScroll>
      </body>
    </html>
  );
}
