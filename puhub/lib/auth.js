import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models";

export const COOKIE = "likhai_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function secret() {
  const s = process.env.JWT_SECRET;
  const weak = !s || s.length < 32 || s.startsWith("change-me");
  if (weak) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("JWT_SECRET must be set to a random string of at least 32 characters in production.");
    }
    return new TextEncoder().encode("dev-only-secret-do-not-use-in-production-0123456789");
  }
  return new TextEncoder().encode(s);
}

export const hashPassword = (pw) => bcrypt.hash(pw, 12);
export const checkPassword = (pw, hash) => bcrypt.compare(pw, hash);

export async function setSession(user) {
  const token = await new SignJWT({ name: user.name })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(user._id))
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secret());
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function clearSession() {
  (await cookies()).set(COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
}

// Cheap read from the cookie only (no database). Fine for showing a name in the navbar.
export async function getSessionLight() {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret(), { algorithms: ["HS256"] });
    return { id: payload.sub, name: payload.name };
  } catch {
    return null;
  }
}

// Verified read: checks the account still exists. Use this for anything that changes data.
export async function getUser() {
  const s = await getSessionLight();
  if (!s || !/^[0-9a-f]{24}$/i.test(String(s.id))) return null;
  await connectDB();
  return User.findById(s.id).select("-passwordHash").lean();
}
