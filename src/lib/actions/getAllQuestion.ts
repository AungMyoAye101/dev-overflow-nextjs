import connectToDB from "@/src/database/db";
import Question from "@/src/model/question.model";

export const getAllQuestions = async () => {
  try {
    await connectToDB();
    const questions = await Question.find()
      .populate({ path: "author", select: "_id name picture " })
      .populate({ path: "tags", select: "_id name  " });
    if (!questions) return console.log("No questions found");
    return questions;
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
