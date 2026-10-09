import { AREAS_SERVED } from "../components/chandigarh";
import { STEPS } from "../components/site";
import { WHY_US } from "../components/catalog";
import { Eyebrow } from "../components/ui";

export default function ChdAreas() {
  return (
    <section id="areas" className="mx-auto grid max-w-6xl gap-5 px-4 pt-16 md:grid-cols-2">
      <div className="card-lift rounded-[26px] border border-[#16131f]/8 bg-white p-7">
        <Eyebrow>Delivery in the Tricity</Eyebrow>
        <h2 className="mt-2.5 text-2xl font-extrabold tracking-tight">From order to doorstep</h2>
        <div className="mt-6">
          {STEPS.map((s, i) => (
            <div key={s.n} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className={`grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br text-sm font-extrabold text-white shadow-md ${s.grad}`}>{s.n}</span>
                {i < STEPS.length - 1 && <span className="my-1.5 w-0.5 flex-1 rounded bg-gradient-to-b from-zinc-200 to-transparent" style={{ minHeight: 22 }} />}
              </div>
              <div className="pb-5">
                <p className="text-[11px] font-extrabold tracking-[0.18em] text-amber-600">STEP {s.n}</p>
                <h3 className="font-bold tracking-tight">{s.title}</h3>
                <p className="mt-0.5 text-sm leading-relaxed text-zinc-600">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-amber-300 via-amber-200 to-orange-200 p-7 shadow-md">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/40 blur-2xl" aria-hidden />
          <div className="relative">
            <h2 className="text-2xl font-extrabold tracking-tight">Areas we serve</h2>
            <p className="mt-1 text-sm font-semibold text-[#16131f]/70">Hand delivery • hostel • college gate • home</p>
            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {AREAS_SERVED.map((a) => (
                <div key={a.sector} className="rounded-2xl border border-[#16131f]/10 bg-white/85 px-3.5 py-2.5 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white">
                  <p className="text-sm font-extrabold tracking-tight">{a.sector}</p>
                  <p className="text-[12px] font-medium text-zinc-600">{a.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 rounded-[26px] border border-[#16131f]/8 bg-white p-6">
          <h3 className="font-extrabold tracking-tight">Why Tricity trusts us</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {WHY_US.map(([, t, d]: string[]) => (
              <div key={t} className="flex gap-2.5">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#16131f]/5 text-[13px] font-bold text-[#16131f]">{t.charAt(0)}</span>
                <div><p className="text-sm font-bold">{t}</p><p className="mt-0.5 text-[13px] leading-relaxed text-zinc-600">{d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
