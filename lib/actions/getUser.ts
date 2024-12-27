"use server";

import connectToDB from "@/database/db";
import User from "@/model/User.Model";

export const getUserById = async (userId: string) => {
  try {
    await connectToDB();
    const user = await User.findById({ _id: userId });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
