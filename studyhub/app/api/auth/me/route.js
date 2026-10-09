import { getUser } from "@/lib/auth";
import { json } from "@/lib/http";

export const dynamic = "force-dynamic";

export async function GET() {
  const u = await getUser();
  if (!u) return json({ user: null });
  return json({
    user: {
      id: String(u._id), name: u.name, email: u.email, college: u.college, phone: u.phone,
      isSeller: u.isSeller, sellerStatus: u.sellerStatus, isAdmin: u.isAdmin,
    },
  });
}
