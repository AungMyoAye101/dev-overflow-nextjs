"use server";

import Question from "@/src/model/question.model";
import connectToDB from "../../database/db";
import Tags from "@/src/model/Tag.model";
import { revalidatePath } from "next/cache";
import {
  CreateQuestionParams,
  DeleteQuestionParams,
  SearchFilterQueryParams,
  VotesParams,
} from "@/src/type";
import User from "@/src/model/User.Model";
import { auth } from "@clerk/nextjs/server";
import { getUser } from "./user.action";
import Answer from "@/src/model/answer.model";
import Interaction from "@/src/model/Interaction.model";
import { FilterQuery } from "mongoose";

export const askQuestion = async (params: CreateQuestionParams) => {
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
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      tagsId.push(tag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagsId } },
    });
    await Interaction.create({
      user: user._id,
      action: "ask_question",
      question: question._id,
      tags: tagsId,
    });
    await User.findByIdAndUpdate(user._id, {
      $inc: {
        reputation: 5,
      },
    });

    revalidatePath(path);
  } catch (error: any) {
    console.error("Error asking question:", error.message);
    throw error;
  }
};

export const getAllQuestions = async (params: SearchFilterQueryParams) => {
  try {
    await connectToDB();
    const { searchQuery, sortQuery, page = 1, pageSize = 10 } = params;

    const query: FilterQuery<typeof Question> = {};
    const skipAmount = (page - 1) * pageSize;

    if (searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { content: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    let sortBy = {};
    switch (sortQuery) {
      case "newest":
        sortBy = { createdAt: -1 };
        break;
      case "frequent":
        sortBy = { views: -1 };
        break;
      case "unanswered":
        query.answers = { $size: 0 };
        break;
      case "Recommend":
        sortBy = { upvotes: -1 };
        break;
      default:
        sortBy = { createdAt: -1 };
        break;
    }
    const questions = await Question.find(query)

      .populate({ path: "author", model: User })
      .populate({ path: "tags", model: Tags })
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortBy)
      .lean();
    if (!questions) return [];
    const totalQuestions = await Question.countDocuments(query);
    const isNext = totalQuestions > skipAmount + questions.length;

    return { questions, isNext };
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

    //reputation for author

    const postOwner = userId === question.author.toString();

    if (!postOwner) {
      await User.findByIdAndUpdate(userId, {
        $inc: { reputation: hasUpvoted ? -1 : 1 },
      });

      await User.findByIdAndUpdate(question.author, {
        $inc: { reputation: hasUpvoted ? -5 : 5 },
      });
    }

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

    //TODO : increasement of user repuration
    const postOwner = userId === question.author.toString();
    if (!postOwner) {
      await User.findByIdAndUpdate(userId, {
        $inc: { reputation: hasDownvoted ? -1 : 1 },
      });

      //reputation for author
      await User.findByIdAndUpdate(question.author, {
        $inc: { reputation: hasDownvoted ? -5 : 5 },
      });
    }

    revalidatePath(path);
  } catch (error: any) {
    console.log(error.message);
    throw new Error("Failed to upvote question", error.message);
  }
};

export const getSavedQuestion = async (params: SearchFilterQueryParams) => {
  const { userId: clerkId } = await auth();

  try {
    await connectToDB();
    const { searchQuery, sortQuery, page = 1, pageSize = 10 } = params;

    const query: FilterQuery<typeof Question> = {};
    //For local search
    if (searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { content: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    // For Filter query
    let sortBy = {};
    switch (sortQuery) {
      case "recent":
        sortBy = { createdAt: -1 };
        break;
      case "oldest":
        sortBy = { createdAt: 1 };

        break;
      case "most voted":
        sortBy = { upvotes: -1 };

        break;
      case "most viewed":
        sortBy = { views: -1 };

        break;
      case "most answered":
        sortBy = { answers: -1 };

        break;
      default:
        sortBy = { createdAt: -1 };
        break;
    }
    // for pagination

    const skipAmount = (page - 1) * pageSize;

    const user: any = await User.findOne({ clerkId })
      .lean()
      .populate({
        path: "saved",
        model: Question,
        match: query,
        options: {
          sort: sortBy,
          skip: skipAmount,
          limit: pageSize,
        },
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
    if (!user) {
      throw new Error("User Not found");
    }

    const isNext = user.saved.length > skipAmount + page;
    return { questions: user.saved, isNext };
  } catch (error: any) {
    console.log(error.message);
    throw new Error("Failed to get saved questions");
  }
};

export const getUserQuestions = async (userId: string) => {
  try {
    await connectToDB();

    const totalQuestions = await Question.countDocuments({ author: userId });

    const questions = await Question.find({ author: userId })
      .populate({
        path: "tags",
        model: Tags,
      })
      .populate({
        path: "author",
        model: User,
      })
      .sort({ views: -1, upvotes: -1 });
    return { totalQuestions, questions };
  } catch (error) {
    throw error;
  }
};

export const deleteQuestion = async (params: DeleteQuestionParams) => {
  const { questionId, path } = params;

  try {
    await connectToDB();
    await Question.findByIdAndDelete(questionId);
    await Answer.deleteMany({ question: questionId });
    await Interaction.deleteMany({ question: questionId });
    await Tags.updateMany(
      { question: questionId },
      { $pull: { question: questionId } }
    );

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTopQuestions = async () => {
  try {
    await connectToDB();
    const topQuestions = await Question.find()
      .sort({ upvotes: -1, views: -1 })
      .limit(5);

    if (!topQuestions) {
      throw new Error("No top questions found");
    }
    return topQuestions;
  } catch (error) {
    throw error;
  }
};
