"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import clsx from "clsx";

export function SkeletonImage(props: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-[400px] h-[400px]">
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-gray-300 dark:bg-gray-700 rounded-lg" />
      )}
      <Image
        {...props}
        onLoadingComplete={() => setIsLoading(false)}
        className={clsx(
          "rounded-lg transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
      />
    </div>
  );
}
