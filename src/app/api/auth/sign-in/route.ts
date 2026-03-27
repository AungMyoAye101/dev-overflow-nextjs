import { NextResponse } from "next/server";
import { getUserByEmail } from "@/src/lib/actions/user.action";
import { verifyPassword } from "@/src/lib/auth/password";
import { createUserSession } from "@/src/lib/auth/session";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const user: any = await getUserByEmail(email.toLowerCase().trim());

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const isValidPassword = await verifyPassword(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    await createUserSession(user._id.toString());

    return NextResponse.json({
      user: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        picture: user.picture,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Sign-in failed." },
      { status: 500 }
    );
  }
}
