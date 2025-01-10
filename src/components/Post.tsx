"use client";
import React from "react";
import { Badge } from "./ui/badge";
import { FaComment, FaEdit, FaEye, FaThumbsUp, FaTrash } from "react-icons/fa";
import Image from "next/image";
import { QuestionProps } from "../type";
import Link from "next/link";
import { timestamp } from "../lib/utils";
import { deleteQuestion } from "../lib/actions/question.action";
import { usePathname } from "next/navigation";

interface PostProps {
  question: QuestionProps;
  ownProfile?: boolean;
}

const Post = ({ question }: PostProps) => {
  const formatDate = timestamp(question.createdAt);

  return (
    <div className="flex flex-col gap-6 px-6 py-10 rounded-md shadow dark:shadow-none bg_dark_white">
      <Link href={`/question/${question._id}`}>
        <h2 className="h3-bold hover:text-orange">{question.title}</h2>
      </Link>
      <div className="flex items-center gap-4">
        {question.tags.map((tag) => (
          <Link href={`/tags/${tag._id}`} key={tag.name}>
            <Badge className="px-3 py-1.5 font-poppins">{tag.name}</Badge>
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-between gap-4">
        <Link
          href={`/profile/${question.author.clerkId}`}
          className="flex items-center gap-2 font-noto_serif"
        >
          <Image
            src={question.author.picture!}
            alt="user"
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          />
          <h3 className="text-sm font-semibold ">{question.author.name}</h3>

          <p className="text-xs">{formatDate}</p>
        </Link>
        <div className="flex items-center gap-2 text-sm font-noto_serif">
          <div className="flex items-center gap-1">
            <FaThumbsUp className="text-blue-600 cursor-pointer" />
            <p>{question.upvotes?.length} Votes</p>
          </div>
          <div className="flex items-center gap-1">
            <FaComment className="text-blue-600 cursor-pointer" />
            <p>{question.answers?.length} Answers</p>
          </div>
          <div className="flex items-center gap-1">
            <FaEye className="text-blue-600 cursor-pointer" />
            <p>{question.views} Views</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
