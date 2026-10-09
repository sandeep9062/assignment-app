import { REVIEWS, WHY_US } from "../components/catalog";
import { STEPS } from "../components/site";

export default function HomeProof() {
  return (
    <section id="reviews" className="mx-auto max-w-6xl px-4 pt-14">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-zinc-200 bg-white p-7">
          <h2 className="text-2xl font-extrabold">How it works ⚙️</h2>
          <div className="mt-5">
            {STEPS.map((s, i) => (
              <div key={s.n} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-zinc-900 text-lg">{s.icon}</span>
                  {i < STEPS.length - 1 && <span className="w-0.5 flex-1 bg-zinc-200 my-1" />}
                </div>
                <div className="pb-5">
                  <p className="text-[11px] font-extrabold tracking-widest text-amber-600">STEP {s.n}</p>
                  <h3 className="font-bold">{s.title}</h3>
                  <p className="text-sm text-zinc-600">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-zinc-200 bg-white p-7">
          <h2 className="text-2xl font-extrabold">Why students trust us 🛡️</h2>
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            {WHY_US.map(([e, t, d]: string[]) => (
              <div key={t} className="flex gap-3">
                <span className="text-2xl">{e}</span>
                <div><p className="text-sm font-bold">{t}</p><p className="text-[13px] text-zinc-600">{d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-10 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <p className="text-[12px] font-extrabold tracking-[0.2em] text-amber-600">REVIEWS</p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Students <span className="font-hand text-emerald-700 text-[1.15em]">love us</span></h2>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-bold"><span className="text-amber-400">★★★★★</span> 4.9 • 9,500+ reviews</div>
      </div>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {REVIEWS.map((r) => (
          <figure key={r.name} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="text-amber-400">{"★".repeat(r.stars)}</div>
            <blockquote className="mt-2 text-[15px] leading-relaxed text-zinc-700">“{r.text}”</blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              <span className={`grid h-10 w-10 place-items-center rounded-full font-extrabold text-white ${r.bg}`}>{r.initial}</span>
              <span><span className="block text-sm font-bold">{r.name}</span><span className="block text-[12px] text-zinc-500">{r.meta}</span></span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
