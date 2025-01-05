"use server";

import Question from "@/src/model/question.model";
import connectToDB from "../../database/db";
import Tags from "@/src/model/Tag.model";
import { getUser } from "./getUser";
import { revalidatePath } from "next/cache";

import { VotesParams } from "@/src/type";

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

    revalidatePath(path);
    return question;
  } catch (error: any) {
    console.error("Error asking question:", error.message);
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
