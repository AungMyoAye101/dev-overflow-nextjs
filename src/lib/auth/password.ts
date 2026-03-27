import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "crypto";
import { promisify } from "util";

const scrypt = promisify(scryptCallback);
const KEY_LENGTH = 64;

export const hashPassword = async (password: string) => {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scrypt(password, salt, KEY_LENGTH)) as Buffer;

  return `${salt}:${derivedKey.toString("hex")}`;
};

export const verifyPassword = async (
  password: string,
  passwordHash: string | undefined
) => {
  if (!passwordHash) return false;

  const [salt, storedHash] = passwordHash.split(":");
  if (!salt || !storedHash) return false;

  const derivedKey = (await scrypt(password, salt, KEY_LENGTH)) as Buffer;
  const storedBuffer = Buffer.from(storedHash, "hex");

  if (storedBuffer.length !== derivedKey.length) return false;

  return timingSafeEqual(storedBuffer, derivedKey);
};
