import { waLink } from "../components/site";

const ITEMS = [
  { t: "Send details", d: "College, subject, pages & deadline on WhatsApp. Quote in 5 min.", e: "💬" },
  { t: "Approve free sample", d: "1 page in your handwriting style + exact price. No advance yet.", e: "✍️" },
  { t: "Get PDF + hand delivery", d: "PDF first on WhatsApp, then spiral to hostel / gate / home.", e: "📦" },
];

export default function ChdSteps() {
  return (
    <section id="order" className="mx-auto max-w-6xl px-4 pt-10">
      <div className="grid md:grid-cols-3 gap-4">
        {ITEMS.map((s, i) => (
          <div key={s.t} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm flex gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-amber-100 text-xl">{s.e}</span>
            <div>
              <p className="text-[11px] font-extrabold tracking-widest text-amber-600">STEP {i + 1}</p>
              <h3 className="font-bold">{s.t}</h3>
              <p className="text-sm text-zinc-600">{s.d}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-2xl bg-zinc-900 text-white px-5 py-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm"><strong>Urgent?</strong> Submission tomorrow? Ask for <span className="text-amber-300 font-bold">Express 24-hr</span> writing.</p>
        <a href={waLink("URGENT Chandigarh: need assignment in 24 hrs. College ___, Subject ___, Pages ___")} className="rounded-full bg-amber-300 text-zinc-900 px-4 py-2 font-bold text-[13px]">⚡ Express order</a>
      </div>
    </section>
  );
}
