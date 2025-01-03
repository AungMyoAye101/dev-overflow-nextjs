import connectToDB from "@/src/database/db";
import Answer from "@/src/model/answer.model";

export const createAnswer = async (params: any) => {
  const { answer, userId, questionId } = params;
  console.log(answer, userId, questionId);
  //   try {
  //     await connectToDB();
  //     const newAnswer = await Answer.create({ answer, question, author });
  //     console.log("new answer", newAnswer);
  //     return newAnswer;
  //   } catch (error) {
  //     throw error;
  //   }
};
