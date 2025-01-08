"use client";

import { FaStar } from "react-icons/fa";
import { ImArrowDown, ImArrowUp } from "react-icons/im";
import { createDownVotes, createUpVotes } from "../lib/actions/question.action";
import { VotesProps } from "../type";
import { answerDownVotes, answerUpVotes } from "../lib/actions/answer.action";
import { usePathname, useRouter } from "next/navigation";
import { saveQuestion } from "../lib/actions/user.action";
import { useEffect } from "react";
import { viewQuestion } from "../lib/actions/interaction.action";

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
  const path = usePathname();
  const router = useRouter();
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

  //Saved the question function

  const savedHandle = async () => {
    try {
      await saveQuestion({ userId, questionId: itemId, hasSaved, path });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    viewQuestion({ questionId: itemId, userId, path });
  }, [itemId, userId, path, router]);

  return (
    <section className="flex gap-4 items-center">
      <div className="flex items-center gap-1 ">
        <button onClick={upvoteHandle}>
          <ImArrowUp
            className={`text-lg ${
              hasUpvoted ? "text-orange" : "text-gray-300"
            }`}
          />
        </button>

        <p className="bg-gray-300 text-black text-xs px-2 py-1 rounded ">
          {upVotes}
        </p>
      </div>
      <div className="flex items-center gap-1 ">
        <button onClick={downvoteHandle}>
          <ImArrowDown
            className={`text-lg ${
              hasDownvoted ? "text-orange" : "text-gray-300"
            }`}
          />
        </button>
        <p className="bg-gray-300 text-black text-xs px-2 py-1 rounded ">
          {downVotes}
        </p>
      </div>
      {type === "question" && (
        <button
          className={`text-lg ${hasSaved ? "text-orange" : "text-gray-300"}`}
          onClick={savedHandle}
        >
          <FaStar />
        </button>
      )}
    </section>
  );
};

export default Votes;
