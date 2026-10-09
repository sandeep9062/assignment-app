"use client";
import { useMemo, useState } from "react";
import { NOTES, NOTE_FILTERS } from "../components/catalog";
import { waLink } from "../components/site";

export default function HomeNotes() {
  const [f, setF] = useState("All");
  const list = useMemo(() => NOTES.filter((n) => f === "All" || n.tag === f), [f]);
  return (
    <section id="notes" className="mx-auto max-w-6xl px-4 pt-14">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
        <div>
          <p className="text-[12px] font-extrabold tracking-[0.2em] text-violet-700">HANDWRITTEN NOTES STORE</p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Topper-style notes, <span className="font-hand text-violet-700 text-[1.15em]">ready to revise</span></h2>
          <p className="mt-2 text-zinc-600 max-w-2xl">Free sample pages before you pay full. PDF instantly + spiral courier.</p>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {NOTE_FILTERS.map((x) => (
          <button key={x} onClick={() => setF(x)} className={`rounded-full px-4 py-1.5 text-sm font-bold border-2 transition ${f === x ? "bg-zinc-900 text-white border-zinc-900" : "bg-white border-zinc-200 hover:border-zinc-900"}`}>{x}</button>
        ))}
      </div>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((n) => (
          <div key={n.subject} className="rounded-2xl border-2 border-zinc-900 bg-white overflow-hidden shadow-[4px_4px_0_#18181b]">
            <div className="lined-paper px-5 pt-5 pb-3">
              <span className="rounded-full bg-zinc-900 text-white px-2.5 py-0.5 text-[11px] font-bold">{n.tag}</span>
              <h3 className={`mt-2 font-hand text-2xl font-bold leading-tight ${n.ink}`}>{n.subject}</h3>
              <p className="text-[12px] font-semibold text-zinc-500">{n.board} • {n.pages} • ⭐ {n.rating}</p>
              <ul className="mt-2 space-y-1 text-[13px] text-zinc-700">
                {n.preview.map((p) => (<li key={p} className="flex gap-2"><span>•</span><span>{p}</span></li>))}
              </ul>
            </div>
            <div className="flex items-center justify-between px-5 py-3.5 border-t-2 border-zinc-900 bg-amber-50">
              <p className="font-extrabold text-lg">{n.price} <span className="text-[13px] font-medium text-zinc-400 line-through">{n.old}</span></p>
              <a href={waLink(`Hi StudySathi! I want notes: ${n.subject} (${n.price}). Please share free sample.`)} className="rounded-full bg-zinc-900 px-4 py-2 text-[13px] font-bold text-white hover:bg-emerald-600">Sample free →</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
