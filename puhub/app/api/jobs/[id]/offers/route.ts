import { z } from "zod";
import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { Request } from "@/lib/models";
import { getUser } from "@/lib/auth";
import { json, fail, readJson, parse, isId, blank } from "@/lib/http";

const Body = z.object({
  price: z.coerce.number().int().min(1).max(100000),
  days: blank(z.coerce.number().int().min(0).max(60).default(3)),
  message: z.string().trim().max(300).optional().default(""),
});

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getUser();
  if (!user) return fail("Log in to send an offer.", 401);
  if (user.sellerStatus !== "approved") return fail("Only approved sellers can send offers.", 403);
  if (!isId(id)) return fail("Job not found.", 404);
  const { data: raw, error: e1 } = await readJson(req);
  if (e1) return e1;
  const { data: d, error: e2 } = parse(Body, raw);
  if (e2) return e2;

  await connectDB();
  const job = await Request.findById(id);
  if (!job || job.status !== "open") return fail("This job is no longer open.", 404);
  if (String(job.student) === String(user._id)) return fail("You cannot offer on your own job.", 400);

  const existing = job.offers.find((o) => String(o.seller) === String(user._id));
  if (existing) Object.assign(existing, d);
  else job.offers.push({ seller: user._id, ...d });
  await job.save();
  return json({ ok: true, updated: Boolean(existing) }, existing ? 200 : 201);
}
