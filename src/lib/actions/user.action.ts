"use server";

import connectToDB from "@/src/database/db";
import Answer from "@/src/model/answer.model";
import Question from "@/src/model/question.model";
import User from "@/src/model/User.Model";
import {
  CreateUser,
  SavedParams,
  SearchFilterQueryParams,
  UpdateUser,
  UserIdProp,
} from "@/src/type";
import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";
import { assignedBadge } from "../utils";

export const createUser = async (params: CreateUser) => {
  try {
    await connectToDB();
    const newUser = await User.create(params);

    return newUser;
  } catch (err: any) {
    console.log("Failed to create user", err.message);
    return { success: false, error: err.message };
  }
};

export const updateUser = async (params: UpdateUser) => {
  const { userId, updateData, path } = params;
  try {
    await connectToDB();
    await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (path) {
      revalidatePath(path);
    }
    return { success: true };
  } catch (err: any) {
    console.log("Failed to update user", err.message);
    return { success: false, error: err.message };
  }
};

export const deleteUser = async (params: UserIdProp) => {
  const { userId } = params;
  try {
    await connectToDB();
    await User.findByIdAndDelete(userId);
  } catch (err: any) {
    console.log("Failed to delete user", err.message);
    return { success: false, error: err.message };
  }
};

export const getUserById = async (userId: string) => {
  try {
    await connectToDB();
    const user = await User.findById(userId);
    return user;
  } catch (err: any) {
    console.log("Failed to fetch user", err.message);
    return { success: false, error: err.message };
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    await connectToDB();
    return await User.findOne({ email: email.toLowerCase() });
  } catch (err: any) {
    console.log("Failed to fetch user by email", err.message);
    return null;
  }
};

export const getAllUsers = async (params: SearchFilterQueryParams) => {
  try {
    await connectToDB();
    const { searchQuery, sortQuery, page = 1, pageSize = 10 } = params;
    const query: FilterQuery<typeof User> = {};

    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
    }

    let sortBy = {};
    switch (sortQuery) {
      case "new users":
        sortBy = { joinedAt: -1 };
        break;
      case "old users":
        sortBy = { joinedAt: 1 };
        break;
      case "top contributors":
        sortBy = { reputation: -1 };
        break;
      default:
        sortBy = { joinedAt: -1 };
        break;
    }

    const skipAmount = (page - 1) * pageSize;

    const users = await User.find(query)
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortBy)
      .populate({
        path: "questions",
        select: "_id title",
        populate: { path: "tags", select: "_id name" },
      });

    if (!users) {
      throw new Error("Users not found");
    }

    const totalUsers = await User.countDocuments(query);
    const isNext = totalUsers > skipAmount + users.length;

    return { users, isNext };
  } catch (error) {
    throw error;
  }
};

export const getUserInfo = async (id: string) => {
  try {
    await connectToDB();
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    const totalQuestions = await Question.countDocuments({ author: user._id });
    const totalAnswers = await Answer.countDocuments({ author: user._id });

    const [questionUpvotes] = await Question.aggregate([
      { $match: { author: user._id } },
      { $project: { _id: 0, upvotes: { $size: "$upvotes" } } },
      {
        $group: {
          _id: null,
          totalUpvotes: { $sum: "$upvotes" },
        },
      },
    ]);

    const [answerUpvotes] = await Answer.aggregate([
      { $match: { author: user._id } },
      { $project: { _id: 0, upvotes: { $size: "$upvotes" } } },
      {
        $group: {
          _id: null,
          totalUpvotes: { $sum: "$upvotes" },
        },
      },
    ]);

    const [totalViews] = await Question.aggregate([
      { $match: { author: user._id } },
      {
        $group: {
          _id: null,
          totalViews: { $sum: "$views" },
        },
      },
    ]);

    const criteria = [
      { type: "Questions_count", count: totalQuestions },
      { type: "Answers_count", count: totalAnswers },
      { type: "Questions_Upvotes", count: questionUpvotes?.totalUpvotes || 0 },
      { type: "Answers_Upvotes", count: answerUpvotes?.totalUpvotes || 0 },
      { type: "Total_Views", count: totalViews?.totalViews || 0 },
    ];

    const badgeCount = assignedBadge({ criteria });
    return { user, totalQuestions, totalAnswers, badgeCount };
  } catch (error) {
    throw error;
  }
};

export const saveQuestion = async (params: SavedParams) => {
  const { userId, questionId, hasSaved, path } = params;
  try {
    await connectToDB();

    let updateQuery = {};
    if (hasSaved) {
      updateQuery = { $pull: { saved: questionId } };
    } else {
      updateQuery = { $push: { saved: questionId } };
    }

    await User.findByIdAndUpdate(userId, updateQuery, { new: true });
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(error.message || "Failed to save question");
  }
};
