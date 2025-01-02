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

export const getQuestionById = async (id: string) => {
  try {
    await connectToDB();
    const question = await Question.findById(id)
      .populate({
        path: "author",
        select: "name picture ",
      })
      .populate({
        path: "tags",
        select: "name  ",
      });

    if (!question) {
      return console.log("question not found");
    }
    console.log(question);
    return question;
  } catch (error) {
    throw error;
  }
};
