import { Home, Laptop, Moon, ShieldQuestion, Star, Sun, Tag, User, UserRound } from "lucide-react";


export const themeOptions = [
  {
    value: "light",
    label: "Light",
    icon: <Sun />,
  },
  {
    value: "dark",
    label: "Dark",
    icon: <Moon />,
  },
  {
    value: "system",
    label: "System",
    icon: <Laptop />,
  },
];

export const sideLinks = [
  {
    label: "Home",
    icon: <Home />,
    href: "/",
  },
  {
    label: "Community",
    icon: <UserRound />,
    href: "/community",
  },
  {
    label: "Collection",
    icon: <Star />,
    href: "/collection",
  },
  {
    label: "Tags",
    icon: <Tag />,
    href: "/tags",
  },

  {
    label: "Questions",
    icon: <ShieldQuestion />,
    href: "/question",
  },
  {
    label: "Profile",
    icon: <User />,
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
