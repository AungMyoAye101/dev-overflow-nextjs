"use server";

import Question from "@/src/model/question.model";
import connectToDB from "../../database/db";
import Tags from "@/src/model/Tag.model";
import { getUser } from "./getUser";

export const askQuestion = async (params: any) => {
  const { title, content, tags } = params;
  try {
    await connectToDB();
    const user = await getUser();
    if (!user) return;
    const userId = user.user?._id;
    const question = await Question.create({
      title,
      content,
      author: userId,
    });

    const tagsId = [];

    for (const tagName of tags) {
      let tag = await Tags.findOneAndUpdate(
        { name: tagName },
        {
          $setOnInsert: { name: tagName },
          $push: { questions: question._id },
        },
        { upsert: true, new: true }
      );
      tagsId.push(tag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagsId } },
    });

    return { success: true, question };
  } catch (error: any) {
    console.error("Error asking question:", error.message);
    return { success: false, error };
  }
};
