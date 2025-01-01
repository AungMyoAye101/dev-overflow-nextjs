import LocalSearchBox from "@/src/components/LocalSearchBox";
import Post from "@/src/components/Post";

import Link from "next/link";
import { getAllQuestions } from "../lib/actions/getAllQuestion";

export default async function Home() {
  const { questions } = await getAllQuestions();
  if (!questions) return { notFound: true };

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
          <div className="flex flex-col items-center gap-4 w-[90%] sm:w-[60%]  mx-auto text-center">
            <h2 className="text-2xl font-poppins font-semibold">
              There is no question to show{" "}
            </h2>
            <p className="para ">
              Be the first to break the silence! 🚀 Ask a Question and kickstart
              the discussion. our query could be the next big thing others learn
              from. Get involved!{" "}
            </p>
            <Link
              href="/question"
              className="btn-bg font-poppins font-semibold py-2 px-4 rounded-md"
            >
              Ask a Question
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
