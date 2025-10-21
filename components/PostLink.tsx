// components/PostLink.tsx
"use client";

import Link from "next/link";


export function PostLink({
  href,
  title,
  date,
}: {
  href: string;
  title: string;
  date: string | Date;
}) {

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
  return (
    <div className="flex items-center">
      <Link 
        href={href} 
        className="w-full justify-between flex transition-all rounded-lg"

      >
        <span className="underline-offset-4 underline">{title}</span>   <span className="text-sm translate-y-0.5 text-muted">{formattedDate}</span>
      </Link>

    </div>
  );
}
