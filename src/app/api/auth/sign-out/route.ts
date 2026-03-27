import { NextResponse } from "next/server";
import { deleteSession } from "@/src/lib/auth/session";

export async function POST() {
  await deleteSession();

  return NextResponse.json({ success: true });
}
