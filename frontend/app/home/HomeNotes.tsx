"use client";
import { useMemo, useState } from "react";
import { NOTES, NOTE_FILTERS } from "../components/catalog";
import { waLink } from "../components/site";
import { Eyebrow, Stars, Arrow } from "../components/ui";

export default function HomeNotes() {
  const [f, setF] = useState("All");
  const list = useMemo(() => NOTES.filter((n) => f === "All" || n.tag === f), [f]);
  return (
    <section id="notes" className="mx-auto max-w-6xl px-4 pt-16">
      <Eyebrow tone="violet">Handwritten notes store</Eyebrow>
      <div className="mt-3 flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <h2 className="max-w-xl text-3xl font-extrabold tracking-tight md:text-[2.6rem] md:leading-[1.08]">
          Topper-style notes, <span className="font-hand text-gradient text-[1.12em]">ready to revise</span>
        </h2>
        <p className="max-w-sm text-[15px] leading-relaxed text-zinc-600">Free sample pages before you pay full. PDF instantly + spiral courier.</p>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {NOTE_FILTERS.map((x) => (
          <button key={x} onClick={() => setF(x)} className={`rounded-full px-4 py-2 text-[13px] font-bold transition ${f === x ? "bg-[#16131f] text-white shadow-md" : "border border-[#16131f]/10 bg-white text-zinc-600 hover:-translate-y-0.5 hover:border-[#16131f]/40"}`}>{x}</button>
        ))}
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((n) => (
          <div key={n.subject} className="card-lift group overflow-hidden rounded-[22px] border border-[#16131f]/8 bg-white">
            <div className="lined-paper px-5 pb-4 pt-5 pl-14">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-[#16131f] px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white">{n.tag}</span>
                <span className="inline-flex items-center gap-1 text-[12px] font-bold text-zinc-500"><Stars /> {n.rating}</span>
              </div>
              <h3 className={`mt-2.5 font-hand text-[1.65rem] font-bold leading-tight ${n.ink}`}>{n.subject}</h3>
              <p className="text-[12px] font-semibold text-zinc-500">{n.board} • {n.pages}</p>
              <ul className="mt-2.5 space-y-1 text-[13px] leading-relaxed text-zinc-600">
                {n.preview.map((p) => (<li key={p} className="flex gap-2"><span className="text-violet-500">▸</span><span>{p}</span></li>))}
              </ul>
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-[#16131f]/8 bg-gradient-to-r from-amber-50/80 to-orange-50/60 px-5 py-3.5">
              <p className="text-lg font-extrabold tracking-tight">{n.price} <span className="text-[13px] font-medium text-zinc-400 line-through">{n.old}</span></p>
              <a href={waLink(`Hi StudySathi! I want notes: ${n.subject} (${n.price}). Please share free sample.`)} className="inline-flex items-center gap-1 rounded-full bg-[#16131f] px-4 py-2 text-[13px] font-bold text-white transition group-hover:bg-emerald-600">Sample free <Arrow /></a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
