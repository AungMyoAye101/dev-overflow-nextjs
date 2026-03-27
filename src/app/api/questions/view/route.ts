import { NextResponse } from "next/server";
import { viewQuestion } from "@/src/lib/actions/interaction.action";
import { getCurrentUser } from "@/src/lib/auth/session";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    const { itemId, path } = await request.json();

    await viewQuestion({
      itemId,
      path,
      userId: user?._id?.toString() || "",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to track view." },
      { status: 500 }
    );
  }
}
