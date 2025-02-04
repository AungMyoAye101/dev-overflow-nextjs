import React from "react";
import { getUserQuestions } from "../lib/actions/question.action";
import Post from "./Post";
export interface UserQuestionProps {
  userId: string;
}
const UserQuestion = async ({ userId }: UserQuestionProps) => {
  const results = await getUserQuestions(userId);
  if (!results) {
    throw new Error("No user questions found!");
  }
  const { questions } = JSON.parse(JSON.stringify(results));
  return (
    <div className="flex flex-col gap-4">
      {questions.length > 0 &&
        questions.map((q: any) => (
          <Post key={q._id} question={q} ownProfile={true} />
        ))}
    </div>
  );
};

export default UserQuestion;
