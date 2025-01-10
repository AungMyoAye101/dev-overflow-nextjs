import { FaGreaterThan } from "react-icons/fa";
import { Badge } from "./ui/badge";
import { getTopQuestions } from "../lib/actions/question.action";
import Link from "next/link";
import { QuestionProps } from "../type";

const RightSideBar = async () => {
  const res = await getTopQuestions();
  const topQuestion: QuestionProps[] = JSON.parse(JSON.stringify(res));

  return (
    <section className="hidden lg:block  h-screen overflow-hidden overflow-y-scroll custom-scrollbar sticky right-0 top-0  pt-[7rem] pb-10 px-4   max-w-80 bg-white dark:bg-gray-900 ">
      <div className="flex flex-col gap-4 pt-4">
        <div>
          <h1 className="text-xl font-poppins font-semibold">Top Questions</h1>
        </div>

        {/* top question container */}
        <div className="flex flex-col gap-4">
          {topQuestion.length > 0 &&
            topQuestion.map((q) => (
              <Link
                href={`/question/${q._id!}`}
                key={q._id}
                className="flex w-full justify-between items-center text-sm gap-4 font-noto_serif hover:text-orange "
              >
                <p>{q.title}</p>
                <button>
                  <FaGreaterThan />
                </button>
              </Link>
            ))}
        </div>

        {/* tags container */}
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-xl font-poppins font-semibold">Popular Tags</h1>
          </div>
          <div className="flex flex-col gap-4 font-semibold font-poppins">
            <button className="flex justify-between items-center">
              <Badge className="px-4 py-2 font-noto_serif ">Next js</Badge>
              <span>1069</span>
            </button>
            <button className="flex justify-between items-center">
              <Badge className="px-4 py-2 font-noto_serif ">Next js</Badge>
              <span>1069</span>
            </button>
            <button className="flex justify-between items-center">
              <Badge className="px-4 py-2 font-noto_serif ">Next js</Badge>
              <span>1069</span>
            </button>
            <button className="flex justify-between items-center">
              <Badge className="px-4 py-2 font-noto_serif ">Next js</Badge>
              <span>1069</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
