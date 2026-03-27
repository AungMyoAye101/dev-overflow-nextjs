import { NextResponse } from "next/server";
import {
  createDownVotes,
  createUpVotes,
} from "@/src/lib/actions/question.action";
import {
  answerDownVotes,
  answerUpVotes,
} from "@/src/lib/actions/answer.action";
import { requireCurrentUser } from "@/src/lib/auth/session";

export async function POST(request: Request) {
  try {
    await requireCurrentUser();
    const { type, action, itemId, userId, hasUpvoted, hasDownvoted, path } =
      await request.json();

    if (type === "question" && action === "upvote") {
      await createUpVotes({ itemId, userId, hasUpvoted, hasDownvoted, path });
    } else if (type === "question" && action === "downvote") {
      await createDownVotes({ itemId, userId, hasUpvoted, hasDownvoted, path });
    } else if (type === "answer" && action === "upvote") {
      await answerUpVotes({ itemId, userId, hasUpvoted, hasDownvoted, path });
    } else if (type === "answer" && action === "downvote") {
      await answerDownVotes({ itemId, userId, hasUpvoted, hasDownvoted, path });
    } else {
      return NextResponse.json({ error: "Invalid vote request." }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to vote.";

    return NextResponse.json(
      { error: message },
      { status: message === "Unauthorized" ? 401 : 500 }
    );
  }
}
