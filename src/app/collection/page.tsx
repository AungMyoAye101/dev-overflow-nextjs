import Empty from "@/src/components/Empty";
import Filter from "@/src/components/Filter";
import LocalSearchBox from "@/src/components/LocalSearchBox";
import PaginationBox from "@/src/components/PaginationBox";
import Post from "@/src/components/Post";
import { sortCollection } from "@/src/constants";
import { getSavedQuestion } from "@/src/lib/actions/question.action";
import { SearchParamsProps } from "@/src/type";

import React from "react";

const page = async ({ searchParams }: SearchParamsProps) => {
  const query = await searchParams;
  const res = await getSavedQuestion({
    searchQuery: query.q || "",
    sortQuery: query.filter || "",
    page: query.page ? +query.page : 1,
  });
  if (!res) {
    return console.log("No queston found  ");
  }
  const results = JSON.parse(JSON.stringify(res));
  return (
    <section className="page_padding ">
      <h1 className="h1-bold">Saved Questions</h1>
      <div className="flex flex-row lg:flex-col gap-4">
        <LocalSearchBox />
        <Filter filterArray={sortCollection} />
      </div>
      <div className="flex flex-col gap-6 ">
        {results.questions.length > 0 ? (
          results.questions.map((q: any) => <Post key={q.title} question={q} />)
        ) : (
          <Empty
            title="You have not saved question yet."
            desecription="You can save a question from question detail page."
            btn="Save a question"
            link="/"
          />
        )}
      </div>
      <PaginationBox
        pageNumber={query?.page ? +query.page : 1}
        isNext={!results.isNext}
      />
    </section>
  );
};

export default page;
