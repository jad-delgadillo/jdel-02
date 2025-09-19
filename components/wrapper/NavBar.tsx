"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function NavBar() {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navItems = [
    { name: "About", href: "/" },
    { name: "Code", href: "/code" },
    { name: "Writing", href: "/writing" },
    { name: "Art", href: "/art" },
  ];

  return (
    <div className="md:pt-20 pt-10 mx-auto bg-neutral-100 w-full absolute z-20 ">
      <nav className="md:max-w-[60ch] md:px-0 px-8 mx-auto  gap-5 flex">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className="relative"
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <h2
                className={`transition-colors duration-200 ${isActive ? "text-black" : "text-neutral-500"
                  }`}
              >
                {item.name}
              </h2>
              {(hoveredItem === item.name || isActive) && (
                <span
                  className="absolute -bottom-[0.5px] left-0 w-full h-[0.5px] bg-black  transform origin-left"
                  style={{
                    animation:
                      hoveredItem === item.name
                        ? "expandWidth 0.2s ease-out forwards"
                        : "",
                  }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
