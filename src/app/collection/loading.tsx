import React from "react";
import { Skeleton } from "@/src/components/ui/skeleton";

const loading = () => {
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
        <div className="flex flex-col gap-6">
          {Array(9)
            .fill(null)
            .map((_, i) => (
              <Skeleton className="h-60 w-full" key={i} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default loading;
