import React from "react";
import { answerSort } from "../constants";
import Link from "next/link";
import Votes from "./Votes";
import Image from "next/image";
import { timestamp } from "../lib/utils";
import { getAllAnswers } from "../lib/actions/answer.action";
import { getUserByClerkId } from "../lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import RenderText from "./RenderText";
import Filter from "./Filter";

interface Props {
  questionId: string;
  filter?: string;
}

const AllAnswer = async ({ questionId, filter }: Props) => {
  const question = await getAllAnswers({
    questionId,
    sortQuery: filter || "",
  });

  if (!question) return;
  const answers = JSON.parse(JSON.stringify(question));
  const { userId } = await auth();
  const user = await getUserByClerkId(userId!);
  if (!user) return;
  const currUserId = user._id.toString();

  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between items-center px-4">
        <h2 className="h3-bold text-orange capatalize">
          {answers.length} {answers.length > 1 ? "Answers" : "Answer"}
        </h2>
        <Filter filterArray={answerSort} />
      </div>
      {answers.length > 0 &&
        answers.map((answer: any) => (
          <main
            key={answer._id}
            className="flex flex-col gap-4 bg_dark_white p-4 rounded-lg shadow-md dark:shadow-none"
          >
            <div className="flex justify-between items-center ">
              <Link
                href={`/profile/${answer.author.clerkId}`}
                className="flex items-center gap-2"
              >
                <Image
                  src={answer.author.picture!}
                  width={40}
                  height={40}
                  alt={`${answer.author.name} profile`}
                  className="w-8 h-8 rounded-full"
                />
                <h1 className="font-semibold font-poppins ">
                  {answer.author.name}
                </h1>
                <p className="text-xs font-noto_serif opacity-80 capitalize">
                  {timestamp(answer.createdAt)}
                </p>
              </Link>
              <Votes
                itemId={answer._id}
                userId={currUserId}
                upVotes={answer.upvotes.length}
                downVotes={answer.downvotes.length}
                hasUpvoted={answer.upvotes?.includes(currUserId)}
                hasDownvoted={answer.downvotes?.includes(currUserId)}
                hasSaved={user.saved.includes(answer._id)}
                type="answer"
              />
            </div>
            <RenderText content={answer.content} />
          </main>
        ))}
    </section>
  );
};

export default AllAnswer;
