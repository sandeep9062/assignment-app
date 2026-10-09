import { z } from "zod";
import { connectDB } from "@/lib/db";
import { User, Service } from "@/lib/models";
import { getUser } from "@/lib/auth";
import { CATEGORIES as CATS } from "@/data/mock";
import { json, fail, readJson, parse, blank } from "@/lib/http";

const Body = z.object({
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "enter a 10-digit mobile number"),
  college: z.string().trim().min(2).max(120),
  course: z.string().trim().min(2).max(80),
  categories: z.array(z.enum(CATS.map((c) => c.slug))).min(1, "pick at least one service").max(8),
  price: z.coerce.number().int().min(1).max(100000),
  unit: z.enum(["page", "file", "set", "project", "deck", "job"]),
  turnaroundDays: blank(z.coerce.number().int().min(0).max(30).default(3)),
  hand: z.enum(["kalam", "caveat", "patrick", "shadows"]).default("kalam"),
  sampleText: z.string().trim().max(140).optional().default(""),
  tags: z.array(z.string().trim().min(1).max(30)).max(8).optional().default([]),
  bio: z.string().trim().max(500).optional().default(""),
  agree: z.literal(true, { error: "you must accept the seller terms" }),
});

export async function POST(req) {
  const user = await getUser();
  if (!user) return fail("Log in to apply as a seller.", 401);
  const { data: raw, error: e1 } = await readJson(req);
  if (e1) return e1;
  const { data: d, error: e2 } = parse(Body, raw);
  if (e2) return e2;
  if (["pending", "approved"].includes(user.sellerStatus)) {
    return fail(user.sellerStatus === "approved" ? "You are already a seller." : "Your application is already under review.", 409);
  }

  await connectDB();
  const status = process.env.AUTO_APPROVE_SELLERS === "true" ? "approved" : "pending";
  await User.updateOne({ _id: user._id }, {
    phone: d.phone, college: d.college, bio: d.bio, sellerStatus: status, isSeller: status === "approved",
    sellerProfile: { course: d.course, tags: d.tags, hand: d.hand, sampleText: d.sampleText, turnaroundDays: d.turnaroundDays },
  });
  await Service.deleteMany({ seller: user._id });
  await Service.insertMany(d.categories.map((slug) => {
    const c = CATS.find((x) => x.slug === slug);
    return { seller: user._id, title: c.label, description: c.blurb, category: c.label, price: d.price, unit: d.unit, turnaroundDays: d.turnaroundDays };
  }));
  return json({ status }, 201);
}
