import "./globals.css";
import type { Metadata } from "next";
import { IBM_Plex_Sans_Condensed } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import NavBar from "@/components/wrapper/NavBar";
import FooterWrapper from "@/components/FooterWrapper";
import AnchorHoverSound from "@/components/AnchorHoverSound";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";

const ibm_plex_sans_condensed = IBM_Plex_Sans_Condensed({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://jdel.dev"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Jorge Delgadillo",
    template: "%s | Jorge Delgadillo",
  },
  description: "Software Engineer, optimist, problem solver.",
  openGraph: {
    title: "Jorge Delgadillo",
    description: "Software Engineer, optimist, problem solver.",
    url: "https://jdel.dev",
    siteName: "Jorge Delgadillo",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jorge Delgadillo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jorge Delgadillo",
    description: "Software Engineer, optimist, problem solver.",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={ibm_plex_sans_condensed.className}>
      <body className="antialiased tracking-tight font-ibm_plex_sans_condensed">
        <AnchorHoverSound />
        <ThemeToggle />
        <NavBar />
        <div className="min-h-screen flex flex-col md:pt-0 justify-between">
          <main className="max-w-[60ch] px-8 md:px-0 mx-auto w-full space-y-6 md:pt-20 pt-10">
            {children}
          </main>
          <FooterWrapper>
            <Footer />
          </FooterWrapper>
          <Analytics />
        </div>
      </body>
    </html>
  );
}
