import { NOTES } from "../components/catalog";
import { waLink } from "../components/site";

export default function ChdNotes() {
  return (
    <section id="notes" className="mx-auto max-w-6xl px-4 pt-10">
      <div className="rounded-3xl border-2 border-zinc-900 bg-white p-7 shadow-[6px_6px_0_#18181b]">
        <p className="text-[12px] font-extrabold tracking-[0.2em] text-violet-700">BESTSELLERS IN CHANDIGARH</p>
        <h3 className="mt-1 text-2xl font-extrabold">Handwritten notes, loved in hostels</h3>
        <div className="mt-4 grid md:grid-cols-2 gap-3">
          {NOTES.slice(0, 4).map((n) => (
            <div key={n.subject} className="flex items-center justify-between gap-3 rounded-2xl border border-zinc-200 p-3.5 hover:border-zinc-900 transition">
              <div><p className="font-bold text-[15px] leading-snug">{n.subject}</p><p className="text-[12px] text-zinc-500">{n.board} • {n.pages} • ⭐ {n.rating}</p></div>
              <div className="text-right shrink-0"><p className="font-extrabold">{n.price} <span className="text-[12px] font-medium text-zinc-400 line-through">{n.old}</span></p><a href={waLink(`Hi! I want notes: ${n.subject} (${n.price}) — Chandigarh. Share sample.`)} className="text-[12px] font-bold text-emerald-700 hover:underline">Sample free →</a></div>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-2xl bg-amber-50 border border-amber-200 p-4 text-sm"><p className="font-bold">🏠 Hostel tip:</p><p className="text-zinc-700">Order with 2+ friends from the same hostel (PU / CU / Chitkara) — split ₹149 delivery & get 10% group off.</p></div>
      </div>
    </section>
  );
}
