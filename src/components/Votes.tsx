"use client";

import { FaStar } from "react-icons/fa";
import { ImArrowDown, ImArrowUp } from "react-icons/im";
import { VotesProps } from "../type";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useToast } from "../hooks/use-toast";
import { useSession } from "@/src/components/AuthProvider";

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
  const { isAuthenticated } = useSession();
  const { toast } = useToast();
  const upvoteHandle = async () => {
    if (!isAuthenticated) {
      return toast({
        title: "Failed to Upvote",
        description: "You need to login first",
      });
    }
    try {
      const response = await fetch("/api/votes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          action: "upvote",
          itemId,
          userId,
          hasUpvoted,
          hasDownvoted,
          path,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Vote failed");
      }

      toast({
        title: `Successful upvote on the ${type}`,
        variant: "default",
      });
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const downvoteHandle = async () => {
    if (!isAuthenticated) {
      return toast({
        title: "Failed to Upvote",
        description: "You need to login first",
      });
    }
    try {
      const response = await fetch("/api/votes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          action: "downvote",
          itemId,
          userId,
          hasUpvoted,
          hasDownvoted,
          path,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Vote failed");
      }

      toast({
        title: `Successful downvote on the ${type}`,
        variant: "destructive",
      });
      router.refresh();
    } catch (error: any) {
      console.error("Error upvoting:", error.message);
    }
  };

  //Saved the question function

  const savedHandle = async () => {
    try {
      const response = await fetch("/api/questions/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questionId: itemId,
          hasSaved,
          path,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Save failed");
      }

      toast({
        title: "Successfully saved",
        description: "This question saved to your collection",
        variant: "default",
      });
      router.refresh();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetch("/api/questions/view", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId, path }),
    });
  }, [itemId, path]);

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
