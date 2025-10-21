"use client";

import { useEffect, useRef } from "react";
import { useSoundSettings } from "@/components/SoundSettingsProvider";

export function useHoverSound(soundPath: string = "/sounds/tap_03.wav") {
  const audioPoolRef = useRef<HTMLAudioElement[]>([]);
  const currentIndexRef = useRef(0);
  const { muted } = useSoundSettings();
  const isUnlockedRef = useRef(false);

  useEffect(() => {
    // Create a pool of 3 audio elements for better mobile performance
    const poolSize = 3;
    audioPoolRef.current = Array.from({ length: poolSize }, () => {
      const audio = new Audio(soundPath);
      audio.volume = 1;
      audio.preload = "auto";
      audio.load();
      return audio;
    });

    const unlockAudio = () => {
      if (audioPoolRef.current.length === 0 || isUnlockedRef.current) {
        return;
      }

      // Play and immediately pause the first audio to unlock audio context
      const firstAudio = audioPoolRef.current[0];
      const playPromise = firstAudio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          firstAudio.pause();
          firstAudio.currentTime = 0;
          isUnlockedRef.current = true;
        }).catch(() => {
          // Ignore failures; user gesture may not allow playback yet
        });
      }
    };

    const unlockEvents: Array<keyof DocumentEventMap> = ["pointermove", "pointerdown", "keydown", "touchstart"];
    unlockEvents.forEach((eventName) => {
      document.addEventListener(eventName, unlockAudio, { capture: true, passive: true, once: true });
    });

    return () => {
      audioPoolRef.current.forEach((audio) => {
        audio.pause();
      });
      audioPoolRef.current = [];

      unlockEvents.forEach((eventName) => {
        document.removeEventListener(eventName, unlockAudio, { capture: true } as EventListenerOptions);
      });
    };
  }, [soundPath]);

  const playSound = () => {
    if (muted || audioPoolRef.current.length === 0) {
      return;
    }

    // Use round-robin to pick an audio element from the pool
    const audio = audioPoolRef.current[currentIndexRef.current];
    currentIndexRef.current = (currentIndexRef.current + 1) % audioPoolRef.current.length;

    audio.currentTime = 0;
    audio.play().catch(() => {
      // Silently handle autoplay restrictions
    });
  };

  return playSound;
}
