"use client";

import clsx from "clsx";
import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";
import { useRef, useState } from "react";

type ThemeToggleProps = {
  className?: string;
};

export default function ThemeToggle({ className }: ThemeToggleProps) {
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
      className={clsx(
        "flex items-center justify-center cursor-pointer rounded-full p-2 text-foreground transition-colors duration-200 hover:text-accent",
        resolvedTheme === "dark" ? "hover:bg-neutral-800" : "hover:bg-neutral-200",
        className
      )}
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
