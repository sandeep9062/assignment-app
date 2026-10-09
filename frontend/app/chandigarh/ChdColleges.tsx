"use client";
import { useMemo, useState } from "react";
import { CHANDIGARH_COLLEGES, COLLEGE_FILTERS } from "../components/chandigarh";
import { waLink } from "../components/site";

export default function ChdColleges() {
  const [f, setF] = useState("All");
  const [q, setQ] = useState("");
  const list = useMemo(() => CHANDIGARH_COLLEGES.filter((c) => {
    const okF = f === "All" || c.type === f;
    const s = q.toLowerCase();
    const okQ = !s || c.name.toLowerCase().includes(s) || c.area.toLowerCase().includes(s) || c.courses.toLowerCase().includes(s);
    return okF && okQ;
  }), [f, q]);
  return (
    <section id="colleges" className="mx-auto max-w-6xl px-4 pt-14">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-[12px] font-extrabold tracking-[0.2em] text-amber-600">TRICITY COVERAGE</p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">We write for <span className="font-hand text-violet-700 text-[1.15em]">your college</span></h2>
          <p className="mt-2 text-zinc-600 max-w-2xl">Cover pages, margins & word-limits matched to each college. Search yours.</p>
        </div>
        <div className="relative w-full md:w-72">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search college, sector, course…" className="w-full rounded-full border-2 border-zinc-900 bg-white px-5 py-2.5 text-sm font-medium outline-none focus:border-emerald-600" />
          <span className="absolute right-4 top-2.5">🔍</span>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {COLLEGE_FILTERS.map((x) => (
          <button key={x} onClick={() => setF(x)} className={`rounded-full px-4 py-1.5 text-sm font-bold border-2 transition ${f === x ? "bg-zinc-900 text-white border-zinc-900" : "bg-white border-zinc-200 hover:border-zinc-900"}`}>{x}</button>
        ))}
      </div>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {list.map((c) => (
          <div key={c.name} className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition">
            <div className="flex items-start justify-between">
              <span className="text-3xl">{c.emoji}</span>
              <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">{c.orders}</span>
            </div>
            <h3 className="mt-3 font-extrabold leading-snug">{c.name}</h3>
            <p className="text-[12px] font-semibold text-amber-700">📍 {c.area} • {c.type}</p>
            <p className="mt-2 text-sm text-zinc-600 leading-relaxed">{c.courses}</p>
            <a href={waLink(`Hi StudySathi Chandigarh! I'm from ${c.name} (${c.area}). Need: Subject ___, Pages ___, Deadline ___`)} className="mt-4 inline-flex w-full items-center justify-center rounded-full border-2 border-zinc-900 px-4 py-2 text-sm font-bold group-hover:bg-zinc-900 group-hover:text-white transition">Order for {c.name.split(" ")[0]} →</a>
          </div>
        ))}
      </div>
      {list.length === 0 && (
        <div className="mt-6 rounded-2xl border-2 border-dashed border-zinc-300 bg-white p-8 text-center">
          <p className="font-bold text-lg">College not listed? We still cover it ✍️</p>
          <a href={waLink(`Hi! My college is ${q}. Can you write my assignment?`)} className="mt-4 inline-flex rounded-full bg-emerald-600 px-6 py-2.5 font-bold text-white">Ask on WhatsApp</a>
        </div>
      )}
      <p className="mt-4 text-center text-[13px] text-zinc-500">Also: UBS • Home Science Sec-10 • Khalsa Sec-26 • RIE Sec-32 • DAV schools • +2 schools Tricity</p>
    </section>
  );
}
