import { z } from "zod";
import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { Request } from "@/lib/models";
import { getUser } from "@/lib/auth";
import { CATEGORIES as CATS } from "@/data/mock";
import { listOpenJobs, labelOf } from "@/lib/queries";
import { json, fail, readJson, parse, limited, blank } from "@/lib/http";

export const dynamic = "force-dynamic";

const Body = z.object({
  category: z.enum(CATS.map((c) => c.slug)),
  college: z.string().trim().min(2).max(120),
  course: z.string().trim().min(2).max(80),
  subject: z.string().trim().min(2).max(80),
  pages: blank(z.coerce.number().int().min(1).max(2000).optional()),
  deadline: z.coerce.date().refine((d) => d.getTime() > Date.now() - 86400000, "pick today or a later date"),
  budget: blank(z.coerce.number().int().min(0).max(100000).optional().default(0)),
  details: z.string().trim().max(1000).optional().default(""),
  deliveryMode: z.enum(["pickup", "delivery", "digital"]).default("pickup"),
  address: z.string().trim().max(200).optional().default(""),
}).refine((d) => d.deliveryMode !== "delivery" || d.address.length >= 5, { path: ["address"], message: "enter the delivery address" });

export async function GET() {
  return json({ jobs: await listOpenJobs() });
}

export async function POST(req: NextRequest) {
  const user = await getUser();
  if (!user) return fail("Log in to post a job.", 401);
  if (limited(`job:${user._id}`, 10, 60 * 60 * 1000)) return fail("You have posted a lot of jobs. Try again in an hour.", 429);
  const { data: raw, error: e1 } = await readJson(req);
  if (e1) return e1;
  const { data: d, error: e2 } = parse(Body, raw);
  if (e2) return e2;

  await connectDB();
  const label = labelOf(d.category);
  const job = await Request.create({
    student: user._id,
    title: `${d.subject}: ${label}`,
    description: d.details || `${label} for ${d.course}, ${d.college}.`,
    category: label,
    college: d.college, course: d.course, subject: d.subject, pages: d.pages || 0,
    budget: d.budget, deadline: d.deadline, deliveryMode: d.deliveryMode,
    address: d.deliveryMode === "delivery" ? d.address : "",
  });
  return json({ id: String(job._id) }, 201);
}
