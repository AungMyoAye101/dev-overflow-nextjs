"use client";

import { usePathname } from "next/navigation";
import React, { FC } from "react";
import { FaRegStar } from "react-icons/fa";
import { ImArrowDown, ImArrowUp } from "react-icons/im";
import { createUpVotes } from "../lib/actions/ask.question";
import { VotesProps } from "../type";

const Votes: FC<VotesProps> = ({
  questionId,
  userId,
  upVotes,
  downVotes,
  hasUpvoted,
  hasDownvoted,
  hasSaved,
}) => {
  const path = usePathname();

  console.log(
    questionId,
    userId,
    upVotes,
    downVotes,
    hasUpvoted,
    hasDownvoted,
    hasSaved
  );
  const upvoteHandle = async () => {
    try {
      await createUpVotes({
        questionId,
        userId,
        hasUpvoted,
        hasDownvoted,
        path,
      });
      console.log("upvoted");
    } catch (error: any) {
      console.error("Error upvoting:", error.message);
    }
  };
  const downvoteHandle = async () => {
    console.log("click");
  };
  return (
    <section className="flex gap-4 items-center">
      <div className="flex items-center gap-1 ">
        <button onClick={upvoteHandle}>
          <ImArrowUp className="text-lg" />
        </button>

        <p className="bg-gray-200 text-black text-xs px-1 py-1 rounded ">
          {upVotes}
        </p>
      </div>
      <div className="flex items-center gap-1 ">
        <button onClick={downvoteHandle}>
          <ImArrowDown className="text-lg" />
        </button>
        <p className="bg-gray-200 text-black text-xs px-1 py-1 rounded ">
          {downVotes}
        </p>
      </div>
      <div>
        <FaRegStar className="text-lg" />
      </div>
    </section>
  );
};

export default Votes;
