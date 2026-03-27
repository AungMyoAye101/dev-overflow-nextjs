import { scrypt as scryptCallback, timingSafeEqual } from "crypto";
import { compare, hash } from "bcryptjs";
import { promisify } from "util";

const SALT_ROUNDS = 12;


export const hashPassword = async (password: string) => {
  return await hash(password, SALT_ROUNDS);
};

export const verifyPassword = async (
  password: string,
  passwordHash: string | undefined
) => {
  if (!passwordHash) return false;
  return await compare(password, passwordHash);

};
