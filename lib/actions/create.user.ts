"use server";

import connectToDB from "@/database/db";
import User from "@/model/User.Model";
import { CreateUser } from "@/type";

export const createUser = async (params: any) => {
  try {
    await connectToDB();
    const newuser = await User.create(params);
    return newuser;
  } catch (err: any) {
    console.log("Faild to create user", err.message);
    return { success: false, error: err.message };
  }
};
