"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface SoundSettingsContextValue {
  muted: boolean;
  toggleMuted: () => void;
  setMuted: (value: boolean) => void;
}

const SoundSettingsContext = createContext<SoundSettingsContextValue | null>(null);

export function SoundSettingsProvider({ children }: { children: React.ReactNode }) {
  const [muted, setMutedState] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("sound-muted");
    if (stored !== null) {
      setMutedState(stored === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sound-muted", muted ? "true" : "false");
  }, [muted]);

  const toggleMuted = () => setMutedState((prev) => !prev);
  const setMuted = (value: boolean) => setMutedState(value);

  const value = useMemo(() => ({ muted, toggleMuted, setMuted }), [muted]);

  return (
    <SoundSettingsContext.Provider value={value}>
      {children}
    </SoundSettingsContext.Provider>
  );
}

export function useSoundSettings() {
  const context = useContext(SoundSettingsContext);
  if (!context) {
    throw new Error("useSoundSettings must be used within a SoundSettingsProvider");
  }
  return context;
}
