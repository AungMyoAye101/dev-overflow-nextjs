"use server";

import Question from "@/src/model/question.model";
import connectToDB from "../../database/db";

export const askQuestion = async (params: any) => {
  try {
    await connectToDB();
    const { title, content, userId } = params;

    const question = Question.create({
      title,
      content,
      author: userId,
    });
    return { success: true, question };
  } catch (error) {
    console.error("Error asking question:", error);
    return { success: false, error };
  }
};
