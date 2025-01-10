import LocalSearchBox from "@/src/components/LocalSearchBox";
import Post from "@/src/components/Post";

import Link from "next/link";
import { getAllQuestions } from "../lib/actions/question.action";
import Empty from "../components/Empty";
import { QuestionProps } from "../type";

export default async function Home() {
  const res = await getAllQuestions();

  if (!res) return;
  const questions: QuestionProps[] = JSON.parse(JSON.stringify(res));

  return (
    <div className="flex-1 flex flex-col gap-10   custom-scrollbar pt-[8rem] pb-10  px-4 md:px-10 bg-light-gray dark:bg-black border-2 ">
      <div className="flex flex-col-reverse md:flex-row justify-between items-start md:items-center w-full ">
        <h1 className="text-2xl md:text-4xl font-poppins font-semibold">
          All Questions
        </h1>
        <Link
          href={"/question"}
          className="self-end btn-bg font-poppins  font-semibold py-2 px-4 rounded-md "
        >
          Ask a Question
        </Link>
      </div>
      <div>
        <LocalSearchBox />
      </div>
      <div className="flex flex-col gap-4">
        {questions.length > 0 ? (
          questions.map((q) => <Post key={q._id} question={q} />)
        ) : (
          <Empty
            title="There is no question to show"
            desecription="  Be the first to break the silence! 🚀 Ask a Question and kickstart the
        discussion. our query could be the next big thing others learn from. Get
        involved!"
            link="/question"
            btn="ask a question"
          />
        )}
      </div>
    </div>
  );
}
