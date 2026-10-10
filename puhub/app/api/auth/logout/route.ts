import type { NextRequest } from "next/server";
import { clearSession } from "@/lib/auth";
import { json, fail, sameOrigin } from "@/lib/http";

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return fail("Request blocked.", 403);
  await clearSession();
  return json({ ok: true });
}
