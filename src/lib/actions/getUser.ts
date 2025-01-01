"use server";

import connectToDB from "@/src/database/db";
import User from "@/src/model/User.Model";
import { currentUser } from "@clerk/nextjs/server";

export const getUser = async () => {
  try {
    await connectToDB();
    const currUser = await currentUser();
    const userId = currUser?.id;
    if (!userId) {
      throw new Error("User ID not found");
    }
    const user = await User.findOne({ clerkId: userId });

    console.log(user);
    return { success: true, user };
  } catch (err: any) {
    console.log("Faild to fetch user", err.message);
    return { success: false, error: err.message };
  }
};

export const getAllUsers = async () => {
  try {
    await connectToDB();
    const allUsers = await User.find({});

    return allUsers;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id: string) => {
  try {
    await connectToDB();
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw error;
  }
};
