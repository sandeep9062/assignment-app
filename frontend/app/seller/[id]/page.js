import Link from "next/link";
import { notFound } from "next/navigation";
import { SELLERS, CATEGORIES, REVIEWS } from "@/data/mock";

export function generateStaticParams() {
  return SELLERS.map((s) => ({ id: String(s.id) }));
}

export default async function SellerPage({ params }) {
  const { id } = await params;
  const s = SELLERS.find((x) => String(x.id) === id);
  if (!s) notFound();
  const cat = CATEGORIES.find((c) => c.slug === s.category);
  const initials = s.name.split(" ").map((x) => x[0]).slice(0, 2).join("");
  const pages = [s.sample, `${s.tags[0]}. ${s.tags[1] ?? ""}`, `Delivered in ${s.turnaround}.`];

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
              <small className="note">{s.course} · {s.college}</small>
            </div>
          </div>
          <div className="tags" style={{ margin: "14px 0" }}>{s.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
          <p style={{ color: "var(--muted)", marginTop: 0 }}>
            {cat?.blurb} Usually delivers in {s.turnaround}. Rated {s.rating} from {s.jobs} completed jobs.
          </p>

          <h3 style={{ marginBottom: 8 }}>Handwriting sample and past work</h3>
          <div className="grid g3">
            {pages.map((text, i) => (
              <div key={i} className={`sheet hw-${s.hand}`}>{text}</div>
            ))}
          </div>
          <p className="note" style={{ marginTop: 8 }}>Sample text for the preview. Sellers will upload real photos of their work here.</p>

          <h3 style={{ marginTop: 24 }}>What students say</h3>
          {REVIEWS.map((r) => (
            <details key={r.by} open><summary>{r.by}</summary><p>{r.text}</p></details>
          ))}
        </div>

        <aside className="card" style={{ position: "sticky", top: 84 }}>
          <div className="price" style={{ fontSize: "1.7rem" }}><small>from </small>₹{s.from}<small>/{s.unit}</small></div>
          <p style={{ color: "var(--muted)", fontSize: ".95rem" }}>Payment is held until you confirm delivery. One free revision.</p>
          <Link href="/post-job" className="btn" style={{ display: "block" }}>Hire {s.name.split(" ")[0]}</Link>
          <button className="btn alt" style={{ width: "100%", marginTop: 10 }} disabled title="Chat is coming soon">Chat (coming soon)</button>
        </aside>
      </div>
    </div>
  );
}
