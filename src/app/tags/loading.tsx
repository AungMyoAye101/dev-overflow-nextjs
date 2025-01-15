import React from "react";
import { Skeleton } from "@/src/components/ui/skeleton";

const TagsLoading = () => {
  return (
    <div className="page_padding ">
      <Skeleton className="h-10 w-60" />

      <div className="flex flex-col sm:flex-row lg:flex-col justify-between gap-6">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full sm:w-40 lg:hidden" />
        <div className="hidden lg:flex gap-4 ">
          <Skeleton className="h-10 w-20" /> <Skeleton className="h-10 w-24" />{" "}
          <Skeleton className="h-10 w-32" /> <Skeleton className="h-10 w-36" />
        </div>
        <div className="flex flex-wrap gap-4">
          {Array(6)
            .fill(null)
            .map((_, i) => (
              <div
                key={i}
                className="bg_dark_white flex  items-center  gap-4 px-4 py-6 shadow_rounded w-fit"
              >
                <Skeleton className="h-10 w-16" />
                <Skeleton className="h-8 w-20" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TagsLoading;
