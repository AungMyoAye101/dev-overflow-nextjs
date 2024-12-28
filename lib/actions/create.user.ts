"use server";

import connectToDB from "@/database/db";
import User from "@/model/User.Model";

export const createUser = async (params: any) => {
  try {
    await connectToDB();

    const user = await User.create(params);
    console.log("User created:", user);

    return { success: true, user };
  } catch (err: any) {
    console.log("Faild to create user", err.message);
    return { success: false, error: err.message };
  }
};
