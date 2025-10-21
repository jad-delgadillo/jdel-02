"use client";

import { useEffect } from "react";
import { useHoverSound } from "@/hooks/useHoverSound";

export default function AnchorHoverSound() {
  const playHoverSound = useHoverSound();

  useEffect(() => {
    let lastAnchor: HTMLElement | null = null;

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest("a");
      if (!(anchor instanceof HTMLElement)) {
        return;
      }

      if (lastAnchor === anchor) {
        return;
      }

      lastAnchor = anchor;
      playHoverSound();
    };

    const handleMouseOut = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest("a");
      if (!(anchor instanceof HTMLElement)) {
        return;
      }

      const related = event.relatedTarget;
      if (related instanceof Node && anchor.contains(related)) {
        return;
      }

      if (lastAnchor === anchor) {
        lastAnchor = null;
      }
    };

    document.addEventListener("mouseover", handleMouseOver, true);
    document.addEventListener("mouseout", handleMouseOut, true);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver, true);
      document.removeEventListener("mouseout", handleMouseOut, true);
    };
  }, [playHoverSound]);

  return null;
}
