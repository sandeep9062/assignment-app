import { z } from "zod";
import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models";
import { hashPassword, setSession } from "@/lib/auth";
import { json, fail, readJson, parse, limited, clientIp } from "@/lib/http";

const Body = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.email().max(160),
  password: z.string().min(8, "use at least 8 characters").max(72, "use at most 72 characters"),
  college: z.string().trim().max(120).optional().default(""),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "enter a 10-digit mobile number").optional().or(z.literal("")).default(""),
});

export async function POST(req: NextRequest) {
  if (limited(`signup:${clientIp(req)}`, 5, 60 * 60 * 1000)) return fail("Too many signups from this network. Try again later.", 429);
  const { data: raw, error: e1 } = await readJson(req);
  if (e1) return e1;
  const { data, error: e2 } = parse(Body, raw);
  if (e2) return e2;

  await connectDB();
  const email = data.email.toLowerCase();
  if (await User.exists({ email })) return fail("An account with this email already exists. Log in instead.", 409);

  let user;
  try {
    user = await User.create({
      name: data.name,
      email,
      passwordHash: await hashPassword(data.password),
      college: data.college,
      phone: data.phone,
    });
  } catch (err: unknown) {
    if (typeof err === "object" && err !== null && "code" in err && (err as { code?: number }).code === 11000)
      return fail("An account with this email already exists. Log in instead.", 409);
    throw err;
  }
  await setSession(user);
  return json({ user: { id: String(user._id), name: user.name, email: user.email } }, 201);
}
