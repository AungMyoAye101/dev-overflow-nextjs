import { NextResponse } from "next/server";
import { requireCurrentUser } from "@/src/lib/auth/session";
import { updateUser } from "@/src/lib/actions/user.action";

export async function PATCH(request: Request) {
  try {
    const user = await requireCurrentUser();
    const { updateData, path } = await request.json();

    await updateUser({
      userId: user._id.toString(),
      updateData,
      path,
    });

    return NextResponse.json({ success: true, userId: user._id.toString() });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to update profile.";

    return NextResponse.json(
      { error: message },
      { status: message === "Unauthorized" ? 401 : 500 }
    );
  }
}
