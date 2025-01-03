import Answer from "@/src/components/Answer";
import { Badge } from "@/src/components/ui/badge";
import Votes from "@/src/components/Votes";
import { getQuestionById } from "@/src/lib/actions/getAllQuestion";
import { getUser } from "@/src/lib/actions/getUser";
import { timestamp } from "@/src/lib/utils";
import { QuestionProps } from "@/src/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaClock, FaComment, FaEye, FaThumbsUp } from "react-icons/fa";

const page = async ({ params }: { params: { questionId: string } }) => {
  const { questionId } = params;

  const questionDetail = await getQuestionById(questionId);
  if (!questionDetail) {
    return console.log("question detail not found");
  }
  const formattedDate = timestamp(questionDetail.createdAt);
  const user = await getUser();

  return (
    <section className="page_padding">
      <div className="flex flex-col gap-6 bg_dark_white px-6 py-6 rounded-lg shadow-md dark:shadow-none">
        {/* User profile and votes */}
        <div className="flex justify-between items-center ">
          <Link
            href={`/profile/${questionDetail.author._id}`}
            className="flex items-center gap-2"
          >
            <Image
              src={questionDetail.author.picture}
              width={40}
              height={40}
              alt={`${questionDetail.author.name} profile`}
              className="w-8 h-8 rounded-full"
            />
            <h1 className="font-semibold font-poppins ">
              {questionDetail.author.name}
            </h1>
          </Link>
          <Votes />
        </div>

        <div className="flex flex-col gap-4 ">
          <h1 className="h2-bold">{questionDetail.title}</h1>

          <div className="flex items-center gap-3 text-sm font-noto_serif">
            <div className="flex items-center gap-1">
              <FaClock className="text-blue-600 cursor-pointer" />
              <p>{formattedDate} </p>
            </div>

            <div className="flex items-center gap-1">
              <FaComment className="text-blue-600 cursor-pointer" />
              <p>{questionDetail.answers.length} Answers</p>
            </div>
            <div className="flex items-center gap-1">
              <FaEye className="text-blue-600 cursor-pointer" />
              <p>{questionDetail.views} Views</p>
            </div>
          </div>
          <p className="para">{questionDetail.content}</p>
          <div className="flex items-center gap-4 ">
            {questionDetail.tags.map((tag: { _id: string; name: string }) => (
              <Badge key={tag._id} className="px-4 py-1.5">
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* answer section */}
      <Answer user={user} />
    </section>
  );
};

export default page;
