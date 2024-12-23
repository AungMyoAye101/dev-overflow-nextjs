import React from "react";
import {
  FaHome,
  FaLaptop,
  FaLayerGroup,
  FaMoon,
  FaObjectGroup,
  FaPeopleArrows,
  FaQuestion,
  FaQuestionCircle,
  FaStar,
  FaSuitcase,
  FaSun,
  FaTag,
  FaUser,
  FaUserFriends,
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
    icon: <FaUserFriends />,
    href: "/community",
  },
  {
    label: "Collection",
    icon: <FaStar />,
    href: "/collection",
  },
  {
    label: "Tags",
    icon: <FaTag />,
    href: "/tags",
  },
  {
    label: "Find Jobs",
    icon: <FaSuitcase />,
    href: "/profile",
  },
  {
    label: "Ask a Questions",
    icon: <FaQuestion />,
    href: "/questions",
  },
];
