import { Skeleton } from "@/src/components/ui/skeleton";
import React from "react";

const ProfileLoading = () => {
  return (
    <section className="page_padding">
      <div className="bg_dark_white p-4 rounded-md shadow dark:shadow-none flex ">
        <Skeleton className="w-14 h-14 rounded-full" />
        <div className="flex flex-col gap-1">
          <Skeleton className="w-24 h-8" />
          <Skeleton className="w-24 h-8" />
          <div className="flex gap-4">
            <Skeleton className="w-20 h-10" />
            <Skeleton className="w-20 h-10" />
            <Skeleton className="w-20 h-10" />
          </div>
        </div>
        <Skeleton className="w-20 h-10" />
      </div>
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
