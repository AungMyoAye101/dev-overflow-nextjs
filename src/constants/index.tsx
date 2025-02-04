import React from "react";
import {
  FaHome,
  FaLaptop,
  FaMoon,
  FaQuestion,
  FaStar,
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
    label: "Questions",
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
export const answerSort = [
  "Highest Upvotes",
  "Lowest Upvotes",
  "Most Recent",
  "Oldest",
];
export const sortCollection = [
  "Recent",
  "Oldest",
  "Most Voted",
  "Most Viewed",
  "Most Answered",
];
export const searchType = ["questions", "answers", "tags", "users"];
