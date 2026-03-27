import { NextResponse } from "next/server";
import { deleteQuestion, getQuestionById } from "@/src/lib/actions/question.action";
import { requireCurrentUser } from "@/src/lib/auth/session";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const currentUser = await requireCurrentUser();
    const { id } = await params;
    const question: any = await getQuestionById(id);

    if (!question) {
      return NextResponse.json({ error: "Question not found." }, { status: 404 });
    }

    if (question.author._id.toString() !== currentUser._id.toString()) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await deleteQuestion({ questionId: id, path: `/question/${id}` });

    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to delete question.";

    return NextResponse.json(
      { error: message },
      { status: message === "Unauthorized" ? 401 : 500 }
    );
  }
}
