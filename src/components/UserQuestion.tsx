import React from "react";
import { getUserQuestions } from "../lib/actions/question.action";
import Post from "./Post";
interface UserQuestionProps {
  userId: string;
}
const UserQuestion = async ({ userId }: UserQuestionProps) => {
  const results = await getUserQuestions(userId);
  if (!results) {
    throw new Error("No user questions found!");
  }
  const totalQuestion = results.totalQuestions;
  const questions = results.questions;
  return (
    <div>
      <div>
        {questions.length > 0 &&
          questions.map((q) => <Post key={q._id} question={q} />)}
      </div>
    </div>
  );
};

export default UserQuestion;
