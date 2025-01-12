import Filter from "@/src/components/Filter";
import LocalSearchBox from "@/src/components/LocalSearchBox";
import PaginationBox from "@/src/components/PaginationBox";
import { Badge } from "@/src/components/ui/badge";
import { sortTags } from "@/src/constants";
import { getAllTags } from "@/src/lib/actions/tags.action";
import { SearchParamsProps } from "@/src/type";
import Link from "next/link";

import React from "react";

const Page = async ({ searchParams }: SearchParamsProps) => {
  const query = await searchParams;
  const results = await getAllTags({
    searchQuery: query.q,
    sortQuery: query.filter,
    page: query.page ? +query.page : 1,
  });
  if (!results) return <div>Loading...</div>;

  return (
    <section className="page_padding">
      <h1 className="h1-bold">All Tags</h1>
      <div className="flex flex-row lg:flex-col gap-4">
        <LocalSearchBox />
        <Filter filterArray={sortTags} />
      </div>
      <div className="grid sm:grid-cols-2  lg:grid-cols-3 gap-4 place-items-center">
        {results.tags.map((tag) => (
          <div
            key={tag._id}
            className="bg_dark_white flex flex-col  gap-4 px-4 py-6 shadow_rounded w-fit"
          >
            <Link href={`/tags/${tag._id}`}>
              <Badge className="py-2 px-4 w-fit">{tag.name}</Badge>
            </Link>
            <p className="text-sm font-noto_serif line-clamp-3">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est
              optio sed modi
            </p>
            <div className="font-noto_serif flex gap-2 text-sm">
              <span className="text-orange">{tag.questions.length} +</span>
              <span>Question</span>
            </div>
          </div>
        ))}
      </div>
      <PaginationBox
        pageNumber={query?.page ? +query.page : 1}
        isNext={results.isNext}
      />
    </section>
  );
};

export default Page;
