"use client";

import { ThemeContextProps } from "@/type";
import React, { useContext, useEffect, useState } from "react";
import { createContext } from "vm";

const ThemeContext = createContext<ThemeContextProps | undefined>();

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState("");

  const handleTheme = () => {
    if (mode === "dark") {
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

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
