"use server";

import connectToDB from "@/database/db";
import User from "@/model/User.Model";

export const getUser = async (param: any) => {
  try {
    await connectToDB();
    const exitUser = await User.findOne({ clerkId: param });
    const user = await exitUser.json();
    console.log(user);
    return { success: true, user };
  } catch (err: any) {
    console.log("Faild to fetch user", err.message);
    return { success: false, error: err.message };
  }
};
