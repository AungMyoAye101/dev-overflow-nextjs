"use server";

import connectToDB from "@/src/database/db";
import { AnswerProps, VotesParams } from "@/src/type";
import { getUser } from "./getUser";
import { revalidatePath } from "next/cache";
import Answer from "@/src/model/answer.model";
import Question from "@/src/model/question.model";
import User from "@/src/model/User.Model";

export const createAnswer = async (params: AnswerProps) => {
  const { content, questionId, path } = params;

  try {
    await connectToDB();
    const user = await getUser();
    if (!user) {
      return console.log("now user found");
    }

    const newAnswer = await Answer.create({
      content,
      question: questionId,
      author: user._id,
    });

    await Question.findByIdAndUpdate(
      questionId,
      {
        $push: { answers: newAnswer._id },
      },
      { new: true }
    );

    revalidatePath(path);
  } catch (error) {
    console.log("failed to create answer", error);
    throw error;
  }
};

export const getAllAnswers = async (id: string) => {
  try {
    await connectToDB();
    const question = await Question.findById(id).populate({
      path: "answers",
      populate: {
        path: "author",
        model: User,
        select: "name username email picture",
      },
    });

    if (!question) {
      throw new Error("Question not found");
    }

    return question.answers;
  } catch (error) {
    console.error("Failed to fetch answers", error);
    throw error;
  }
};

export const answerUpVotes = async (params: VotesParams) => {
  const { itemId, userId, hasUpvoted, hasDownvoted, path } = params;
  try {
    await connectToDB();
    console.log(userId);
    let updateQuery = {};

    if (hasUpvoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasDownvoted) {
      updateQuery = { $pull: { downvotes: userId } };
      updateQuery = { $push: { upvotes: userId } };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(itemId, updateQuery, {
      new: true,
    });
    if (!answer) {
      throw new Error("Question not found");
    }

    console.log("voting", answer);

    //TODO : increasement of user repuration
    console.log("successfully upvoted");
    revalidatePath(path);
  } catch (error: any) {
    console.log(error.message);
    throw new Error("Failed to upvote answer", error.message);
  }
};
export const answerDownVotes = async (params: VotesParams) => {
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

    const answer = await Answer.findByIdAndUpdate(itemId, updateQuery, {
      new: true,
    });
    if (!answer) {
      throw new Error("Question not found");
    }

    console.log("voting", answer);

    //TODO : increasement of user repuration
    console.log("successfully upvoted");
    revalidatePath(path);
  } catch (error: any) {
    console.log(error.message);
    throw new Error("Failed to upvote answer", error.message);
  }
};
