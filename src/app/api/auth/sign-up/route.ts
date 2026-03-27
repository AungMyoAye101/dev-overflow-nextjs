import { NextResponse } from "next/server";
import { createUser, getUserByEmail } from "@/src/lib/actions/user.action";
import { hashPassword } from "@/src/lib/auth/password";
import { createUserSession } from "@/src/lib/auth/session";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await getUserByEmail(normalizedEmail);

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with that email already exists." },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);
    const user: any = await createUser({
      name: name.trim(),
      email: normalizedEmail,
      password: passwordHash,
      picture: "/assets/icons/profile.svg",
    });

    if (!user?._id) {
      return NextResponse.json(
        { error: user?.error || "Unable to create account." },
        { status: 500 }
      );
    }

    await createUserSession({
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      picture: user.picture,
    });

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
      { error: error instanceof Error ? error.message : "Sign-up failed." },
      { status: 500 }
    );
  }
}
