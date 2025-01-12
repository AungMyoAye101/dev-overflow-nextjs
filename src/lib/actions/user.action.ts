"use server";

import connectToDB from "@/src/database/db";
import Answer from "@/src/model/answer.model";
import Question from "@/src/model/question.model";
import User from "@/src/model/User.Model";
import {
  ClerkIdProp,
  CreateUser,
  SavedParams,
  SearchFilterQueryParams,
  UpdateUser,
} from "@/src/type";
import { auth } from "@clerk/nextjs/server";
import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";

export const createUser = async (params: CreateUser) => {
  try {
    await connectToDB();
    const newuser = await User.create(params);

    return newuser;
  } catch (err: any) {
    console.log("Faild to create user", err.message);
    return { success: false, error: err.message };
  }
};

export const updateUser = async (params: UpdateUser) => {
  const { clerkId, updateData, path } = params;
  try {
    await connectToDB();
    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });

    if (path) {
      revalidatePath(path);
    }
    return { success: true };
  } catch (err: any) {
    console.log("Faild to create user", err.message);
    return { success: false, error: err.message };
  }
};

export const deleteUser = async (params: ClerkIdProp) => {
  const { clerkId } = params;
  try {
    await connectToDB();
    await User.findOneAndDelete({ clerkId });
  } catch (err: any) {
    console.log("Faild to create user", err.message);
    return { success: false, error: err.message };
  }
};

export const getUser = async () => {
  try {
    await connectToDB();
    const { userId } = await auth();
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (err: any) {
    console.log("Faild to fetch user", err.message);
    return { success: false, error: err.message };
  }
};

export const getAllUsers = async (params: SearchFilterQueryParams) => {
  try {
    await connectToDB();
    const { searchQuery, sortQuery, page = 1, pageSize = 10 } = params;
    const query: FilterQuery<typeof User> = {};
    //search
    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, "i") } },
        { username: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }
    //query by filter
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

    //for pagination
    const skipAmount = (page - 1) * pageSize;

    const users = await User.find(query)
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortBy);
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

export const getUserById = async (id: string) => {
  try {
    await connectToDB();
    const user = await User.findById(id);
    if (!user) {
      throw new Error("user not find");
    }
    return user;
  } catch (error) {
    throw error;
  }
};
export const getUserInfo = async (id: string) => {
  try {
    await connectToDB();
    const user = await User.findOne({ clerkId: id });
    if (!user) {
      throw new Error("user not find");
    }
    const totalQuestions = await Question.countDocuments({ author: user._id });
    const totalAnswers = await Answer.countDocuments({ author: user._id });

    return { user, totalQuestions, totalAnswers };
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
    console.log("question saved successfull");
    revalidatePath(path);
  } catch (error: any) {
    throw new Error("Failed to save question", error.message);
  }
};
