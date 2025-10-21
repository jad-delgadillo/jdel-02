"use client";

import { useEffect, useRef } from "react";
import { useSoundSettings } from "@/components/SoundSettingsProvider";

export function useHoverSound(soundPath: string = "/sounds/tap_03.wav") {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { muted } = useSoundSettings();

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio(soundPath);
    audioRef.current.volume = 1; // Adjust volume (0.0 to 1.0)
    audioRef.current.preload = "auto";

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [soundPath]);

  const playSound = () => {
    if (muted) {
      return;
    }
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset to start
      audioRef.current.play().catch((error) => {
        // Silently handle autoplay restrictions
        console.debug("Audio play failed:", error);
      });
    }
  };

  return playSound;
}
