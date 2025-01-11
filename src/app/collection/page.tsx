import Filter from "@/src/components/Filter";
import LocalSearchBox from "@/src/components/LocalSearchBox";
import Post from "@/src/components/Post";
import { filteredSearch, sortCollection } from "@/src/constants";
import { getSavedQuestion } from "@/src/lib/actions/question.action";
import { SearchParamsProps } from "@/src/type";

import React from "react";

const page = async ({ searchParams }: SearchParamsProps) => {
  const query = await searchParams;
  const res = await getSavedQuestion({
    searchQuery: query.q,
    sortQuery: query.filter,
  });
  if (!res) {
    return console.log("No queston found  ");
  }
  const user = JSON.parse(JSON.stringify(res));
  return (
    <section className="page_padding">
      <h1 className="h1-bold">Saved Questions</h1>
      <div className="flex flex-row lg:flex-col gap-4">
        <LocalSearchBox />
        <Filter filterArray={sortCollection} />
      </div>
      <div className="flex flex-col gap-6 ">
        {user.saved.length > 0 ? (
          user.saved.map((q: any) => <Post key={q.title} question={q} />)
        ) : (
          <div>You have no saved question </div>
        )}
      </div>
    </section>
  );
};

export default page;
