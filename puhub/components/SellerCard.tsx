import Link from "next/link";
import type { SellerCard as SellerCardData } from "@/lib/queries";

export default function SellerCard({ s }: { s: SellerCardData }) {
  const initials = s.name
    .split(" ")
    .map((x: string) => x[0] ?? "")
    .slice(0, 2)
    .join("");
  return (
    <Link href={`/seller/${s.id}`} className="card seller" aria-label={`${s.name}, view profile`}>
      <div className={`sample hw-${s.hand}`}>{s.sample || "Handwriting sample on request"}</div>
      <div className="body">
        <div className="top">
          <div className="avatar" style={{ background: s.color }} aria-hidden="true">{initials}</div>
          <div>
            <h3>{s.name} {s.verified && <span className="ver">Verified</span>}</h3>
            <small>{[s.course, s.college].filter(Boolean).join(" · ")}</small>
          </div>
        </div>
        <div className="tags">{s.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
        <div className="row">
          <small>{s.rating ? `${s.rating} stars · ` : "New · "}{s.jobs} {s.jobs === 1 ? "job" : "jobs"} · {s.turnaround}</small>
          {s.from != null && <span className="price"><small>from </small>₹{s.from}<small>/{s.unit}</small></span>}
        </div>
        <span className="more">View profile and samples</span>
      </div>
    </Link>
  );
}
