import connectToDB from "@/src/database/db";
import Question from "@/src/model/question.model";

export const getAllQuestions = async () => {
  try {
    await connectToDB();
    const questions = await Question.find({});

    return { success: true, questions };
  } catch (error) {
    return { success: false, error };
  }
};
