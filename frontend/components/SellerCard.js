import Link from "next/link";

export default function SellerCard({ s }) {
  const initials = s.name.split(" ").map((x) => x[0]).slice(0, 2).join("");
  return (
    <Link href={`/seller/${s.id}`} className="card seller" aria-label={`${s.name}, view profile`}>
      <div className={`sample hw-${s.hand}`}>{s.sample}</div>
      <div className="body">
        <div className="top">
          <div className="avatar" style={{ background: s.color }} aria-hidden="true">{initials}</div>
          <div>
            <h3>{s.name} {s.verified && <span className="ver">Verified</span>}</h3>
            <small>{s.course} · {s.college}</small>
          </div>
        </div>
        <div className="tags">{s.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
        <div className="row">
          <small>{s.rating} stars · {s.jobs} jobs · {s.turnaround}</small>
          <span className="price"><small>from </small>₹{s.from}<small>/{s.unit}</small></span>
        </div>
        <span className="more">View profile and samples</span>
      </div>
    </Link>
  );
}
