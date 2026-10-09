import Link from "next/link";
import { notFound } from "next/navigation";
import { getUser } from "@/lib/auth";
import { getJob, labelOf } from "@/lib/queries";
import OfferForm from "@/components/OfferForm";

export const dynamic = "force-dynamic";

export default async function JobPage({ params }) {
  const [job, user] = await Promise.all([getJob(params.id), getUser()]);
  if (!job) notFound();
  const mode = { pickup: "Pickup", delivery: "Doorstep delivery", digital: "Digital copy" }[job.deliveryMode];

  return (
    <div className="wrap" style={{ padding: "30px 16px 40px", maxWidth: 760 }}>
      <Link href="/jobs" className="note">Back to open jobs</Link>
      <div className="card" style={{ marginTop: 16 }}>
        <h1 style={{ margin: "0 0 4px", fontFamily: "var(--hand)", fontSize: "1.9rem", lineHeight: 1.2 }}>{job.title}</h1>
        <p className="note" style={{ margin: "0 0 12px" }}>
          {[labelOf(job.category), job.college, job.course].filter(Boolean).join(" · ")}
        </p>
        <p>{job.description}</p>
        <div className="tags">
          <span className="tag">Budget: {job.budget ? `₹${job.budget}` : "open"}</span>
          <span className="tag">Due in {job.due}</span>
          {job.pages ? <span className="tag">{job.pages} pages</span> : null}
          <span className="tag">{mode}</span>
          <span className="tag">{job.offers} {job.offers === 1 ? "offer" : "offers"}</span>
        </div>
      </div>
      <div className="card" style={{ marginTop: 16 }}>
        {job.status !== "open" ? <p style={{ margin: 0 }}>This job is no longer open.</p>
          : !user ? <p style={{ margin: 0 }}><Link className="btn sm" href={`/login?next=/jobs/${job.id}`}>Log in</Link> to send an offer.</p>
          : user.sellerStatus === "approved" ? <OfferForm jobId={job.id} />
          : <p style={{ margin: 0 }}>Only approved sellers can send offers. <Link href="/become-seller" style={{ color: "var(--blue)", fontWeight: 600 }}>Apply to become a seller</Link>.</p>}
      </div>
    </div>
  );
}
