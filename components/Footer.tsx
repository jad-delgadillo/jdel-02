"use client";

import { ArrowUpRight } from 'lucide-react';


export default function Footer() {

  
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
            className="flex items-center space-x-2 transition-colors duration-200"

          >
            {link.name}
            <ArrowUpRight className="w-3 h-3" />
          </a>
        ))}
      </div>
    </footer>
  );
}
