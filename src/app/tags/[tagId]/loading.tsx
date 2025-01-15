import React from "react";
import { Skeleton } from "@/src/components/ui/skeleton";

const TagsDetailLoading = () => {
  return (
    <div className="page_padding ">
      <Skeleton className="h-10 w-60" />

      <Skeleton className="h-10 w-full" />

      <div className="flex flex-col gap-6">
        {Array(9)
          .fill(null)
          .map((_, i) => (
            <Skeleton className="h-60 w-full" key={i} />
          ))}
      </div>
    </div>
  );
};

export default TagsDetailLoading;
