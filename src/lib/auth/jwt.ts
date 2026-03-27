import { JWTPayload, SignJWT, jwtVerify } from "jose";

export const AUTH_COOKIE_NAME = "dev_overflow_token";
const JWT_ALGORITHM = "HS256";
const TOKEN_EXPIRY_SECONDS = 60 * 60 * 24 * 30;

export interface SessionTokenPayload extends JWTPayload {
  sub: string;
  email: string;
  name: string;
  picture?: string;
}

const getJwtSecret = () =>
  process.env.JWT_SECRET ||
  process.env.NEXTAUTH_SECRET ||
  "dev-overflow-local-secret-change-me";

const getJwtKey = () => new TextEncoder().encode(getJwtSecret());

export const signAuthToken = async (payload: {
  sub: string;
  email: string;
  name: string;
  picture?: string;
}) => {
  return await new SignJWT({
    email: payload.email,
    name: payload.name,
    picture: payload.picture,
  })
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(`${TOKEN_EXPIRY_SECONDS}s`)
    .sign(getJwtKey());
};

export const verifyAuthToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, getJwtKey(), {
      algorithms: [JWT_ALGORITHM],
    });

    return payload as SessionTokenPayload;
  } catch {
    return null;
  }
};

export const getAuthTokenMaxAge = () => TOKEN_EXPIRY_SECONDS;
