import "server-only";

import { cookies } from "next/headers";
import connectToDB from "@/src/database/db";
import User from "@/src/model/User.Model";
import {
  AUTH_COOKIE_NAME,
  getAuthTokenMaxAge,
  signAuthToken,
  verifyAuthToken,
} from "@/src/lib/auth/jwt";

interface SessionUserInput {
  _id: string;
  email: string;
  name: string;
  picture?: string;
}

const getCookieStore = async () => cookies();

export const createUserSession = async (user: SessionUserInput) => {
  const token = await signAuthToken({
    sub: user._id,
    email: user.email,
    name: user.name,
    picture: user.picture,
  });

  const cookieStore = await getCookieStore();
  cookieStore.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: getAuthTokenMaxAge(),
  });
};

export const deleteSession = async () => {
  const cookieStore = await getCookieStore();
  cookieStore.delete(AUTH_COOKIE_NAME);
};

export const getCurrentUser = async () => {
  const cookieStore = await getCookieStore();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) return null;

  const payload = await verifyAuthToken(token);

  if (!payload?.sub) {
    cookieStore.delete(AUTH_COOKIE_NAME);
    return null;
  }

  await connectToDB();
  const user = await User.findById(payload.sub);

  if (!user) {
    cookieStore.delete(AUTH_COOKIE_NAME);
    return null;
  }

  return user;
};

export const requireCurrentUser = async () => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
};
