import { NextResponse } from "next/server";
import { askQuestion } from "@/src/lib/actions/question.action";
import { requireCurrentUser } from "@/src/lib/auth/session";

export async function POST(request: Request) {
  try {
    const user = await requireCurrentUser();
    const { title, content, tags, path } = await request.json();

    await askQuestion({
      title,
      content,
      tags,
      path,
      userId: user._id.toString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to create question.";

    return NextResponse.json(
      { error: message },
      { status: message === "Unauthorized" ? 401 : 500 }
    );
  }
}
