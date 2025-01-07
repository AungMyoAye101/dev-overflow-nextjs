import { getQuestionByTagId } from "@/src/lib/actions/tags.action";
import React from "react";

const page = async ({ params }: { params: Promise<{ tagId: string }> }) => {
  const { tagId } = await params;
  const result = await getQuestionByTagId({
    tagId,
  });
  console.log("result", result);
  return (
    <section className="page_padding">
      <div>{tagId}</div>
    </section>
  );
};

export default page;
