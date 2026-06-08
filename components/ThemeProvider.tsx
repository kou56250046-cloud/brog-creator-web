"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type ThemeCtx = { theme: Theme; toggle: () => void };

const Ctx = createContext<ThemeCtx>({ theme: "light", toggle: () => {} });

export function useTheme() {
  return useContext(Ctx);
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const resolved = stored ?? (prefersDark ? "dark" : "light");
    setTheme(resolved);
    document.documentElement.setAttribute("data-theme", resolved);
  }, []);

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  }

  return <Ctx.Provider value={{ theme, toggle }}>{children}</Ctx.Provider>;
}
