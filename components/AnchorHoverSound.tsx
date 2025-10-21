"use client";

import { useEffect } from "react";
import { useHoverSound } from "@/hooks/useHoverSound";

export default function AnchorHoverSound() {
  const playHoverSound = useHoverSound();

  useEffect(() => {
    let lastAnchor: HTMLElement | null = null;

    const getAnchorFromEvent = (eventTarget: EventTarget | null) => {
      if (!(eventTarget instanceof Element)) {
        return null;
      }
      const anchor = eventTarget.closest("a");
      return anchor instanceof HTMLElement ? anchor : null;
    };

    const handlePointerOver = (event: PointerEvent) => {
      // Skip hover sounds for touch devices
      if (event.pointerType === "touch" || event.pointerType === "pen") {
        return;
      }

      const anchor = getAnchorFromEvent(event.target);
      if (!anchor || lastAnchor === anchor) {
        return;
      }

      lastAnchor = anchor;
      playHoverSound();
    };

    const handlePointerOut = (event: PointerEvent) => {
      const anchor = getAnchorFromEvent(event.target);
      if (!anchor) {
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

    const handlePointerDown = (event: PointerEvent) => {
      // Only play sound on touch/pen down
      if (event.pointerType !== "touch" && event.pointerType !== "pen") {
        return;
      }

      const anchor = getAnchorFromEvent(event.target);
      if (!anchor) {
        return;
      }

      playHoverSound();
    };

    document.addEventListener("pointerover", handlePointerOver, true);
    document.addEventListener("pointerout", handlePointerOut, true);
    document.addEventListener("pointerdown", handlePointerDown, true);

    return () => {
      document.removeEventListener("pointerover", handlePointerOver, true);
      document.removeEventListener("pointerout", handlePointerOut, true);
      document.removeEventListener("pointerdown", handlePointerDown, true);
    };
  }, [playHoverSound]);

  return null;
}
