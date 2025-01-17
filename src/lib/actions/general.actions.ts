"use server";

import { searchType } from "@/src/constants";
import connectToDB from "@/src/database/db";
import Answer from "@/src/model/answer.model";

import Question from "@/src/model/question.model";
import Tags from "@/src/model/Tag.model";
import User from "@/src/model/User.Model";
import { GlobalSearchParams } from "@/src/type";

export const globalSearch = async (params: GlobalSearchParams) => {
  try {
    await connectToDB();
    const { global, type } = params;

    const regexQuery = { $regex: global, $options: "i" };

    //   //Models and types

    const modelsAndTypes = [
      {
        model: Question,
        searchField: "title",
        type: "questions",
      },
      {
        model: Answer,
        searchField: "content",
        type: "answers",
      },
      {
        model: Tags,
        searchField: "name",
        type: "tags",
      },
      {
        model: User,
        searchField: "name",
        type: "users",
      },
    ];

    let results: any = [];
    const typeLower = type?.toLocaleLowerCase();
    if (!typeLower && !searchType.includes(type!)) {
      //search everything

      for (const { model, searchField, type } of modelsAndTypes) {
        const queryResults = await model
          .find({ [searchField]: regexQuery })
          .limit(2);

        results.push(
          ...queryResults.map((item) => ({
            title:
              type === "answers"
                ? `Answers containing query ${global}`
                : item[searchField],
            type,
            id:
              type === "users"
                ? item.clerkId
                : type === "answers"
                ? item.question
                : item._id,
          }))
        );
      }
    } else {
      //search in specified field

      const modelInfo = modelsAndTypes.find((item) => item.type === typeLower);
      if (!modelInfo) {
        throw new Error("Model not found!");
      }

      const serachResults = await modelInfo.model
        .find({ [modelInfo.searchField]: regexQuery })
        .limit(6);
      results = serachResults.map((item) => ({
        title:
          type === "answers"
            ? `Answers containing query ${global}`
            : item[modelInfo.searchField],
        type,
        id:
          type === "users"
            ? item.clerkId
            : type === "answers"
            ? item.question
            : item._id,
      }));
    }
    return JSON.stringify(results);
  } catch (error) {
    console.log("Failed to fetch in global search..", error);
    throw error;
  }
};
