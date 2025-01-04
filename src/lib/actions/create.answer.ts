import connectToDB from "@/src/database/db";
import Answer from "@/src/model/answer.model";
import { AnswerProps } from "@/src/type";
import { getUser } from "./getUser";
import Question from "@/src/model/question.model";
import { revalidatePath } from "next/cache";

export const createAnswer = async (params: AnswerProps) => {
  const { content, questionId, path } = params;
  console.log(content, questionId);
  try {
    await connectToDB();
    const user = await getUser();
    if (!user) {
      return console.log("now user found");
    }

    const newAnswer = await Answer.create({
      content,
      question: questionId,
      author: user._id,
    });

    await Question.findByIdAndUpdate(questionId, { answers: newAnswer._id });

    revalidatePath(path);
  } catch (error) {
    throw error;
  }
};
