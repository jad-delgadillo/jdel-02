"use client";

import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function NavBar() {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navItems = [
    { name: "About", href: "/" },
    { name: "Writing", href: "/writing" },
    { name: "Code", href: "/code" },
    { name: "Art", href: "/art" },
  ];

  return (
    <div className="pt-20 mx-auto bg-[#18181A] w-full ">
      <nav className="max-w-[60ch] mx-auto justify-end gap-5 flex">
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
                className={`transition-colors duration-200 ${
                  isActive ? "text-white" : "text-gray-400"
                }`}
              >
                {item.name}
              </h2>
              {(hoveredItem === item.name || isActive) && (
                <span
                  className="absolute -bottom-[0.5px] left-0 w-full h-[0.5px] bg-white  transform origin-left"
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
