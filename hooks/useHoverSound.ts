"use client";

import { useEffect, useRef } from "react";
import { useSoundSettings } from "@/components/SoundSettingsProvider";

export function useHoverSound(soundPath: string = "/sounds/tap_03.wav") {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { muted } = useSoundSettings();
  const isUnlockedRef = useRef(false);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio(soundPath);
    audioRef.current.volume = 1; // Adjust volume (0.0 to 1.0)
    audioRef.current.preload = "auto";

    const unlockAudio = () => {
      if (!audioRef.current || isUnlockedRef.current) {
        return;
      }

      audioRef.current.play().then(() => {
        if (!audioRef.current) {
          return;
        }
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        isUnlockedRef.current = true;
      }).catch(() => {
        // Ignore failures; user gesture may not allow playback yet
      });
    };

    const unlockEvents: Array<keyof DocumentEventMap> = ["pointermove", "pointerdown", "keydown", "touchstart"];
    unlockEvents.forEach((eventName) => {
      document.addEventListener(eventName, unlockAudio, { capture: true, passive: true, once: true });
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      unlockEvents.forEach((eventName) => {
        document.removeEventListener(eventName, unlockAudio, { capture: true } as EventListenerOptions);
      });
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
