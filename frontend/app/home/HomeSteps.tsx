import { waLink } from "../components/site";
import { Arrow } from "../components/ui";

const ITEMS = [
  { t: "Share details on WhatsApp", d: "Subject, university, pages & deadline. Free quote in 5 minutes.", grad: "from-emerald-400 to-teal-500", glyph: "M4 5h16v11H8l-4 4V5z" },
  { t: "Approve free sample", d: "1 page in your handwriting style + exact locked price.", grad: "from-violet-400 to-purple-600", glyph: "M4 20l3.5-1L20 6.5a2.1 2.1 0 0 0-3-3L4.5 16 4 20z" },
  { t: "Get PDF + courier", d: "Instant PDF on WhatsApp, spiral courier in 3–5 days.", grad: "from-amber-400 to-orange-500", glyph: "M3 7l9-4 9 4v10l-9 4-9-4V7z M3 7l9 4 9-4 M12 11v10" },
];

export default function HomeSteps() {
  return (
    <section id="order" className="mx-auto max-w-6xl px-4 pt-12">
      <div className="grid gap-4 md:grid-cols-3">
        {ITEMS.map((s, i) => (
          <div key={s.t} className="card-lift group relative overflow-hidden rounded-3xl border border-ink/8 bg-white p-5">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-amber-100 to-violet-100 opacity-0 blur-2xl transition group-hover:opacity-100" aria-hidden />
            <div className="relative flex gap-4">
              <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-md ${s.grad}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d={s.glyph} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
                </svg>
              </span>
              <div>
                <p className="text-[11px] font-extrabold tracking-[0.18em] text-amber-600">STEP {i + 1}</p>
                <h3 className="mt-0.5 font-bold tracking-tight">{s.t}</h3>
                <p className="mt-1 text-sm leading-relaxed text-zinc-600">{s.d}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mesh-dark relative mt-4 overflow-hidden rounded-3xl px-6 py-5 text-white">
        <div className="dotted-bg-light absolute inset-0 opacity-20" aria-hidden />
        <div className="relative flex flex-wrap items-center justify-between gap-3">
          <p className="text-[15px]"><strong>In Chandigarh Tricity?</strong> Get <span className="font-bold text-amber-300">same-day hand delivery</span> + Sec-17 pickup.</p>
          <a href="/chandigarh" className="btn-shine inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-300 to-amber-400 px-4 py-2 text-[13px] font-extrabold text-ink transition hover:-translate-y-0.5">Open Chandigarh page <Arrow /></a>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-[13px]">
        <span className="font-bold text-zinc-500">We follow formats of:</span>
        {["IGNOU", "DU SOL", "AKTU", "VTU", "Amity", "LPU", "Mumbai Univ", "PU Chandigarh"].map((u) => (
          <a key={u} href={waLink(`Hi StudySathi! I'm from ${u}. I need: Subject ___, Pages ___, Deadline ___`)} className="rounded-full border border-ink/10 bg-white px-3 py-1 font-semibold shadow-sm transition hover:-translate-y-0.5 hover:border-ink">{u}</a>
        ))}
      </div>
    </section>
  );
}
