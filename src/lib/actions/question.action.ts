"use server";

import Question from "@/src/model/question.model";
import connectToDB from "../../database/db";
import Tags from "@/src/model/Tag.model";
import { revalidatePath } from "next/cache";
import { VotesParams } from "@/src/type";
import User from "@/src/model/User.Model";
import { auth } from "@clerk/nextjs/server";
import { getUser } from "./user.action";

export const askQuestion = async (params: any) => {
  const { title, content, tags, path } = params;
  try {
    await connectToDB();
    const user = await getUser();
    if (!user) return;

    const question = await Question.create({
      title,
      content,
      author: user._id,
    });

    const tagsId = [];

    for (const tagName of tags) {
      const tag = await Tags.findOneAndUpdate(
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

    revalidatePath(path);
    return question;
  } catch (error: any) {
    console.error("Error asking question:", error.message);
    throw error;
  }
};

export const getAllQuestions = async () => {
  try {
    await connectToDB();
    const questions = await Question.find()
      .populate({ path: "author", model: User })
      .populate({ path: "tags", model: Tags });

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

    return question;
  } catch (error) {
    throw error;
  }
};

export const createUpVotes = async (params: VotesParams) => {
  const { itemId, userId, hasUpvoted, hasDownvoted, path } = params;
  try {
    await connectToDB();
    console.log(userId);
    let updateQuery = {};

    if (hasUpvoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasDownvoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    const question = await Question.findByIdAndUpdate(itemId, updateQuery, {
      new: true,
    });
    if (!question) {
      throw new Error("Question not found");
    }

    console.log("voting", question);

    //TODO : increasement of user repuration
    console.log("successfully upvoted");
    revalidatePath(path);
  } catch (error: any) {
    console.log(error.message);
    throw new Error("Failed to upvote question", error.message);
  }
};

export const createDownVotes = async (params: VotesParams) => {
  const { itemId, userId, hasUpvoted, hasDownvoted, path } = params;
  try {
    await connectToDB();
    let updateQuery = {};

    if (hasDownvoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasUpvoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }

    const question = await Question.findByIdAndUpdate(itemId, updateQuery, {
      new: true,
    });
    if (!question) {
      throw new Error("Question not found");
    }

    console.log("voting", question);

    //TODO : increasement of user repuration
    console.log("successfully downvoted");
    revalidatePath(path);
  } catch (error: any) {
    console.log(error.message);
    throw new Error("Failed to upvote question", error.message);
  }
};

export const getSavedQuestion = async () => {
  const { userId: clerkId } = await auth();
  try {
    await connectToDB();
    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      model: Question,
      populate: [
        {
          path: "author",
          model: User,
          select: "_id name picture ",
        },
        {
          path: "tags",
          model: Tags,
          select: "_id name ",
        },
      ],
    });

    console.log("success", user);
    return user;
  } catch (error: any) {
    console.log(error.message);
    throw new Error("Failed to get saved questions");
  }
};