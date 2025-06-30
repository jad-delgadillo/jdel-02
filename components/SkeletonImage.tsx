// SkeletonImage.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";

export function SkeletonImage({
  alt,
  src,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full max-w-[400px] aspect-[3/4]">
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-neutral-800 dark:bg-neutral-800 rounded-lg" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 400px"
        onLoadingComplete={() => setIsLoading(false)}
        className={clsx(
          "rounded-lg object-cover transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
      />
    </div>
  );
}
