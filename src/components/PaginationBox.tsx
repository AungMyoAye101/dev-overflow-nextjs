"use client";

import { FC } from "react";
import { Button } from "./ui/button";
import { formQuery } from "../lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  pageNumber: number;
  isNext: boolean;
}

const PaginationBox: FC<Props> = ({ pageNumber, isNext }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleClick = (direction: string) => {
    const nextPageNumber =
      direction === "Prev" ? pageNumber - 1 : pageNumber + 1;

    const newUrl = formQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNumber.toString(),
    });
    router.push(newUrl);
  };
  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        disabled={pageNumber === 1}
        className="px-4 py-2 "
        onClick={() => handleClick("Prev")}
      >
        Prev
      </Button>
      <p className="px-4 py-2 btn-bg rounded-lg">{pageNumber}</p>
      <Button
        disabled={!isNext}
        className="px-4 py-2 "
        onClick={() => handleClick("Next")}
      >
        Next
      </Button>
    </div>
  );
};

export default PaginationBox;
