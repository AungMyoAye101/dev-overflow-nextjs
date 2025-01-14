import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow } from "date-fns";
import qs from "query-string";
import { BADGE_CRITERIA } from "../constants";

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

export const assignedBadge = (params: any) => {
  const badgeCount = {
    GOLD: 0,
    SILVER: 0,
    BRONZE: 0,
  };
  const { criteria } = params;
  criteria.map((item: any) => {
    const { type, count } = item;
    //@ts-ignore
    const badgeLevels: any = BADGE_CRITERIA[type];
    Object.keys(badgeLevels).forEach((level) => {
      if (count >= badgeLevels[level]) {
        //@ts-ignore
        badgeCount[level] += 1;
      }
    });
  });
  return badgeCount;
};
