import connectToDB from "@/src/database/db";
import Question from "@/src/model/question.model";
import Tags from "@/src/model/Tag.model";
import User from "@/src/model/User.Model";

export const getAllQuestions = async () => {
  try {
    await connectToDB();
    const questions = await Question.find()
      .populate({ path: "author", model: User })
      .populate({ path: "tags", model: Tags })
      .lean();
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
        path: "tags",
        model: Tags,
      })
      .populate({
        path: "author",
        model: User,
      })
      .lean();

    if (!question) {
      return console.log("question not found");
    }
    console.log(question);
    return question;
  } catch (error) {
    throw error;
  }
};
