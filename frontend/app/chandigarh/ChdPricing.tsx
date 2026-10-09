"use client";
import { useMemo, useState } from "react";
import { waLink } from "../components/site";

export default function ChdPricing() {
  const [type, setType] = useState<"hand" | "typed" | "notes" | "file">("hand");
  const [pages, setPages] = useState(30);
  const price = useMemo(() => {
    if (type === "hand") return pages * 79;
    if (type === "typed") return pages * 49;
    if (type === "notes") return 499;
    return 999;
  }, [type, pages]);
  const label = type === "hand" ? `${pages} handwritten pages` : type === "typed" ? `${pages} typed pages` : type === "notes" ? "1 subject notes PDF" : "1 practical file / project";
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-4 pt-14">
      <div className="rounded-3xl bg-zinc-900 text-white p-7 md:p-9 relative overflow-hidden">
        <div className="dotted-bg absolute inset-0 opacity-10" />
        <div className="relative">
          <p className="text-[12px] font-extrabold tracking-[0.2em] text-amber-300">INSTANT QUOTE • CHANDIGARH</p>
          <h2 className="mt-2 text-3xl font-extrabold">Price calculator</h2>
          <p className="mt-2 text-zinc-300 text-sm">No hidden charges. Pay only 30% to start.</p>
          <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-2">
            {[["hand", "✍️ Hand ₹79/p"], ["typed", "⌨️ Typed ₹49/p"], ["notes", "📓 Notes ₹499"], ["file", "🔬 File ₹999"]].map(([k, l]) => (
              <button key={k} onClick={() => setType(k as typeof type)} className={`rounded-xl px-3 py-2.5 text-sm font-bold border-2 transition ${type === k ? "bg-amber-300 text-zinc-900 border-amber-300" : "border-white/20 hover:border-white/60"}`}>{l}</button>
            ))}
          </div>
          {(type === "hand" || type === "typed") && (
            <div className="mt-5">
              <div className="flex justify-between text-sm font-bold"><span>Pages: {pages}</span><span>~{Math.ceil(pages / 12)} subjects</span></div>
              <input type="range" min={5} max={150} value={pages} onChange={(e) => setPages(Number(e.target.value))} className="mt-2 w-full accent-amber-300" />
            </div>
          )}
          <div className="mt-6 rounded-2xl bg-white/10 border border-white/15 p-4 flex flex-wrap items-center justify-between gap-4">
            <div><p className="text-[12px] text-zinc-300 font-semibold">{label}</p><p className="text-3xl font-extrabold text-amber-300">₹{price.toLocaleString("en-IN")}</p><p className="text-[12px] text-zinc-400">+ ₹149 spiral & hand delivery (Tricity)</p></div>
            <a href={waLink(`Hi StudySathi Chandigarh! Quote: ${label} = Rs.${price} + delivery. College: ___, Deadline: ___`)} className="rounded-full bg-emerald-500 px-5 py-3 font-bold text-sm hover:bg-emerald-400">Book at this price →</a>
          </div>
        </div>
      </div>
    </section>
  );
}
