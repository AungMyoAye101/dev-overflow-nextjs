import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const timestamp = (time: Date) => {
  const formatDate = formatDistanceToNow(new Date(time), { addSuffix: true });
  return formatDate;
};
