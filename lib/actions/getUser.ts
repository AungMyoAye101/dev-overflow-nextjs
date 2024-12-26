"use server";

import connectToDB from "@/database/db";
import User from "@/model/User.Model";

export const getUser = async (userId: any) => {
  try {
    await connectToDB();
    const user = await User.findById({ clerkId: userId });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
