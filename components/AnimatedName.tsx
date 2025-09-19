"use client";

import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";

const NAME = "Jorge Delgadillo";
const HANDLE = "@jdel.dev";

export function AnimatedName() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setIsMounted(true), 40);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <Link
      href="/"
      className="group relative inline-flex flex-col gap-1 text-neutral-600 transition-colors duration-300 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-500"
    >
      <span

      >
        {NAME}
      </span>
    </Link>
  );
}
