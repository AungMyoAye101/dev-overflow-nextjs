import React from "react";
import {
  FaHome,
  FaLaptop,
  FaLayerGroup,
  FaMoon,
  FaQuestionCircle,
  FaSun,
  FaTag,
  FaUser,
} from "react-icons/fa";
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

export const sideLinks = [
  {
    label: "Home",
    icon: <FaHome />,
    href: "/",
  },
  {
    label: "Community",
    icon: <FaLayerGroup />,
    href: "/community",
  },
  {
    label: "Tags",
    icon: <FaTag />,
    href: "/tags",
  },
  {
    label: "Questions",
    icon: <FaQuestionCircle />,
    href: "/questions",
  },
  {
    label: "Profile",
    icon: <FaUser />,
    href: "/profile",
  },
];
