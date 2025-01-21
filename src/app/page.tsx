import LocalSearchBox from "@/src/components/LocalSearchBox";
import Post from "@/src/components/Post";

import Link from "next/link";
import { getAllQuestions } from "../lib/actions/question.action";
import Empty from "../components/Empty";
import { QuestionProps, SearchParamsProps } from "../type";
import Filter from "../components/Filter";
import { filteredSearch } from "../constants";
import PaginationBox from "../components/PaginationBox";
import { FaQuestionCircle } from "react-icons/fa";

interface ResultsType {
  questions: QuestionProps[];
  isNext: boolean;
}

export default async function Home({ searchParams }: SearchParamsProps) {
  const query = await searchParams;
  const res = await getAllQuestions({
    searchQuery: query.q || "",
    sortQuery: query.filter || "",
    page: query.page ? +query.page : 1,
  });

  if (!res) return;
  const results: ResultsType = JSON.parse(JSON.stringify(res));

  return (
    <div className="page_padding">
      <div className="flex  md:flex-row justify-between items-start md:items-center  ">
        <h1 className="text-2xl md:text-4xl font-poppins font-semibold">
          All Questions
        </h1>
        <Link
          href={"/question"}
          className="self-end btn-bg font-poppins  font-semibold py-2 px-4 rounded-md "
        >
          <span className="hidden sm:block">Ask a Question</span>
          <FaQuestionCircle className="sm:hidden" />
        </Link>
      </div>
      <div className="flex  sm:flex-row lg:flex-col gap-4">
        <LocalSearchBox />
        <Filter filterArray={filteredSearch} />
      </div>
      <div className="flex flex-col gap-4 ">
        {results.questions.length > 0 ? (
          results.questions.map((q) => <Post key={q._id} question={q} />)
        ) : (
          <Empty
            title="There no question"
            desecription="Be the first create a question"
            btn="Create a question"
            link="/question"
          />
        )}
      </div>

      <PaginationBox
        pageNumber={query?.page ? +query.page : 1}
        isNext={results.isNext}
      />
    </div>
  );
}
