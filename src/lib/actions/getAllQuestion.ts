import connectToDB from "@/src/database/db";
import Question from "@/src/model/question.model";

export const getAllQuestions = async () => {
  try {
    await connectToDB();
    const questions = await Question.find();
    if (!questions) return console.log("No questions found");
    return { success: true, questions };
  } catch (error) {
    throw error;
  }
};
