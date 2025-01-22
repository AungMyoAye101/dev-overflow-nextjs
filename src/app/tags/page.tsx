import Empty from "@/src/components/Empty";
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
    searchQuery: query.q || "",
    sortQuery: query.filter || "",
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
      {results.tags.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {results.tags.map((tag) => (
            <div
              key={tag._id}
              className="bg_dark_white flex  items-center  gap-4 p-4 shadow_rounded "
            >
              <Link href={`/tags/${tag._id}`}>
                <Badge className="py-1.5 px-3  w-fit button_bg hover:bg-accent-purple">
                  {tag.name}
                </Badge>
              </Link>

              <div className="font-noto_serif flex gap-2 text-sm">
                <span className="text-orange">{tag.questions.length} +</span>
                <span>
                  {tag.questions.length > 1 ? "Questions" : "Question"}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Empty
          title="There is no tags to show "
          desecription="Be the first to create a tag."
          btn="Create a question"
          link="/question"
        />
      )}

      <PaginationBox
        pageNumber={query?.page ? +query.page : 1}
        isNext={results.isNext}
      />
    </section>
  );
};

export default Page;
