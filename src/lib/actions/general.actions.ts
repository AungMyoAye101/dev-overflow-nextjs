import { searchType } from "@/src/constants";
import Answer from "@/src/model/answer.model";
import Question from "@/src/model/question.model";
import Tags from "@/src/model/Tag.model";
import User from "@/src/model/User.Model";
import { GlobalSearchParams } from "@/src/type";

const globalSearch = async (params: GlobalSearchParams) => {
  try {
    const { global, type } = params;

    const regexQuery = { $regex: global, $options: "i" };

    //Models and types
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

    let results = {};

    if (!type?.toLocaleLowerCase() && !searchType.includes(type!)) {
      //search everything
    } else {
      //search in specified field

      const modelInfo = modelsAndTypes.find((item) => item.type === type);
      if (!modelInfo) {
        throw new Error("Model not found!");
      }

      const serachResults = await modelInfo.model
        .find({ [modelInfo.searchField]: regexQuery })
        .limit(5);
      results = serachResults.map((item) => ({
        title:
          type === "answers"
            ? `Answers containing query ${global}`
            : item[modelInfo.searchField],
        type,
        id:
          type === "users"
            ? item.clerkId
            : item === "answers"
            ? item.questions
            : item._id,
      }));
    }

    return JSON.stringify(results);
  } catch (error) {
    console.log("Failed to fetch in global search..", error);
    throw error;
  }
};
