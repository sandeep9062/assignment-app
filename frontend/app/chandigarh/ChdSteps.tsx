import { waLink } from "../components/site";
import { Arrow } from "../components/ui";

const ITEMS = [
  { t: "Send details", d: "College, subject, pages & deadline on WhatsApp. Quote in 5 min.", grad: "from-emerald-400 to-teal-500" },
  { t: "Approve free sample", d: "1 page in your handwriting style + exact price. No advance yet.", grad: "from-violet-400 to-purple-600" },
  { t: "Get PDF + hand delivery", d: "PDF first on WhatsApp, then spiral to hostel / gate / home.", grad: "from-amber-400 to-orange-500" },
];

export default function ChdSteps() {
  return (
    <section id="order" className="mx-auto max-w-6xl px-4 pt-12">
      <div className="grid gap-4 md:grid-cols-3">
        {ITEMS.map((s, i) => (
          <div key={s.t} className="card-lift rounded-3xl border border-ink/8 bg-white p-5">
            <div className="flex gap-4">
              <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-sm font-extrabold text-white shadow-md ${s.grad}`}>0{i + 1}</span>
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
          <p className="text-[15px]"><strong>Urgent?</strong> Submission tomorrow? Ask for <span className="font-bold text-amber-300">Express 24-hr</span> writing.</p>
          <a href={waLink("URGENT Chandigarh: need assignment in 24 hrs. College ___, Subject ___, Pages ___")} className="btn-shine inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-300 to-amber-400 px-4 py-2 text-[13px] font-extrabold text-ink transition hover:-translate-y-0.5">Express order <Arrow /></a>
        </div>
      </div>
    </section>
  );
}
