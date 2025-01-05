"use client";

import React, { FC } from "react";
import { FaRegStar } from "react-icons/fa";
import { ImArrowDown, ImArrowUp } from "react-icons/im";
import { createDownVotes, createUpVotes } from "../lib/actions/ask.question";
import { VotesProps } from "../type";
import { answerDownVotes, answerUpVotes } from "../lib/actions/create.answer";
import { usePathname } from "next/navigation";

const Votes = ({
  itemId,
  userId,
  upVotes,
  downVotes,
  hasUpvoted,
  hasDownvoted,
  hasSaved,
  type,
}: VotesProps) => {
  console.log(hasUpvoted, hasDownvoted);
  const path = usePathname();
  const upvoteHandle = async () => {
    if (type === "question") {
      try {
        await createUpVotes({
          itemId,
          userId,
          hasUpvoted,
          hasDownvoted,
          path,
        });
      } catch (error) {
        console.log(error);
      }
    } else if (type === "answer") {
      try {
        await answerUpVotes({
          itemId,
          userId,
          hasUpvoted,
          hasDownvoted,
          path,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const downvoteHandle = async () => {
    if (type === "question") {
      try {
        await createDownVotes({
          itemId,
          userId,
          hasUpvoted,
          hasDownvoted,
          path,
        });
      } catch (error: any) {
        console.error("Error upvoting:", error.message);
      }
    } else if (type === "answer") {
      try {
        await answerDownVotes({
          itemId,
          userId,
          hasUpvoted,
          hasDownvoted,
          path,
        });
      } catch (error: any) {
        console.error("Error upvoting:", error.message);
      }
    }
  };
  return (
    <section className="flex gap-4 items-center">
      <div className="flex items-center gap-1 ">
        <button onClick={upvoteHandle}>
          <ImArrowUp
            className={`text-lg ${
              hasUpvoted ? "text-orange" : "text-gray-200"
            }`}
          />
        </button>

        <p className="bg-gray-200 text-black text-xs px-2 py-1 rounded ">
          {upVotes}
        </p>
      </div>
      <div className="flex items-center gap-1 ">
        <button onClick={downvoteHandle}>
          <ImArrowDown
            className={`text-lg ${
              hasDownvoted ? "text-orange" : "text-gray-200"
            }`}
          />
        </button>
        <p className="bg-gray-200 text-black text-xs px-2 py-1 rounded ">
          {downVotes}
        </p>
      </div>
      {type === "question" && (
        <button className={`text-lg ${hasSaved ? "text-orange" : ""}`}>
          <FaRegStar />
        </button>
      )}
    </section>
  );
};

export default Votes;
