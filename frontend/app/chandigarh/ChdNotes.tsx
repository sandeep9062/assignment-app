import { NOTES } from "../components/catalog";
import { waLink } from "../components/site";
import { Eyebrow } from "../components/ui";

export default function ChdNotes() {
  return (
    <section id="notes" className="mx-auto max-w-6xl px-4 pt-12">
      <div className="card-lift rounded-[26px] border border-[#16131f]/8 bg-white p-7 sm:p-8">
        <Eyebrow tone="violet">Bestsellers in Chandigarh</Eyebrow>
        <h3 className="mt-2.5 text-2xl font-extrabold tracking-tight sm:text-[1.7rem]">Handwritten notes, loved in hostels</h3>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {NOTES.slice(0, 4).map((n) => (
            <div key={n.subject} className="group flex items-center justify-between gap-3 rounded-2xl border border-[#16131f]/8 bg-[#faf8f4]/60 p-4 transition hover:-translate-y-0.5 hover:border-[#16131f]/25 hover:bg-white hover:shadow-md">
              <div><p className="text-[15px] font-bold leading-snug tracking-tight">{n.subject}</p><p className="mt-0.5 text-[12px] font-medium text-zinc-500">{n.board} • {n.pages}</p></div>
              <div className="shrink-0 text-right"><p className="font-extrabold">{n.price} <span className="text-[12px] font-medium text-zinc-400 line-through">{n.old}</span></p><a href={waLink(`Hi! I want notes: ${n.subject} (${n.price}) — Chandigarh. Share sample.`)} className="text-[12px] font-extrabold text-emerald-700 hover:underline">Sample free →</a></div>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-4 text-sm"><p className="font-extrabold">Hostel tip</p><p className="mt-0.5 leading-relaxed text-zinc-700">Order with 2+ friends from the same hostel (PU / CU / Chitkara) — split ₹149 delivery & get 10% group off.</p></div>
      </div>
    </section>
  );
}
