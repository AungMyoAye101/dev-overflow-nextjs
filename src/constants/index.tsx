import React from "react";
import {
  FaHome,
  FaLaptop,
  FaMoon,
  FaQuestion,
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
    href: "/job",
  },
  {
    label: "Ask a Questions",
    icon: <FaQuestion />,
    href: "/question",
  },
  {
    label: "Profile",
    icon: <FaUser />,
    href: "/profile",
  },
];

export const filteredSearch = ["Newest", "Recommend", "Frequent", "Unanswered"];
export const sortUsers = ["New Users", "Old Users", "Top Contributors"];
export const sortTags = ["Popular", "Recent", "Name", "Old"];
export const sortCollection = ["New Users", "Old Users", "Top Contributors"];
