import { SERVICES, waLink } from "../components/site";
import { Check, Eyebrow, Arrow } from "../components/ui";

const ICONS: Record<string, string> = {
  pen: "M4 20l3.5-1L20 6.5a2.1 2.1 0 0 0-3-3L4.5 16 4 20z M14.5 6.5l3 3",
  note: "M6 2h9l5 5v15H6V2z M14 2v6h6 M9 13h7 M9 17h7",
  flask: "M9 2h6 M10 2v6l-5 12h14L14 8V2 M7.5 15h9",
  bolt: "M13 2L4 14h6l-1 8 9-12h-6l1-8z",
};

export default function ChdServices() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-4 pt-16">
      <Eyebrow>Chandigarh services</Eyebrow>
      <h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight md:text-[2.6rem] md:leading-[1.08]">
        What Tricity students <span className="font-hand text-gradient text-[1.12em]">order most</span>
      </h2>
      <div className="mt-7 grid gap-5 md:grid-cols-2">
        {SERVICES.map((s) => (
          <div key={s.title} className="card-lift relative overflow-hidden rounded-[26px] border border-ink/8 bg-white">
            <div className={`h-1.5 bg-gradient-to-r ${s.grad}`} aria-hidden />
            <div className="p-6 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <span className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-md ${s.grad}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d={ICONS[s.icon]} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="rounded-full bg-ink px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-white">{s.badge} • CHD</span>
              </div>
              <h3 className="mt-4 text-xl font-extrabold tracking-tight">{s.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-zinc-600">{s.desc}</p>
              <ul className="mt-4 space-y-2 text-sm text-zinc-700">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-2.5"><Check /><span>{p}</span></li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-zinc-200 pt-5">
                <p className="text-lg font-extrabold tracking-tight">{s.price}<span className="block text-[11px] font-semibold text-zinc-500">+ ₹149 spiral + hand delivery</span></p>
                <a href={waLink(s.msg + " (Chandigarh)")} className="btn-shine inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5">{s.cta} <Arrow /></a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
