import { NextResponse } from "next/server";
import { createAnswer } from "@/src/lib/actions/answer.action";
import { requireCurrentUser } from "@/src/lib/auth/session";

export async function POST(request: Request) {
  try {
    const user = await requireCurrentUser();
    const { content, questionId, path } = await request.json();

    await createAnswer({
      content,
      questionId,
      path,
      userId: user._id.toString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to create answer.";

    return NextResponse.json(
      { error: message },
      { status: message === "Unauthorized" ? 401 : 500 }
    );
  }
}
