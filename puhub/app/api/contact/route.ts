import { z } from "zod";
import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { ContactMessage } from "@/lib/models";
import { getUser } from "@/lib/auth";
import { json, fail, readJson, parse, limited, clientIp, blank } from "@/lib/http";

export const dynamic = "force-dynamic";

const TOPICS = ["Order help", "Payment or refund", "Become a seller", "Report a problem", "Something else"] as const;

const Body = z.object({
  name: z.string().trim().min(2, "enter your name").max(80),
  email: z.email("enter a valid email so we can reply"),
  phone: blank(z.string().trim().regex(/^[6-9]\d{9}$/, "enter a 10-digit mobile number").optional()),
  topic: z.enum(TOPICS).default("Something else"),
  message: z.string().trim().min(10, "tell us a bit more (at least 10 characters)").max(2000),
});

// Anyone can write in (a nervous student should not need an account to get help),
// but rate-limit per IP so the form cannot be used for spam.
export async function POST(req: NextRequest) {
  if (limited(`contact:${clientIp(req)}`, 5, 60 * 60 * 1000))
    return fail("Too many messages from this network. Try again in an hour, or email us directly.", 429);
  const { data: raw, error: e1 } = await readJson(req);
  if (e1) return e1;
  const { data: d, error: e2 } = parse(Body, raw);
  if (e2) return e2;

  const user = await getUser();
  await connectDB();
  await ContactMessage.create({
    name: d.name,
    email: d.email.toLowerCase(),
    phone: d.phone,
    topic: d.topic,
    message: d.message,
    user: user?._id,
  });
  return json({ ok: true }, 201);
}