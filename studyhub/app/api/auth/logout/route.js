import { clearSession } from "@/lib/auth";
import { json, fail, sameOrigin } from "@/lib/http";

export async function POST(req) {
  if (!sameOrigin(req)) return fail("Request blocked.", 403);
  clearSession();
  return json({ ok: true });
}
