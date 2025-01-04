import AllAnswer from "@/src/components/AllAnswer";
import Answer from "@/src/components/Answer";
import { Badge } from "@/src/components/ui/badge";
import Votes from "@/src/components/Votes";
import { getQuestionById } from "@/src/lib/actions/getAllQuestion";

import { timestamp } from "@/src/lib/utils";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaClock, FaComment, FaEye } from "react-icons/fa";

const page = async ({ params }: { params: { questionId: string } }) => {
  const { questionId } = await params;

  const res = await getQuestionById(questionId);
  const question = JSON.parse(JSON.stringify(res));

  const formattedDate = timestamp(question.createdAt);

  return (
    <section className="page_padding">
      <div className="flex flex-col gap-6 bg_dark_white px-6 py-6 rounded-lg shadow-md dark:shadow-none">
        {/* User profile and votes */}
        <div className="flex justify-between items-center ">
          <Link
            href={`/profile/${question.author._id}`}
            className="flex items-center gap-2"
          >
            <Image
              src={question.author.picture}
              width={40}
              height={40}
              alt={`${question.author.name} profile`}
              className="w-8 h-8 rounded-full"
            />
            <h1 className="font-semibold font-poppins ">
              {question.author.name}
            </h1>
          </Link>
          <Votes />
        </div>

        <div className="flex flex-col gap-4 ">
          <h1 className="h2-bold">{question.title}</h1>

          <div className="flex items-center gap-3 text-sm font-noto_serif">
            <div className="flex items-center gap-1">
              <FaClock className="text-blue-600 cursor-pointer" />
              <p>{formattedDate} </p>
            </div>

            <div className="flex items-center gap-1">
              <FaComment className="text-blue-600 cursor-pointer" />
              <p>{question.answers.length} Answers</p>
            </div>
            <div className="flex items-center gap-1">
              <FaEye className="text-blue-600 cursor-pointer" />
              <p>{question.views} Views</p>
            </div>
          </div>
          <p className="para">{question.content}</p>
          <div className="flex items-center gap-4 ">
            {question.tags.map((tag: { _id: string; name: string }) => (
              <Badge key={tag._id} className="px-4 py-1.5">
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Answers */}
      <AllAnswer />

      <Answer questionId={question._id} />
    </section>
  );
};

export default page;
