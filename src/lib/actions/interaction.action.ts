"use server";
import connectToDB from "@/src/database/db";
import Interaction from "@/src/model/Interaction.model";
import Question from "@/src/model/question.model";

export const viewQuestion = async (params: any) => {
  const { questionId, userId } = params;
  try {
    await connectToDB();

    await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
