import React from "react";
import { Badge } from "./ui/badge";
import { FaComment, FaEye, FaThumbsUp } from "react-icons/fa";
import Image from "next/image";
import { QuestionProps } from "../type";
import { getUser, getUserById } from "../lib/actions/getUser";
import { get } from "http";
import { getTagById } from "../lib/actions/get.tags";

interface PostProps {
  key?: string;
  question: QuestionProps;
}

const Post = async ({ question }: PostProps) => {
  const user = await getUserById(question.author);

  const tags = [];
  for (const tag of question.tags) {
    const tagData = await getTagById(tag);
    tags.push(tagData);
  }
  if (!user) return null;

  return (
    <div className="flex flex-col gap-6 px-6 py-10 rounded-md shadow dark:shadow-none bg_dark_white">
      <h2 className="text-xl font-poppins font-bold">{question.title}</h2>
      <div className="flex items-center gap-4">
        {tags.map((tag) => (
          <Badge key={tag.name} className="px-3 py-1.5 font-poppins">
            {tag.name}
          </Badge>
        ))}
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-noto_serif">
          <Image
            src={user.picture!}
            alt="user"
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          />
          <h3 className="text-sm font-semibold ">{user.name}</h3>

          <p className="text-xs">asked 2 min ago</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-noto_serif">
          <div className="flex items-center gap-1">
            <FaThumbsUp className="text-blue-600 cursor-pointer" />
            <p>1.2k Votes</p>
          </div>
          <div className="flex items-center gap-1">
            <FaComment className="text-blue-600 cursor-pointer" />
            <p>1.2k Answers</p>
          </div>
          <div className="flex items-center gap-1">
            <FaEye className="text-blue-600 cursor-pointer" />
            <p>1.2k Views</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
