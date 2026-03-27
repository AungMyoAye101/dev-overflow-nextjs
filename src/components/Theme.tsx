"use client";

import { ThemeContextProps } from "@/src/type";
import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState("system");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (nextMode: string) => {
      const resolvedMode =
        nextMode === "system"
          ? mediaQuery.matches
            ? "dark"
            : "light"
          : nextMode;

      document.documentElement.classList.toggle("dark", resolvedMode === "dark");
    };

    const storedMode = localStorage.getItem("theme") ?? "system";
    setMode(storedMode);
    applyTheme(storedMode);

    const handleSystemThemeChange = () => {
      if ((localStorage.getItem("theme") ?? "system") === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, []);

  const updateMode = (nextMode: string) => {
    setMode(nextMode);

    if (nextMode === "system") {
      localStorage.removeItem("theme");
    } else {
      localStorage.setItem("theme", nextMode);
    }

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const resolvedMode =
      nextMode === "system" ? (prefersDark ? "dark" : "light") : nextMode;

    document.documentElement.classList.toggle("dark", resolvedMode === "dark");
  };

  return (
    <ThemeContext.Provider value={{ mode, setMode: updateMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
