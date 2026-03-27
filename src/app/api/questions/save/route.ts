import { NextResponse } from "next/server";
import { saveQuestion } from "@/src/lib/actions/user.action";
import { requireCurrentUser } from "@/src/lib/auth/session";

export async function POST(request: Request) {
  try {
    const user = await requireCurrentUser();
    const { questionId, hasSaved, path } = await request.json();

    await saveQuestion({
      userId: user._id.toString(),
      questionId,
      hasSaved,
      path,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to save question.";

    return NextResponse.json(
      { error: message },
      { status: message === "Unauthorized" ? 401 : 500 }
    );
  }
}
