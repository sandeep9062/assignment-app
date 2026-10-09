import { waLink } from "../components/site";

const ITEMS = [
  { t: "Share details on WhatsApp", d: "Subject, university, pages & deadline. Free quote in 5 minutes.", e: "💬" },
  { t: "Approve free sample", d: "1 page in your handwriting style + exact locked price.", e: "✍️" },
  { t: "Get PDF + courier", d: "Instant PDF on WhatsApp, spiral courier in 3–5 days.", e: "📦" },
];

export default function HomeSteps() {
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
        <p className="text-sm"><strong>In Chandigarh Tricity?</strong> Get <span className="text-amber-300 font-bold">same-day hand delivery</span> + Sec-17 pickup.</p>
        <a href="/chandigarh" className="rounded-full bg-amber-300 text-zinc-900 px-4 py-2 font-bold text-[13px]">📍 Open Chandigarh page →</a>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-[13px]">
        <span className="font-bold text-zinc-500">We follow formats of:</span>
        {["IGNOU", "DU SOL", "AKTU", "VTU", "Amity", "LPU", "Mumbai Univ", "PU Chandigarh"].map((u) => (
          <a key={u} href={waLink(`Hi StudySathi! I'm from ${u}. I need: Subject ___, Pages ___, Deadline ___`)} className="rounded-full border border-zinc-200 bg-white px-3 py-1 font-semibold hover:border-zinc-900">{u}</a>
        ))}
      </div>
    </section>
  );
}
