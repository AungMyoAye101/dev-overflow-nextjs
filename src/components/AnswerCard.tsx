import React from "react";
import { AnswerProps } from "../type";
import Image from "next/image";
import { timestamp } from "../lib/utils";
import Votes from "./Votes";
import Link from "next/link";
interface AnswerCardProps {
  answers: AnswerProps[];
  currUserId: string;
}

const AnswerCard = ({ answer, currUserId }: any) => {
  const formatDate = timestamp(answer.createdAt);
  return (
    <>
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
            hasSaved={false}
            type="answer"
          />
        </div>
        <div className="mt-4 font-noto_serif">{answer.content}</div>
      </main>
    </>
  );
};

export default AnswerCard;
