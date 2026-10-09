import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import SellerApplyForm from "@/components/SellerApplyForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Become a seller | Likhai" };

export default async function BecomeSeller() {
  const user = await getUser();
  if (!user) redirect("/login?next=/become-seller");
  const wrap = (children) => <div className="wrap" style={{ padding: "30px 16px" }}>{children}</div>;

  if (user.sellerStatus === "approved")
    return wrap(<div className="form ok"><div className="big">You are already a seller</div><p>Find work on the open jobs page.</p><Link className="btn" href="/jobs">See open jobs</Link></div>);
  if (user.sellerStatus === "pending")
    return wrap(<div className="form ok"><div className="big">Application under review</div><p>We will message you on WhatsApp to collect photos of your handwriting.</p></div>);
  return wrap(<SellerApplyForm defaults={{ phone: user.phone || "", college: user.college || "" }} />);
}
