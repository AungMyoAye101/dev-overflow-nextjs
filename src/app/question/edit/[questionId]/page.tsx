import QuestionForm from "@/src/components/Question";
import { getQuestionById } from "@/src/lib/actions/question.action";
import React from "react";

interface PageProps {
  params: Promise<{ questionId: string }>;
}

const page = async ({ params }: PageProps) => {
  const { questionId } = await params;
  const question = await getQuestionById(questionId);
  if (!question) throw new Error("Question not found");
  return (
    <section className="page_padding">
      <QuestionForm
        formType="Edit"
        question={JSON.parse(JSON.stringify(question))}
      />
    </section>
  );
};

export default page;
