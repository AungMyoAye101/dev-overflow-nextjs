import { FaGreaterThan } from "react-icons/fa";
import { Badge } from "./ui/badge";
import { getTopQuestions } from "../lib/actions/question.action";
import Link from "next/link";
import { QuestionProps, TopTagsType } from "../type";
import { getTopTags } from "../lib/actions/tags.action";

const RightSideBar = async () => {
  const res = await getTopQuestions();
  const topQuestion: QuestionProps[] = JSON.parse(JSON.stringify(res));
  const tags = await getTopTags();
  const topTags: TopTagsType[] = JSON.parse(JSON.stringify(tags));

  return (
    <section className="dark:bg-[#161625] hidden lg:block  h-screen overflow-hidden overflow-y-scroll  sticky right-0 left-0 top-0  pt-[6rem] pb-4 px-4 w-64 ">
      <div className="flex flex-col gap-4 pt-4 ">
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
                className="flex w-full justify-between items-center text-sm gap-4 font-noto_serif hover:text-accent-blue "
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
          <h1 className="text-xl font-poppins font-semibold">Popular Tags</h1>

          <div className="flex flex-col gap-4 font-semibold font-poppins">
            {topTags.length > 0 &&
              topTags.map((t) => (
                <Link
                  key={t._id}
                  href={`/tags/${t._id}`}
                  className="flex justify-between items-center "
                >
                  <Badge className="px-3 py-1 font-poppins button_bg ">
                    {t.name}
                  </Badge>
                  <span>{t.numberOfQuestions}</span>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
