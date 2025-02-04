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
import { useAuth } from "@clerk/nextjs";
import { useToast } from "../hooks/use-toast";

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
  const { userId: clerkId } = useAuth();
  const { toast } = useToast();
  const upvoteHandle = async () => {
    if (!clerkId) {
      return toast({
        title: "Failed to Upvote",
        description: "You need to login first",
      });
    }
    if (type === "question") {
      try {
        await createUpVotes({
          itemId,
          userId,
          hasUpvoted,
          hasDownvoted,
          path,
        });
        toast({
          title: " Successful Upvoted to the question",
          variant: "default",
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
        toast({
          title: " Successful Upvoted to the answer",
          variant: "default",
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const downvoteHandle = async () => {
    if (!clerkId) {
      return toast({
        title: "Failed to Upvote",
        description: "You need to login first",
      });
    }
    if (type === "question") {
      try {
        await createDownVotes({
          itemId,
          userId,
          hasUpvoted,
          hasDownvoted,
          path,
        });
        toast({
          title: " Successfully downVoted to the question",
          variant: "destructive",
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
        toast({
          title: " Successfully downVoted to the answer",
          variant: "destructive",
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
      toast({
        title: "Successfully saved",
        description: "This question saved to your collection",
        variant: "default",
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    viewQuestion({ itemId, userId, path });
  }, [itemId, userId, path, router]);

  return (
    <section className="flex gap-4 items-center">
      <div className="flex items-center gap-1 ">
        <button onClick={upvoteHandle}>
          <ImArrowUp
            className={`text-lg ${
              hasUpvoted ? "text-primary-blue" : "text-gray-300"
            }`}
          />
        </button>

        <p className="bg-gray-300 text-primary-blue text-xs px-2 py-1 rounded ">
          {upVotes}
        </p>
      </div>
      <div className="flex items-center gap-1 ">
        <button onClick={downvoteHandle}>
          <ImArrowDown
            className={`text-lg ${
              hasDownvoted ? "text-rose-500" : "text-gray-300"
            }`}
          />
        </button>
        <p className="bg-gray-300 text-xs text-primary-blue px-2 py-1 rounded ">
          {downVotes}
        </p>
      </div>
      {type === "question" && (
        <button
          className={`text-lg ${
            hasSaved ? "text-primary-blue" : "text-gray-300"
          }`}
          onClick={savedHandle}
        >
          <FaStar />
        </button>
      )}
    </section>
  );
};

export default Votes;
