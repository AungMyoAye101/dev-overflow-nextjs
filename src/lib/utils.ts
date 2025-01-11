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
