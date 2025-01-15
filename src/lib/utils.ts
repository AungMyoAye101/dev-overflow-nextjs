import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow } from "date-fns";
import qs from "query-string";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const timestamp = (time: Date) => {
  const formatDate = formatDistanceToNow(new Date(time), { addSuffix: true });
  return formatDate;
};

interface FormQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export const formQuery = ({ params, key, value }: FormQueryParams) => {
  const currentUrl = qs.parse(params);
  currentUrl[key] = value;
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

interface RemoveFormQueryParams {
  params: string;
  keyToRemove: string[];
}
export const removeFormQuery = ({
  params,
  keyToRemove,
}: RemoveFormQueryParams) => {
  const currentUrl = qs.parse(params);
  keyToRemove.forEach((key) => {
    delete currentUrl[key];
  });
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

type Criterion = {
  type: string;
  count: number;
};
type CriteriaParams = {
  criteria: Criterion[];
};

type BadgeLevels = Record<string, number>;

export const BADGE_CRITERIA: Record<string, BadgeLevels> = {
  Questions_count: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  Answers_count: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  Questions_Upvotes: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  Answers_Upvotes: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  Total_Views: {
    BRONZE: 100,
    SILVER: 1000,
    GOLD: 10000,
  },
};

export interface Bagde_Counts {
  GOLD: number;
  SILVER: number;
  BRONZE: number;
}

export const assignedBadge = (params: CriteriaParams) => {
  const badgeCount: Record<string, number> = {
    GOLD: 0,
    SILVER: 0,
    BRONZE: 0,
  };
  const { criteria } = params;
  criteria.map((item) => {
    const { type, count } = item;

    const badgeLevels = BADGE_CRITERIA[type];
    if (!badgeLevels) {
      console.warn(`Invalid type in criteria: ${type}`);
      return; // Skip processing if type is invalid
    }

    Object.keys(badgeLevels).forEach((level) => {
      if (count >= badgeLevels[level]) {
        badgeCount[level] += 1;
      }
    });
  });

  return badgeCount;
};
