import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { filteredSearch } from "../constants";

import Link from "next/link";
import Votes from "./Votes";
import Image from "next/image";
import { timestamp } from "../lib/utils";
import { getAllAnswers } from "../lib/actions/create.answer";
import { AnswerTypes } from "../type";

interface Props {
  questionId: string;
}

const AllAnswer = async ({ questionId }: Props) => {
  const answers: AnswerTypes[] = await getAllAnswers(questionId);
  if (!answers) return;

  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between items-center px-4">
        <h2 className="h3-bold text-orange capatalize">
          {answers.length} {answers.length > 1 ? "Answers" : "Answer"}
        </h2>
        <Select>
          <SelectTrigger className="font-poppins font-semibold w-fit px-4 py-2 ">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            {filteredSearch.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {answers.length > 0 &&
        answers.map((answer) => (
          <main
            key={answer._id}
            className="flex flex-col gap-4 bg_dark_white p-4 rounded-lg shadow-md dark:shadow-none"
          >
            <div className="flex justify-between items-center ">
              <Link
                href={`/profile/${answer.author._id}`}
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
              <Votes />
            </div>
            <div className="mt-4 font-noto_serif">{answer.content}</div>
          </main>
        ))}

      {/* <div className="flex justify-between items-center ">
          <Link
            href={`/profile/${answers.author._id}`}
            className="flex items-center gap-2"
          >
            <Image
              src={answers.author.picture}
              width={40}
              height={40}
              alt={`${answers.author.name} profile`}
              className="w-8 h-8 rounded-full"
            />
            <h1 className="font-semibold font-poppins ">
              {answers.author.name}
            </h1>
          </Link>
          <Votes />
        </div> */}

      <div></div>
    </section>
  );
};

export default AllAnswer;
