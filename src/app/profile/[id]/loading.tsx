import { Skeleton } from "@/src/components/ui/skeleton";
import React from "react";

const ProfileLoading = () => {
  return (
    <section className="page_padding">
      <div className="bg_dark_white p-4 rounded-md shadow dark:shadow-none flex justify-between ">
        <div className="flex gap-4">
          <Skeleton className="w-20 h-20 rounded-full" />
          <div className="flex flex-col gap-1">
            <Skeleton className="w-40 h-4" />
            <Skeleton className="w-40 h-4" />
            <Skeleton className="w-40 h-4 mt-2" />
            <div className="flex gap-4 mt-2">
              <Skeleton className="w-20 h-6" />
              <Skeleton className="w-20 h-6" />
              <Skeleton className="w-20 h-6" />
            </div>
          </div>
        </div>

        <Skeleton className="w-20 h-10" />
      </div>
      <Skeleton className="w-20 h-10" />
      <div className="flex flex-wrap gap-4">
        <Skeleton className="w-40 h-20" />
        <Skeleton className="w-40 h-20" />
        <Skeleton className="w-40 h-20" />
        <Skeleton className="w-40 h-20" />
      </div>
    </section>
  );
};

export default ProfileLoading;
