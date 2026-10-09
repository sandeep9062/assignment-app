import { listSellers } from "@/lib/queries";
import { json } from "@/lib/http";

export const dynamic = "force-dynamic";

export async function GET(req) {
  const p = new URL(req.url).searchParams;
  const sellers = await listSellers({ cat: p.get("cat") || "", q: p.get("q") || "", college: p.get("college") || "" });
  return json({ sellers });
}
