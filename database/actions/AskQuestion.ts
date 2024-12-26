import Question from "@/model/question.model";
import connectToDB from "../db";

export const askQuestion = async (params: any) => {
  try {
    await connectToDB();
    const { title, content, tags, userId } = params;

    const question = Question.create({
      title,
      content,
      author: userId,
    });
  } catch (error) {
    console.error("Error asking question:", error);
  }
};
