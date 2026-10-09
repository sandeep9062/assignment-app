import { AREAS_SERVED } from "../components/chandigarh";
import { STEPS } from "../components/site";
import { WHY_US } from "../components/catalog";

export default function ChdAreas() {
  return (
    <section id="areas" className="mx-auto max-w-6xl px-4 pt-14 grid md:grid-cols-2 gap-6">
      <div className="rounded-3xl border border-zinc-200 bg-white p-7">
        <h2 className="text-2xl font-extrabold">Delivery in the Tricity 🚚</h2>
        <div className="mt-5">
          {STEPS.map((s, i) => (
            <div key={s.n} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-zinc-900 text-lg">{s.icon}</span>
                {i < STEPS.length - 1 && <span className="w-0.5 flex-1 bg-zinc-200 my-1" />}
              </div>
              <div className="pb-6">
                <p className="text-[11px] font-extrabold tracking-widest text-amber-600">STEP {s.n}</p>
                <h3 className="font-bold">{s.title}</h3>
                <p className="text-sm text-zinc-600">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="rounded-3xl border-2 border-zinc-900 bg-amber-300 p-7 shadow-[6px_6px_0_#18181b]">
          <h2 className="text-2xl font-extrabold">Areas we serve 📍</h2>
          <p className="text-sm font-medium text-zinc-800">Hand delivery • hostel • college gate • home</p>
          <div className="mt-4 grid sm:grid-cols-2 gap-2.5">
            {AREAS_SERVED.map((a) => (
              <div key={a.sector} className="rounded-xl bg-white/90 border border-zinc-900/10 px-3.5 py-2.5">
                <p className="font-bold text-sm">{a.sector}</p>
                <p className="text-[12px] text-zinc-600">{a.note}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 rounded-3xl border border-zinc-200 bg-white p-6">
          <h3 className="font-extrabold">Why Tricity trusts us</h3>
          <div className="mt-3 grid sm:grid-cols-2 gap-3">
            {WHY_US.map(([e, t, d]: string[]) => (
              <div key={t} className="flex gap-3">
                <span className="text-xl">{e}</span>
                <div><p className="text-sm font-bold">{t}</p><p className="text-[13px] text-zinc-600">{d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
