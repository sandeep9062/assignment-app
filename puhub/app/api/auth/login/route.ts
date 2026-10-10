import { z } from "zod";
import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models";
import { checkPassword, setSession } from "@/lib/auth";
import { json, fail, readJson, parse, limited, clientIp } from "@/lib/http";

const Body = z.object({ email: z.email().max(160), password: z.string().min(1).max(72) });
// Compared when the email is unknown, so response time doesn't reveal which emails have accounts.
const DUMMY = "$2a$12$Xn3im8ZVl8Zg9E2O0.JHVezNFzrCjZRlImzNPgUYfLYw67gmKUAGW";

export async function POST(req: NextRequest) {
  const { data: raw, error: e1 } = await readJson(req);
  if (e1) return e1;
  const { data, error: e2 } = parse(Body, raw);
  if (e2) return e2;
  const email = data.email.toLowerCase();
  if (limited(`login:${clientIp(req)}:${email}`, 10, 15 * 60 * 1000)) return fail("Too many attempts. Wait a few minutes and try again.", 429);

  await connectDB();
  const user = await User.findOne({ email });
  const ok = await checkPassword(data.password, user?.passwordHash || DUMMY);
  if (!user || !ok) return fail("Email or password is wrong.", 401);
  if (user.isActive === false) return fail("This account is deactivated. Contact the admin.", 403);
  await setSession(user);
  return json({ user: { id: String(user._id), name: user.name, email: user.email, isSeller: user.isSeller, isAdmin: !!user.isAdmin } });
}
