import Empty from "@/src/components/Empty";
import LocalSearchBox from "@/src/components/LocalSearchBox";
import Post from "@/src/components/Post";
import { getQuestionByTagId } from "@/src/lib/actions/tags.action";
import { TagsDetailProps } from "@/src/type";
import React from "react";

const page = async ({ params }: { params: Promise<{ tagId: string }> }) => {
  const { tagId } = await params;
  const result: TagsDetailProps = await getQuestionByTagId({
    tagId,
  });
  console.log("result", result);
  return (
    <section className="page_padding flex flex-col  ">
      <div>
        <h1 className="h2-bold">{result.name}</h1>
      </div>
      <div>
        <LocalSearchBox />
      </div>
      <div className="flex flex-col gap-4">
        {result.questions.length > 0 ? (
          result.questions.map((q) => <Post key={q._id} question={q} />)
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
    </section>
  );
};

export default page;
