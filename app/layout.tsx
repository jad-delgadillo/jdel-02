import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import { Analytics } from "@vercel/analytics/react";
import NavBar from "@/components/wrapper/NavBar";

const inter = Inter({ subsets: ["latin"] });

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" className={`${inter.className}`}>
        <body className="antialiased tracking-tight">
          <NavBar />
          <div className="min-h-screen flex flex-col justify-between md:pt-8 p-8 bg-[#18181A] text-neutral-100">
            <main className="max-w-[60ch] mx-auto w-full space-y-6 pt-20">
              {children}
            </main>
            <Footer />
            <Analytics />
          </div>
        </body>
      </html>
    </ViewTransitions>
  );
}

function Footer() {
  const links = [
    { name: "@jdel", url: "https://instagram.com/jdel.dev/" },
    { name: "youtube", url: "https://www.youtube.com/" },
    { name: "linkedin", url: "https://www.linkedin.com/in/jdeldev" },
    { name: "github", url: "https://github.com/jad-delgadillo" },
  ];

  return (
    <footer className="md:py-8 py-20 mt-auto">
      <div className="flex justify-center space-x-4 tracking-tight">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-200 transition-colors duration-200"
          >
            {link.name}
          </a>
        ))}
      </div>
    </footer>
  );
}
