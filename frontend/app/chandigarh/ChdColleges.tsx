"use client";
import { useMemo, useState } from "react";
import { CHANDIGARH_COLLEGES, COLLEGE_FILTERS } from "../components/chandigarh";
import { waLink } from "../components/site";
import { Eyebrow, Arrow } from "../components/ui";

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
    <section id="colleges" className="mx-auto max-w-6xl px-4 pt-16">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <Eyebrow>Tricity coverage</Eyebrow>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-[2.6rem] md:leading-[1.08]">
            We write for <span className="font-hand text-gradient text-[1.12em]">your college</span>
          </h2>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-zinc-600">Cover pages, margins & word-limits matched to each college. Search yours.</p>
        </div>
        <div className="relative w-full md:w-72">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search college, sector, course…" className="w-full rounded-2xl border border-[#16131f]/12 bg-white px-5 py-3 text-sm font-medium shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-[#16131f] focus:ring-4 focus:ring-violet-100" />
          <span className="absolute right-4 top-3.5 text-zinc-400">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {COLLEGE_FILTERS.map((x) => (
          <button key={x} onClick={() => setF(x)} className={`rounded-full px-4 py-2 text-[13px] font-bold transition ${f === x ? "bg-[#16131f] text-white shadow-md" : "border border-[#16131f]/10 bg-white text-zinc-600 hover:-translate-y-0.5 hover:border-[#16131f]/40"}`}>{x}</button>
        ))}
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((c) => (
          <div key={c.name} className="card-lift group flex flex-col rounded-[22px] border border-[#16131f]/8 bg-white p-5">
            <div className="flex items-start justify-between gap-2">
              <span className={`grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br text-sm font-extrabold text-white shadow-md ${c.grad}`}>
                {c.name.charAt(0)}
              </span>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-extrabold text-emerald-700">{c.orders}</span>
            </div>
            <h3 className="mt-3 font-extrabold leading-snug tracking-tight">{c.name}</h3>
            <p className="mt-1 text-[12px] font-bold text-amber-700">{c.area} • {c.type}</p>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">{c.courses}</p>
            <a href={waLink(`Hi StudySathi Chandigarh! I'm from ${c.name} (${c.area}). Need: Subject ___, Pages ___, Deadline ___`)} className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-[#16131f]/12 px-4 py-2.5 text-sm font-bold transition group-hover:border-[#16131f] group-hover:bg-[#16131f] group-hover:text-white">Order for {c.name.split(" ")[0]} <Arrow /></a>
          </div>
        ))}
      </div>
      {list.length === 0 && (
        <div className="mt-6 rounded-[22px] border border-dashed border-[#16131f]/20 bg-white p-8 text-center">
          <p className="text-lg font-extrabold tracking-tight">College not listed? We still cover it</p>
          <p className="mt-1 text-sm text-zinc-600">Tell us your college on WhatsApp — we will match its format.</p>
          <a href={waLink(`Hi! My college is ${q}. Can you write my assignment?`)} className="btn-shine mt-4 inline-flex rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-2.5 font-bold text-white">Ask on WhatsApp</a>
        </div>
      )}
      <p className="mt-4 text-center text-[13px] font-medium text-zinc-500">Also: UBS • Home Science Sec-10 • Khalsa Sec-26 • RIE Sec-32 • DAV schools • +2 schools Tricity</p>
    </section>
  );
}
