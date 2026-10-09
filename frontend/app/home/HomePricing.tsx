"use client";
import { useMemo, useState } from "react";
import { waLink } from "../components/site";
import { Arrow } from "../components/ui";

const TYPES = [
  { k: "hand", label: "Handwritten", sub: "₹79 / page" },
  { k: "typed", label: "Typed", sub: "₹49 / page" },
  { k: "notes", label: "Notes PDF", sub: "₹499 flat" },
  { k: "file", label: "Practical file", sub: "₹999 flat" },
] as const;

export default function HomePricing() {
  const [type, setType] = useState<"hand" | "typed" | "notes" | "file">("hand");
  const [pages, setPages] = useState(30);
  const price = useMemo(() => {
    if (type === "hand") return pages * 79;
    if (type === "typed") return pages * 49;
    if (type === "notes") return 499;
    return 999;
  }, [type, pages]);
  const label = type === "hand" ? `${pages} handwritten pages` : type === "typed" ? `${pages} typed pages` : type === "notes" ? "1 subject notes PDF" : "1 practical file / project";
  const fill = `${((pages - 5) / (150 - 5)) * 100}%`;
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-4 pt-16">
      <div className="grid items-stretch gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="mesh-dark relative overflow-hidden rounded-[26px] p-7 text-white sm:p-9">
          <div className="dotted-bg-light absolute inset-0 opacity-20" aria-hidden />
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-amber-400/25 blur-3xl" aria-hidden />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-amber-300 ring-1 ring-white/15">Instant quote</span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight">Price calculator</h2>
            <p className="mt-1.5 text-sm text-zinc-300">No hidden charges. Pay only 30% to start.</p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              {TYPES.map((t) => (
                <button key={t.k} onClick={() => setType(t.k)} className={`rounded-2xl border px-3 py-3 text-left transition ${type === t.k ? "border-amber-300 bg-amber-300 text-ink shadow-lg" : "border-white/15 bg-white/[0.05] hover:border-white/40"}`}>
                  <span className="block text-sm font-extrabold">{t.label}</span>
                  <span className={`block text-[12px] font-semibold ${type === t.k ? "text-ink/70" : "text-zinc-400"}`}>{t.sub}</span>
                </button>
              ))}
            </div>
            {(type === "hand" || type === "typed") && (
              <div className="mt-6">
                <div className="flex justify-between text-sm font-bold"><span>Pages: {pages}</span><span className="text-zinc-300">~{Math.ceil(pages / 12)} subjects</span></div>
                <input type="range" min={5} max={150} value={pages} onChange={(e) => setPages(Number(e.target.value))} style={{ "--fill": fill } as React.CSSProperties} className="mt-3 w-full" aria-label="Number of pages" />
              </div>
            )}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/[0.07] p-5 backdrop-blur">
              <div><p className="text-[12px] font-semibold text-zinc-300">{label}</p><p className="text-[2rem] font-extrabold tracking-tight text-amber-300">₹{price.toLocaleString("en-IN")}</p></div>
              <a href={waLink(`Hi StudySathi! Quote check: ${label} = Rs.${price}. My university: ___, Deadline: ___`)} className="btn-shine inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3 text-sm font-bold transition hover:-translate-y-0.5">Book at this price <Arrow /></a>
            </div>
          </div>
        </div>
        <div className="card-lift rounded-[26px] border border-ink/8 bg-white p-7 sm:p-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100/80 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-amber-800 ring-1 ring-amber-200">Rate card</span>
          <h3 className="mt-2.5 text-2xl font-extrabold tracking-tight">Simple, honest pricing</h3>
          <div className="mt-5 space-y-2.5 text-[15px]">
            {[["Handwritten assignment", "₹79 / page"], ["Typed assignment", "₹49 / page"], ["Handwritten notes (PDF)", "₹299–799 / subject"], ["Practical file / project", "₹999+ / file"], ["Exam crash kit", "₹199+ / kit"], ["Spiral + courier", "₹149 + shipping"]].map(([a, b]) => (
              <div key={a} className="flex items-center justify-between gap-3 rounded-2xl border border-ink/8 bg-canvas/60 px-4 py-3 transition hover:border-ink/25 hover:bg-white"><span className="font-semibold">{a}</span><strong className="whitespace-nowrap">{b}</strong></div>
            ))}
          </div>
          <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900 ring-1 ring-emerald-100">Express &lt;24 hr delivery: +25%. Full refund if we miss your deadline.</p>
        </div>
      </div>
    </section>
  );
}
