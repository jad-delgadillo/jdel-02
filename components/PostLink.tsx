// components/PostLink.tsx
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
    <li>
      <Link href={href} className="w-full justify-between flex hover:bg-neutral-800 transition-all rounded-lg px-2 py-1">
       <span className="text-blue-500 underline-offset-4 underline">{title}</span>   <span className="text-sm translate-y-0.5 text-gray-500">{formattedDate}</span>
      </Link>
    </li>
  );
}
