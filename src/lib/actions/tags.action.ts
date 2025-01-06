"use server";

import { Question } from "@/src/components/Question";
import connectToDB from "@/src/database/db";
import Tags from "@/src/model/Tag.model";
import { NextResponse } from "next/server";

export const getTagById = async (id: string) => {
  try {
    await connectToDB();
    const tags = await Tags.findById(id);
    return tags;
  } catch (error: any) {
    console.log("Failed to fetch tags", error.message);
    throw error;
  }
};
export const getAllTags = async () => {
  try {
    await connectToDB();
    const tags = await Tags.find().populate({
      path: "questions",
      select: "_id title description",
    });
    console.log(tags);
    return tags;
  } catch (error: any) {
    console.log("Failed to fetch tags", error.message);
    throw error;
  }
};
