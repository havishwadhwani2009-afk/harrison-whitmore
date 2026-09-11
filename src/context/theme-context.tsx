"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = "hw-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Start at "light" on every render pass, client included, so the client's first
  // paint matches the server-rendered HTML exactly (avoiding a hydration mismatch
  // on anything — like the toggle button's icon/label — that renders differently
  // per theme). The <html> background itself is already correct pre-hydration via
  // the inline themeInitScript, which sets that attribute imperatively, outside
  // React's hydration diffing — only this component's own state starts naive.
  const [theme, setTheme] = useState<Theme>("light");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    const resolved =
      stored === "light" || stored === "dark"
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(resolved);
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    // Guarded by isHydrated so this never fires with the naive "light" default
    // before the hydration effect above has resolved the real theme — otherwise
    // this write-effect and the read-effect above race (and can cancel each
    // other out) under React Strict Mode's double-invoked effects in development.
    if (!isHydrated) return;
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, isHydrated]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

/** Inline script injected before hydration to prevent a light/dark flash. */
export const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('${STORAGE_KEY}');
    var theme = stored === 'light' || stored === 'dark' ? stored : null;
    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();
`;
