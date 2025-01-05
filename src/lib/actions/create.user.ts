"use server";
import connectToDB from "@/src/database/db";
import User from "@/src/model/User.Model";
import { ClerkIdProp, CreateUser, SavedParams, UpdateUser } from "@/src/type";
import { getUser } from "./getUser";
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
  } catch (error) {
    throw new Error("Failed to save question");
  }
};
