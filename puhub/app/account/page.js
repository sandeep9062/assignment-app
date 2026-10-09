import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import { myJobs } from "@/lib/queries";

export const dynamic = "force-dynamic";
export const metadata = { title: "My account | Likhai" };

const SELLER_LINE = {
  none: null,
  pending: "Your seller application is under review. We will message you on WhatsApp for your handwriting photos.",
  approved: "You are an approved seller.",
  rejected: "Your seller application was not approved this time.",
};

export default async function Account() {
  const user = await getUser();
  if (!user) redirect("/login?next=/account");
  const jobs = await myJobs(user._id);

  return (
    <div className="wrap" style={{ paddingBottom: 30, maxWidth: 820 }}>
      <div className="page-h"><h1>Hi, {user.name.split(" ")[0]}</h1><p className="sub">{user.email}{user.college ? ` · ${user.college}` : ""}</p></div>

      <div className="card" style={{ marginBottom: 16 }}>
        {SELLER_LINE[user.sellerStatus] ? (
          <div className="row"><span>{SELLER_LINE[user.sellerStatus]}</span>
            {user.sellerStatus === "approved" && <Link href="/jobs" className="btn sm">Find jobs</Link>}</div>
        ) : (
          <div className="row"><span>Want to earn with your handwriting or skills?</span><Link href="/become-seller" className="btn sm">Become a seller</Link></div>
        )}
        {user.isAdmin && <p style={{ margin: "10px 0 0" }}><Link href="/admin" style={{ color: "var(--blue)", fontWeight: 600 }}>Review seller applications</Link></p>}
      </div>

      <h2 className="t">My jobs</h2>
      {jobs.length ? jobs.map((j) => (
        <div key={j.id} className="card" style={{ marginBottom: 12 }}>
          <div className="row"><h3 style={{ margin: 0 }}>{j.title}</h3><span className="pillstat">{j.status}</span></div>
          <p className="note" style={{ margin: "4px 0 8px" }}>{j.budget ? `Budget ₹${j.budget} · ` : ""}due in {j.due} · {j.offers.length} {j.offers.length === 1 ? "offer" : "offers"}</p>
          {j.offers.map((o) => (
            <div key={o.id} className="offer">
              <div className="row">
                <span><Link href={`/seller/${o.sellerId}`} style={{ fontWeight: 600, color: "var(--blue)" }}>{o.seller}</Link> <small className="note">{o.college}</small></span>
                <span className="price">₹{o.price} <small>in {o.days} {o.days === 1 ? "day" : "days"}</small></span>
              </div>
              {o.message && <p style={{ margin: "4px 0 0", color: "var(--muted)" }}>{o.message}</p>}
            </div>
          ))}
        </div>
      )) : (
        <div className="card ok"><div className="big">No jobs yet</div><p>Post what you need and sellers will send offers.</p><Link className="btn" href="/post-job">Post a job</Link></div>
      )}
    </div>
  );
}
