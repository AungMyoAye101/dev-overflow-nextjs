import { Skeleton } from "@/src/components/ui/skeleton";
import React from "react";

const QuestionDetailLoading = () => {
  return (
    <section className="page_padding">
      <Skeleton className="h-60 w-full" />
      <div className="flex justify-between">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>
      <Skeleton className="h-60 w-full" />
    </section>
  );
};

export default QuestionDetailLoading;
