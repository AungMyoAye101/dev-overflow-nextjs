"use server";
import connectToDB from "@/src/database/db";
import Question from "@/src/model/question.model";
import Tags from "@/src/model/Tag.model";
import User from "@/src/model/User.Model";

export const getTagById = async (id: string) => {
  try {
    await connectToDB();
    const tags = await Tags.findById(id);
    return tags;
  } catch (error: any) {
    console.log("Failed to fetch tags", error.message);
    throw error;
  }
};
export const getAllTags = async () => {
  try {
    await connectToDB();
    const tags = await Tags.find().populate({
      path: "questions",
      select: "_id title description",
    });

    return tags;
  } catch (error: any) {
    console.log("Failed to fetch tags", error.message);
    throw error;
  }
};

export const getQuestionByTagId = async (params: any) => {
  const { tagId } = params;
  try {
    const tag = await Tags.findById(tagId).populate({
      path: "questions",
      model: Question,
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        {
          path: "author",
          model: User,
        },
        {
          path: "tags",
          model: Tags,
        },
      ],
    });
    if (!tag) {
      throw new Error("Tags not found");
    }
    console.log("successfully fetch questions by tag");
    return { name: tag.name, questions: tag.questons };
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
};
