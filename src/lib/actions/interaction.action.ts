"use server";
import connectToDB from "@/src/database/db";
import Interaction from "@/src/model/Interaction.model";
import Question from "@/src/model/question.model";
import { revalidatePath } from "next/cache";

export const viewQuestion = async (params: any) => {
  const { itemId, userId, path } = params;
  try {
    await connectToDB();
    await Question.findByIdAndUpdate(itemId, { $inc: { views: 1 } });
    if (userId) {
      const existingUser = await Interaction.findOne({ user: userId });

      if (existingUser) {
        return console.log("user already view");
      }
      await Interaction.create({
        user: userId,
        action: "view",
        question: itemId,
      });
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
