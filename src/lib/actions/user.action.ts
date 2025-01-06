"use server";
import connectToDB from "@/src/database/db";
import User from "@/src/model/User.Model";
import { ClerkIdProp, CreateUser, SavedParams, UpdateUser } from "@/src/type";
import { auth } from "@clerk/nextjs/server";
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
  const { clerkId, updateData } = params;
  try {
    await connectToDB();
    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });
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

export const getAllUsers = async () => {
  try {
    await connectToDB();
    const allUsers = await User.find();

    return allUsers;
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
