"use server";
import connectToDB from "@/src/database/db";
import Question from "@/src/model/question.model";
import Tags from "@/src/model/Tag.model";
import User from "@/src/model/User.Model";
import { SearchFilterQueryParams, TagsPrams } from "@/src/type";
import { FilterQuery } from "mongoose";

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
export const getAllTags = async (params: SearchFilterQueryParams) => {
  try {
    await connectToDB();
    const { searchQuery, sortQuery, page = 1, pageSize = 9 } = params;
    const query: FilterQuery<typeof Tags> = {};

    //for local search
    if (searchQuery) {
      query.$or = [
        {
          name: { $regex: new RegExp(searchQuery, "i") },
        },
      ];
    }

    //For filter

    let sortBy = {};
    switch (sortQuery) {
      case "popular":
        sortBy = { questions: -1 };
        break;
      case "recent":
        sortBy = { createdOn: -1 };
        break;
      case "name":
        sortBy = { name: 1 };
        break;
      case "old":
        sortBy = { createdOn: 1 };
        break;

      default:
        sortBy = { createdOn: -1 };
        break;
    }

    //For pagination

    const skipAmount = (page - 1) * pageSize;

    const tags = await Tags.find(query)
      .populate({
        path: "questions",
        select: "_id title description",
      })
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortBy);

    const totalTags = await Tags.countDocuments(query);
    const isNext = totalTags > skipAmount + tags.length;
    return { tags, isNext };
  } catch (error: any) {
    console.log("Failed to fetch tags", error.message);
    throw error;
  }
};

export const getQuestionByTagId = async (params: TagsPrams) => {
  const { tagId } = params;
  try {
    const tag = await Tags.findById(tagId).populate({
      path: "questions",
      model: Question,
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        {
          path: "author",
          model: User,
          select: "_id name username picture",
        },
        {
          path: "tags",
          model: Tags,
          select: "_id name ",
        },
      ],
    });

    if (!tag) {
      throw new Error("Tags not found");
    }

    return { name: tag.name, questions: tag.questions };
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
};

export const getTopTags = async () => {
  try {
    await connectToDB();
    const topTags = await Tags.aggregate([
      {
        $project: {
          name: 1,
          numberOfQuestions: { $size: "$questions" },
        },
      },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 5 },
    ]);
    if (!topTags) {
      throw new Error("No Populer tags found!");
    }

    return topTags;
  } catch (error) {
    throw error;
  }
};
