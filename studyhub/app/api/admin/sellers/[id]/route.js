import { z } from "zod";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models";
import { getUser } from "@/lib/auth";
import { json, fail, readJson, parse, isId } from "@/lib/http";

const Body = z.object({ status: z.enum(["approved", "rejected"]) });

// Approve or reject a seller application. Admin accounts only.
export async function PATCH(req, { params }) {
  const me = await getUser();
  if (!me?.isAdmin) return fail("Not allowed.", 403);
  if (!isId(params.id)) return fail("Seller not found.", 404);
  const { data: raw, error: e1 } = await readJson(req);
  if (e1) return e1;
  const { data, error: e2 } = parse(Body, raw);
  if (e2) return e2;
  await connectDB();
  const r = await User.updateOne({ _id: params.id, sellerStatus: { $in: ["pending", "approved", "rejected"] } }, { sellerStatus: data.status, isSeller: data.status === "approved" });
  return r.matchedCount ? json({ ok: true }) : fail("No such application.", 404);
}
