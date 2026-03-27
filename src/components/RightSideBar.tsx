import { FaGreaterThan } from "react-icons/fa6";
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
    <aside className="sticky top-32 hidden h-fit lg:block">
      <div className="shadow_rounded bg-card p-5">
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="font-poppins text-lg font-semibold text-foreground">
              Top Questions
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {topQuestion.length > 0 &&
              topQuestion.map((q) => (
                <Link
                  href={`/question/${q._id!}`}
                  key={q._id}
                  className="flex w-full items-start justify-between gap-4 rounded-2xl border border-transparent px-3 py-2 text-sm transition hover:border-primary/20 hover:bg-primary/10 hover:text-primary"
                >
                  <p className="line-clamp-2 font-noto_serif">{q.title}</p>
                  <span className="mt-1">
                    <FaGreaterThan />
                  </span>
                </Link>
              ))}
          </div>

          <div className="flex flex-col gap-4 border-t border-border/60 pt-6">
            <h2 className="font-poppins text-lg font-semibold text-foreground">
              Popular Tags
            </h2>

            <div className="flex flex-col gap-3 font-semibold font-poppins">
              {topTags.length > 0 &&
                topTags.map((t) => (
                  <Link
                    key={t._id}
                    href={`/tags/${t._id}`}
                    className="flex items-center justify-between rounded-2xl border border-transparent px-3 py-2 transition hover:border-primary/20 hover:bg-primary/10"
                  >
                    <Badge className="rounded-full bg-primary/12 px-3 py-1 font-poppins text-primary hover:bg-primary/15">
                      {t.name}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {t.numberOfQuestions}
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RightSideBar;
