"use client";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CATEGORIES, SELLERS, COLLEGES } from "@/data/mock";
import SellerCard from "@/components/SellerCard";

function Browse() {
  const sp = useSearchParams();
  const [cat, setCat] = useState(sp.get("cat") || "all");
  const [q, setQ] = useState(sp.get("q") || "");
  const [college, setCollege] = useState("all");

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return SELLERS.filter((s) =>
      (cat === "all" || s.category === cat) &&
      (college === "all" || s.college === college) &&
      (!t || [s.name, s.course, s.college, ...s.tags].join(" ").toLowerCase().includes(t))
    );
  }, [cat, q, college]);

  return (
    <div className="wrap">
      <div className="page-h"><h1>Browse sellers</h1><p className="sub">Students and print partners in Chandigarh.</p></div>
      <div className="two" style={{ marginBottom: 14 }}>
        <input className="chip" aria-label="Search sellers" style={{ padding: "10px 14px" }} placeholder="Search subject, course or name" value={q} onChange={(e) => setQ(e.target.value)} />
        <select className="chip" aria-label="Filter by college" style={{ padding: "10px 14px" }} value={college} onChange={(e) => setCollege(e.target.value)}>
          <option value="all">All colleges</option>
          {COLLEGES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div className="filters">
        <button className={`chip ${cat === "all" ? "on" : ""}`} onClick={() => setCat("all")}>All</button>
        {CATEGORIES.map((c) => (
          <button key={c.slug} className={`chip ${cat === c.slug ? "on" : ""}`} onClick={() => setCat(c.slug)}>{c.label}</button>
        ))}
      </div>
      {list.length ? (
        <div className="grid g3" style={{ paddingBottom: 30 }}>{list.map((s) => <SellerCard key={s.id} s={s} />)}</div>
      ) : (
        <div className="card ok"><div className="big">No sellers found</div><p>Try another category or college, or post a job and let sellers come to you.</p><a className="btn" href="/post-job">Post a job</a></div>
      )}
    </div>
  );
}

export default function Page() {
  return <Suspense fallback={null}><Browse /></Suspense>;
}
