import connectToDB from "@/database/db";
import Question from "@/model/question.model";

export const getAllQuestions = async () => {
  try {
    await connectToDB();
    const questions = await Question.find({});

    return JSON.stringify(questions);
  } catch (error) {
    return { success: false, error };
  }
};
