import { getSeller } from "@/lib/queries";
import { json, fail } from "@/lib/http";

export const dynamic = "force-dynamic";

export async function GET(_req, { params }) {
  const seller = await getSeller(params.id);
  return seller ? json({ seller }) : fail("Seller not found.", 404);
}
