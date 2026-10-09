import { SERVICES, waLink } from "../components/site";

export default function HomeServices() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-4 pt-14">
      <p className="text-[12px] font-extrabold tracking-[0.2em] text-amber-600">OUR SERVICES</p>
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Everything a student <span className="font-hand text-amber-600 text-[1.15em]">needs to submit</span></h2>
      <div className="mt-6 grid md:grid-cols-2 gap-5">
        {SERVICES.map((s) => (
          <div key={s.title} className="rounded-3xl border-2 border-zinc-900 bg-white overflow-hidden shadow-[6px_6px_0_#18181b]">
            <div className="flex items-center justify-between border-b-2 border-zinc-900 px-5 py-3 bg-amber-50">
              <span className="text-2xl">{s.icon}</span>
              <span className="rounded-full bg-zinc-900 px-3 py-1 text-[11px] font-bold text-white">{s.badge}</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-extrabold">{s.title}</h3>
              <p className="mt-1.5 text-zinc-600 text-[15px]">{s.desc}</p>
              <ul className="mt-3 space-y-1.5 text-sm">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-2"><span className="text-emerald-600 font-bold">✓</span><span>{p}</span></li>
                ))}
              </ul>
              <div className="mt-5 flex items-center justify-between gap-3 flex-wrap">
                <p className="font-extrabold">{s.price}</p>
                <a href={waLink(s.msg)} className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-600">{s.cta} →</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
