"use server";
import connectToDB from "@/src/database/db";
import User from "@/src/model/User.Model";
export const createUser = async (params: any) => {
  try {
    await connectToDB();
    const newuser = await User.create(params);
    console.log(newuser);
    return newuser;
  } catch (err: any) {
    console.log("Faild to create user", err.message);
    return { success: false, error: err.message };
  }
};

export const updateUser = async (params: any) => {
  const { clerkId, updateData } = params;
  try {
    await connectToDB();
    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });
  } catch (err: any) {
    console.log("Faild to create user", err.message);
    return { success: false, error: err.message };
  }
};

export const deleteUser = async (params: any) => {
  const { clerkId } = params;
  try {
    await connectToDB();
    await User.findOneAndDelete({ clerkId });
  } catch (err: any) {
    console.log("Faild to create user", err.message);
    return { success: false, error: err.message };
  }
};
