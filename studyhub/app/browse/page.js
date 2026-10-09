"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CATEGORIES, COLLEGES } from "@/data/mock";
import SellerCard from "@/components/SellerCard";

function Browse() {
  const sp = useSearchParams();
  const [cat, setCat] = useState(sp.get("cat") || "all");
  const [q, setQ] = useState(sp.get("q") || "");
  const [college, setCollege] = useState("all");
  const [list, setList] = useState(null); // null = loading
  const [error, setError] = useState("");

  useEffect(() => {
    const ctl = new AbortController();
    const t = setTimeout(async () => {
      const p = new URLSearchParams();
      if (cat !== "all") p.set("cat", cat);
      if (college !== "all") p.set("college", college);
      if (q.trim()) p.set("q", q.trim());
      try {
        const res = await fetch(`/api/sellers?${p}`, { signal: ctl.signal });
        if (!res.ok) throw new Error();
        setList((await res.json()).sellers);
        setError("");
      } catch (e) {
        if (e.name !== "AbortError") { setError("Could not load sellers. Refresh to try again."); setList([]); }
      }
    }, 250);
    return () => { clearTimeout(t); ctl.abort(); };
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
      {error && <div className="err" role="alert">{error}</div>}
      {list === null ? (
        <p className="sub">Loading sellers</p>
      ) : list.length ? (
        <div className="grid g3" style={{ paddingBottom: 30 }}>{list.map((s) => <SellerCard key={s.id} s={s} />)}</div>
      ) : !error && (
        <div className="card ok"><div className="big">No sellers found</div><p>Try another category or college, or post a job and let sellers come to you.</p><a className="btn" href="/post-job">Post a job</a></div>
      )}
    </div>
  );
}

export default function Page() {
  return <Suspense fallback={null}><Browse /></Suspense>;
}
