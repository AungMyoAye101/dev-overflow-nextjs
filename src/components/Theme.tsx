"use client";

import { ThemeContextProps } from "@/src/type";
import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState("");

  const handleTheme = () => {
    //@ts-nocheck
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setMode("dark"), document.documentElement.classList.add("dark");
    } else {
      setMode("light"), document.documentElement.classList.remove("dark");
    }
  };
  useEffect(() => {
    handleTheme();
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
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
