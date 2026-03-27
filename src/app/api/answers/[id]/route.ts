import { NextResponse } from "next/server";
import { deleteAnswer } from "@/src/lib/actions/answer.action";
import { requireCurrentUser } from "@/src/lib/auth/session";
import connectToDB from "@/src/database/db";
import Answer from "@/src/model/answer.model";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const currentUser = await requireCurrentUser();
    const { id } = await params;

    await connectToDB();
    const answer = await Answer.findById(id);

    if (!answer) {
      return NextResponse.json({ error: "Answer not found." }, { status: 404 });
    }

    if (answer.author.toString() !== currentUser._id.toString()) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await deleteAnswer({ answerId: id, path: `/question/${answer.question}` });

    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to delete answer.";

    return NextResponse.json(
      { error: message },
      { status: message === "Unauthorized" ? 401 : 500 }
    );
  }
}

