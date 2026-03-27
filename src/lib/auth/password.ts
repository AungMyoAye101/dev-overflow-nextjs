import { scrypt as scryptCallback, timingSafeEqual } from "crypto";
import { compare, hash } from "bcryptjs";
import { promisify } from "util";

const SALT_ROUNDS = 12;
const LEGACY_KEY_LENGTH = 64;
const scrypt = promisify(scryptCallback);

export const hashPassword = async (password: string) => {
  return await hash(password, SALT_ROUNDS);
};

const verifyLegacyScryptPassword = async (
  password: string,
  passwordHash: string
) => {
  const [salt, storedHash] = passwordHash.split(":");

  if (!salt || !storedHash) return false;

  const derivedKey = (await scrypt(password, salt, LEGACY_KEY_LENGTH)) as Buffer;
  const storedBuffer = Buffer.from(storedHash, "hex");

  if (storedBuffer.length !== derivedKey.length) return false;

  return timingSafeEqual(storedBuffer, derivedKey);
};

export const verifyPassword = async (
  password: string,
  passwordHash: string | undefined
) => {
  if (!passwordHash) return false;

  // New bcrypt format
  if (passwordHash.startsWith("$2a$") || passwordHash.startsWith("$2b$") || passwordHash.startsWith("$2y$")) {
    return await compare(password, passwordHash);
  }

  // Backward compatibility for old scrypt-based users
  if (passwordHash.includes(":")) {
    return await verifyLegacyScryptPassword(password, passwordHash);
  }

  return false;
};
