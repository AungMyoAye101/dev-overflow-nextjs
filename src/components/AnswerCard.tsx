import React from "react";
import { AnswerTypes } from "../type";
import Image from "next/image";
import { timestamp } from "../lib/utils";
import Link from "next/link";
import EditDeleteAction from "./EditDeleteAction";
import { FaRegThumbsUp } from "react-icons/fa";
import RenderText from "./RenderText";
interface AnswerCardProps {
  answer: AnswerTypes;
  currUserId: string;
}

const AnswerCard = ({ answer, currUserId }: AnswerCardProps) => {
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
              {formatDate}
            </p>
          </Link>
          {currUserId && <EditDeleteAction type="answer" id={answer._id} />}
        </div>
        <div className=" font-noto_serif">
          <Link href={`/question/${answer.question}`}>
            <RenderText content={answer.content} />
          </Link>
        </div>
        <RenderText content={answer.content} />

        <div className="flex items-center gap-1  text-sm font-noto_serif">
          <FaRegThumbsUp className="text-blue-600 cursor-pointer" />
          <p>{answer.upvotes?.length} Votes</p>
        </div>
      </main>
    </>
  );
};

export default AnswerCard;
