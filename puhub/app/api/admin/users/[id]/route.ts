import { z } from "zod";
import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models";
import { getUser } from "@/lib/auth";
import { json, fail, readJson, parse, isId } from "@/lib/http";

const Body = z.object({ isActive: z.boolean() });

// Activate or deactivate an account. Admin accounts only; never your own.
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const me = await getUser();
  if (!me?.isAdmin) return fail("Not allowed.", 403);
  if (!isId(id)) return fail("User not found.", 404);
  if (id === String(me._id)) return fail("You cannot deactivate your own account.", 400);
  const { data: raw, error: e1 } = await readJson(req);
  if (e1) return e1;
  const { data, error: e2 } = parse(Body, raw);
  if (e2) return e2;
  await connectDB();
  const r = await User.updateOne({ _id: id }, { isActive: data.isActive });
  return r.matchedCount ? json({ ok: true }) : fail("No such user.", 404);
}