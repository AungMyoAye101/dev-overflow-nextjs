import { Skeleton } from "@/src/components/ui/skeleton";
import React from "react";

const QuestionFormLoading = () => {
  return (
    <section className="page_padding">
      <Skeleton className="h-10 w-20 " />
      <div className="flex flex-col gap-1">
        <Skeleton className="h-8 w-60" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton className="h-8 w-60" />
        <Skeleton className="h-40 w-full" />
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton className="h-8 w-60" />
        <Skeleton className="h-10 w-full" />
      </div>
      <Skeleton className="h-10 w-20 self-end" />
    </section>
  );
};

export default QuestionFormLoading;
