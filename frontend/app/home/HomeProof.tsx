import { REVIEWS, WHY_US } from "../components/catalog";
import { STEPS } from "../components/site";
import { Eyebrow, Stars, AVATAR_BG } from "../components/ui";

function StepDot({ n, grad }: { n: string; grad: string }) {
  return (
    <span className={`grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br text-sm font-extrabold text-white shadow-md ${grad}`}>
      {n}
    </span>
  );
}

function WhyGlyph({ k, dark = false }: { k: string; dark?: boolean }) {
  const paths: Record<string, string> = {
    pen: "M4 20l3.5-1L20 6.5a2.1 2.1 0 0 0-3-3L4.5 16 4 20z",
    shield: "M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z M9 12l2 2 4-4",
    clock: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M12 6v6l4 2",
    camera: "M4 7h4l2-2h4l2 2h4v13H4V7z M12 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z",
    lock: "M6 11h12v10H6V11z M8 11V7a4 4 0 0 1 8 0v4",
    wallet: "M3 6h18v13H3z M3 9h18 M16 15h.01",
  };
  return (
    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${dark ? "bg-white/10 text-amber-300" : "bg-[#16131f]/5 text-[#16131f]"}`}>
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d={paths[k] ?? paths.pen} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function HomeProof() {
  return (
    <section id="reviews" className="mx-auto max-w-6xl px-4 pt-16">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="card-lift rounded-[26px] border border-[#16131f]/8 bg-white p-7">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight">From panic to submitted in 4 steps</h2>
          <div className="mt-6">
            {STEPS.map((s, i) => (
              <div key={s.n} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <StepDot n={s.n} grad={s.grad} />
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
        <div className="mesh-dark relative overflow-hidden rounded-[26px] p-7 text-white">
          <div className="dotted-bg-light absolute inset-0 opacity-20" aria-hidden />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-amber-300 ring-1 ring-white/15">Why students trust us</span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight">Built for deadlines, obsessed with quality</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {WHY_US.map(([e, t, d]: string[]) => (
                <div key={t} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
                  <WhyGlyph k={e} dark />
                  <p className="mt-2.5 text-sm font-bold">{t}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-zinc-300">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow tone="emerald">Reviews</Eyebrow>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-[2.6rem] md:leading-[1.08]">
            Students <span className="font-hand text-gradient text-[1.12em]">love us</span>
          </h2>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-[#16131f]/10 bg-white px-4 py-2.5 text-sm font-bold shadow-sm"><Stars /> 4.9 • 9,500+ reviews</div>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {REVIEWS.map((r, i) => (
          <figure key={r.name} className="card-lift relative overflow-hidden rounded-[22px] border border-[#16131f]/8 bg-white p-5">
            <span className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${AVATAR_BG[i % AVATAR_BG.length]}`} aria-hidden />
            <Stars />
            <blockquote className="mt-2.5 text-[15px] leading-relaxed text-zinc-700">“{r.text}”</blockquote>
            <figcaption className="mt-4 flex items-center gap-3 border-t border-dashed border-zinc-200 pt-4">
              <span className={`grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br text-sm font-extrabold text-white ${AVATAR_BG[i % AVATAR_BG.length]}`}>{r.initial}</span>
              <span><span className="block text-sm font-bold">{r.name}</span><span className="block text-[12px] font-medium text-zinc-500">{r.meta}</span></span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
