"use client";
import { useState } from "react";
import { CHANDIGARH_FAQS } from "../components/chandigarh";
import { FAQS } from "../components/catalog";

export default function ChdFaq() {
  const [open, setOpen] = useState<number | null>(0);
  const all = [...CHANDIGARH_FAQS, ...FAQS];
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 pt-14 pb-4">
      <p className="text-center text-[12px] font-extrabold tracking-[0.2em] text-amber-600">CHANDIGARH FAQ</p>
      <h2 className="text-center text-3xl md:text-4xl font-extrabold tracking-tight">Questions? <span className="font-hand text-amber-600 text-[1.15em]">Answered.</span></h2>
      <div className="mt-6 space-y-3">
        {all.map((f, i) => (
          <div key={f.q} className={`rounded-2xl border-2 overflow-hidden transition ${open === i ? "border-zinc-900 bg-white shadow-[4px_4px_0_#18181b]" : "border-zinc-200 bg-white"}`}>
            <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-bold text-[15px]">
              <span>{f.q}</span>
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 ${open === i ? "bg-zinc-900 text-white border-zinc-900" : "border-zinc-200"}`}>{open === i ? "−" : "+"}</span>
            </button>
            {open === i && <p className="px-5 pb-5 text-[15px] leading-relaxed text-zinc-600">{f.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
