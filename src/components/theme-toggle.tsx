"use client";

import { useTheme } from "@/context/theme-context";
import { SunIcon, MoonIcon } from "./icons";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      className={`group inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-overlay cursor-pointer ${className ?? ""}`}
    >
      {theme === "light" ? (
        <MoonIcon className="h-[18px] w-[18px] transition-transform duration-500 group-hover:-rotate-12" />
      ) : (
        <SunIcon className="h-[18px] w-[18px] transition-transform duration-500 group-hover:rotate-45" />
      )}
    </button>
  );
}
