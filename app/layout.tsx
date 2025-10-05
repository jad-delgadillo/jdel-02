import "./globals.css";
import type { Metadata } from "next";
import { IBM_Plex_Sans_Condensed } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import NavBar from "@/components/wrapper/NavBar";
import { ArrowUpRight } from 'lucide-react';
import FooterWrapper from "@/components/FooterWrapper";

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
    <html lang="en" className={`bg-neutral-100 ${ibm_plex_sans_condensed.className}`}>
      <body className="antialiased tracking-tight font-ibm_plex_sans_condensed">
        <NavBar />
        <div className="min-h-screen flex flex-col md:pt-0 bg-neutral-100 justify-between">
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

function Footer() {
  const links = [
    { name: "instagram", url: "https://instagram.com/alwaysjad" },
    { name: "linkedin", url: "https://www.linkedin.com/in/jdeldev" },
    { name: "github", url: "https://github.com/jad-delgadillo" },
  ];

  return (
    <footer className="mb-8 md:mb-8">
      <div className="max-w-[60ch] md:px-0 px-8 mx-auto flex justify-start space-x-4 tracking-tight">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-black hover:text-blue-800 transition-colors duration-200"
          >
            {link.name}
            <ArrowUpRight className="w-3 h-3" />
          </a>
        ))}
      </div>
    </footer>
  );
}
