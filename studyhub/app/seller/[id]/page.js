import Link from "next/link";
import { notFound } from "next/navigation";
import { getSeller, labelOf } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const s = await getSeller(params.id);
  return { title: s ? `${s.name} | Likhai` : "Seller not found | Likhai" };
}

export default async function SellerPage({ params }) {
  const s = await getSeller(params.id);
  if (!s) notFound();
  const initials = s.name.split(" ").map((x) => x[0]).slice(0, 2).join("");
  const pages = [s.sample, s.tags.slice(0, 2).join(". "), `Usually delivers in ${s.turnaround}.`].filter(Boolean);

  return (
    <div className="wrap" style={{ padding: "30px 16px 40px" }}>
      <Link href="/browse" className="note">Back to all sellers</Link>
      <div className="profile">
        <div className="card">
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <div className="avatar" style={{ background: s.color, width: 64, height: 64, fontSize: "1.3rem" }} aria-hidden="true">{initials}</div>
            <div>
              <h1 style={{ margin: 0, fontFamily: "var(--hand)", fontSize: "1.9rem", lineHeight: 1.2 }}>
                {s.name} {s.verified && <span className="ver">Verified</span>}
              </h1>
              <small className="note">{[s.course, s.college].filter(Boolean).join(" · ")}</small>
            </div>
          </div>
          <div className="tags" style={{ margin: "14px 0" }}>{s.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
          {s.bio && <p style={{ marginTop: 0 }}>{s.bio}</p>}
          <p style={{ color: "var(--muted)", marginTop: 0 }}>
            Usually delivers in {s.turnaround}. {s.jobs ? `${s.jobs} completed ${s.jobs === 1 ? "job" : "jobs"}${s.rating ? `, rated ${s.rating}` : ""}.` : "New on Likhai, no completed jobs yet."}
          </p>

          <h3 style={{ marginBottom: 8 }}>Services</h3>
          {s.services.map((v) => (
            <div key={v.id} className="row" style={{ borderTop: "1px solid var(--edge)", padding: "8px 0" }}>
              <span>{labelOf(v.category) || v.title}</span>
              <span className="price"><small>from </small>₹{v.price}<small>/{v.unit}</small></span>
            </div>
          ))}

          <h3 style={{ margin: "24px 0 8px" }}>Handwriting sample</h3>
          <div className="grid g3">
            {pages.map((text, i) => <div key={i} className={`sheet hw-${s.hand}`}>{text}</div>)}
          </div>
          <p className="note" style={{ marginTop: 8 }}>Photos of real work will appear here once uploads are added.</p>

          <h3 style={{ marginTop: 24 }}>What students say</h3>
          {s.reviews.length ? s.reviews.map((r, i) => (
            <details key={i} open><summary>{r.by || "Student"} · {r.rating} stars</summary><p>{r.text}</p></details>
          )) : <p className="note">No reviews yet. Reviews appear after a completed order.</p>}
        </div>

        <aside className="card" style={{ position: "sticky", top: 84 }}>
          {s.from != null && <div className="price" style={{ fontSize: "1.7rem" }}><small>from </small>₹{s.from}<small>/{s.unit}</small></div>}
          <p style={{ color: "var(--muted)", fontSize: ".95rem" }}>Post your job and ask {s.name.split(" ")[0]} for an offer. Payment is held until you confirm delivery.</p>
          <Link href="/post-job" className="btn" style={{ display: "block" }}>Post a job</Link>
        </aside>
      </div>
    </div>
  );
}
