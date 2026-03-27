import "server-only";

import { cookies } from "next/headers";
import { createHash, randomBytes } from "crypto";
import connectToDB from "@/src/database/db";
import Session from "@/src/model/Session.Model";
import User from "@/src/model/User.Model";

export const SESSION_COOKIE_NAME = "dev_overflow_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 30;

const hashToken = (token: string) =>
  createHash("sha256").update(token).digest("hex");

const getCookieStore = async () => cookies();

export const createUserSession = async (userId: string) => {
  await connectToDB();

  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  await Session.create({
    user: userId,
    tokenHash: hashToken(token),
    expiresAt,
  });

  const cookieStore = await getCookieStore();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });
};

export const deleteSession = async () => {
  await connectToDB();

  const cookieStore = await getCookieStore();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (token) {
    await Session.findOneAndDelete({ tokenHash: hashToken(token) });
  }

  cookieStore.delete(SESSION_COOKIE_NAME);
};

export const getCurrentUser = async () => {
  await connectToDB();

  const cookieStore = await getCookieStore();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) return null;

  const session = await Session.findOne({
    tokenHash: hashToken(token),
    expiresAt: { $gt: new Date() },
  }).populate("user");

  if (!session || !session.user) {
    cookieStore.delete(SESSION_COOKIE_NAME);
    return null;
  }

  return session.user as InstanceType<typeof User>;
};

export const requireCurrentUser = async () => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
};
