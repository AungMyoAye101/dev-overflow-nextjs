import React from "react";
import { FaLaptop, FaMoon, FaSun } from "react-icons/fa";
export const themeOptions = [
  {
    value: "light",
    label: "Light",
    icon: <FaSun />,
  },
  {
    value: "dark",
    label: "Dark",
    icon: <FaMoon />,
  },
  {
    value: "system",
    label: "System",
    icon: <FaLaptop />,
  },
];
