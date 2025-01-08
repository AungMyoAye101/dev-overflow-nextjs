import React from "react";
import { UserQuestionProps } from "./UserQuestion";
import { getUserAnsers } from "../lib/actions/answer.action";
import Answer from "./Answer";
import AnswerCard from "./AnswerCard";
import Empty from "./Empty";

const UserAnswers = async ({ userId }: UserQuestionProps) => {
  const results = await getUserAnsers(userId);
  if (!results) {
    throw new Error("results not found !");
  }

  const { totalAnswers, answers } = results;
  return (
    <div>
      <div>
        {answers.length > 1 ? (
          answers.map((a) => <AnswerCard key={a._id} answer={a} />)
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
};

export default UserAnswers;
