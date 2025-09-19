"use client";

import clsx from "clsx";
import Image from "next/image";
import { useCallback, useState, type CSSProperties } from "react";

type SkeletonImageProps = {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  loading?: "lazy" | "eager";
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  onLoadingComplete?: (img: HTMLImageElement) => void;
};

export function SkeletonImage({
  src,
  alt,
  className,
  wrapperClassName,
  width,
  height,
  sizes,
  priority,
  quality,
  loading,
  placeholder,
  blurDataURL,
  onLoadingComplete,
}: SkeletonImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const aspectRatio = width && height ? width / height : 3 / 4;
  const maxWidth = width ? `${width}px` : undefined;

  const containerStyle: CSSProperties = {
    aspectRatio,
    maxWidth,
  };

  const handleLoadingComplete = useCallback(
    (img: HTMLImageElement) => {
      setIsLoaded(true);
      onLoadingComplete?.(img);
    },
    [onLoadingComplete]
  );

  return (
    <div
      className={clsx(
        "group relative w-full overflow-hidden rounded-lg",
        wrapperClassName
      )}
      style={containerStyle}
    >
      <div
        aria-hidden="true"
        className={clsx(
          "pointer-events-none absolute inset-0 z-10 rounded-lg transition-opacity duration-500 ease-in-out motion-reduce:transition-none",
          isLoaded ? "opacity-0" : "opacity-100"
        )}
      >
        <div className="h-full w-full animate-pulse rounded-lg bg-neutral-200/90 dark:bg-neutral-800/90 motion-reduce:animate-none" />
      </div>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        quality={quality}
        loading={loading}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        sizes={
          sizes ??
          (width
            ? `(max-width: 768px) 100vw, ${width}px`
            : "(max-width: 768px) 100vw, 400px")
        }
        className={clsx(
          "h-full w-full object-cover transition-[opacity,transform,filter] duration-700 ease-out motion-reduce:filter-none motion-reduce:transform-none motion-reduce:transition-none motion-reduce:opacity-100",
          isLoaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-105 blur-sm",
          className
        )}
        onLoadingComplete={handleLoadingComplete}
      />
    </div>
  );
}
