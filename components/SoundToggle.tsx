"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { useSoundSettings } from "@/components/SoundSettingsProvider";
import { Volume2, VolumeX } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

type SoundToggleProps = {
  className?: string;
};

export default function SoundToggle({ className }: SoundToggleProps) {
  const { muted, toggleMuted } = useSoundSettings();
  const { resolvedTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(resolvedTheme === "dark");

  useEffect(() => {
    const root = document.documentElement;
    const update = () => setIsDarkMode(root.classList.contains("dark"));
    update();

    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return (
    <button
      onClick={toggleMuted}
      className={clsx(
        "flex items-center justify-center cursor-pointer rounded-full p-2 text-foreground transition-colors duration-200 hover:text-accent",
        isDarkMode ? "hover:bg-neutral-800" : "hover:bg-neutral-200",
        className
      )}
      aria-label={muted ? "Unmute hover sounds" : "Mute hover sounds"}
    >
      {muted ? (
        <VolumeX className="w-4 h-4 text-foreground" />
      ) : (
        <Volume2 className="w-4 h-4 text-foreground" />
      )}
    </button>
  );
}
