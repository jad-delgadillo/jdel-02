"use client";

import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";
import { useRef, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleTheme = async () => {
    if (!buttonRef.current || isAnimating) return;

    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const isDark = resolvedTheme === "dark";
    const newTheme = isDark ? "light" : "dark";

    setIsAnimating(true);

    // Check if View Transitions API is supported
    if (!document.startViewTransition) {
      setTheme(newTheme);
      setIsAnimating(false);
      return;
    }

    // Use View Transitions API
    const transition = document.startViewTransition(() => {
      setTheme(newTheme);
    });

    // Wait for transition to be ready, then apply custom animation
    await transition.ready;

    // Apply circular reveal animation
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius * 2}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 600,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );

    await transition.finished;
    setIsAnimating(false);
  };

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-50 p-1 rounded-full bg-surface-strong hover:cursor-pointer hover:bg-surface transition-all duration-200 shadow-lg border border-border"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="w-4 h-4 text-foreground" />
      ) : (
        <Moon className="w-4 h-4 text-foreground" />
      )}
    </button>
  );
}
