"use server";

import connectToDB from "@/src/database/db";
import User from "@/src/model/User.Model";
import { auth, currentUser } from "@clerk/nextjs/server";

export const getUser = async () => {
  try {
    await connectToDB();
    const { userId } = await auth();
    if (!userId) return console.log("No user found");
    return getUserById(userId);
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
