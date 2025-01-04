"use server";

import connectToDB from "@/src/database/db";

import { AnswerProps } from "@/src/type";
import { getUser } from "./getUser";

import { revalidatePath } from "next/cache";
import Answer from "@/src/model/answer.model";
import Question from "@/src/model/question.model";
import User from "@/src/model/User.Model";

export const createAnswer = async (params: AnswerProps) => {
  const { content, questionId, path } = params;

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

    await Question.findByIdAndUpdate(
      questionId,
      {
        $push: { answers: newAnswer._id },
      },
      { new: true }
    );

    revalidatePath(path);
  } catch (error) {
    console.log("failed to create answer", error);
    throw error;
  }
};

export const getAllAnswers = async () => {
  try {
    await connectToDB();
    const answers = await Answer.find().populate({
      path: "author",
      model: User,
    });

    console.log(answers);
    return answers;
  } catch (error) {
    throw error;
  }
};
