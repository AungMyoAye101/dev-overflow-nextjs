"use server";

import connectToDB from "@/database/db";
import Test from "@/model/test.model";
import User from "@/model/User.Model";

export const createUser = async (params: any) => {
  console.log(params);
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

export const createTest = async (test: string) => {
  try {
    await connectToDB();
    const testing = await Test.create({ name: test });
  } catch (err: any) {
    console.log("Faild to create text", err.message);
    return { success: false, error: err.message };
  }
};
