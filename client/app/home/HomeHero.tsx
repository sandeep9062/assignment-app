import { MARQUEE, waLink } from "../components/site";
import { Stars } from "../components/ui";

const STATS: { n: string; l: string; star?: boolean }[] = [
  { n: "48,000+", l: "Orders delivered" },
  { n: "4.9", l: "9,500+ reviews", star: true },
  { n: "24–48 hrs", l: "Standard delivery" },
  { n: "99.2%", l: "On-time rate" },
];

export default function HomeHero() {
  return (
    <section className="mesh-hero relative overflow-hidden">
      <div className="dotted-bg absolute inset-0 opacity-50" aria-hidden />
      <div className="animate-blob absolute -top-16 -right-16 h-72 w-72 rounded-full bg-amber-300/40 blur-3xl" aria-hidden />
      <div className="animate-blob absolute top-48 -left-16 h-72 w-72 rounded-full bg-violet-300/40 blur-3xl [animation-delay:2s]" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-12 pt-12 md:pt-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rise">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-[12px] font-bold text-white shadow-md">
              <span className="grid h-4 w-4 place-items-center rounded-full bg-amber-400 text-[9px] text-ink">✎</span>
              IGNOU • DU SOL • B.Tech • MBA
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white/80 px-3.5 py-1.5 text-[12px] font-bold text-emerald-800 backdrop-blur">
              <Stars /> 4.9 — 9,500+ reviews
            </span>
          </div>
          <h1 className="mt-5 text-[2.6rem] font-extrabold leading-[1.02] tracking-tight sm:text-5xl lg:text-[3.6rem]">
            Assignments &{" "}
            <span className="relative inline-block">
              <span className="font-hand text-gradient text-[1.12em]">handwritten notes</span>
              <svg className="absolute -bottom-1.5 left-0 w-full" height="10" viewBox="0 0 220 10" preserveAspectRatio="none" aria-hidden>
                <path d="M3 7C60 2 160 2 217 6" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" fill="none" />
              </svg>
            </span>
            , done for you
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-zinc-600">
            Plagiarism-free, in <strong className="font-bold text-ink">your handwriting style</strong>. PDF in 24–48 hrs + courier anywhere in India. Free sample before you pay full.
          </p>
          <div className="rise-1 mt-7 flex flex-col gap-3 sm:flex-row">
            <a href={waLink("Hi StudySathi! I need help with my assignment. Subject: ___, University: ___, Deadline: ___")} className="btn-shine inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-7 py-4 font-bold text-white shadow-lg transition hover:-translate-y-0.5">
              Get free quote in 5 min
            </a>
            <a href="#pricing" className="inline-flex items-center justify-center gap-2 rounded-2xl border-[1.5px] border-ink/15 bg-white/80 px-7 py-4 font-bold backdrop-blur transition hover:-translate-y-0.5 hover:border-ink">
              Calculate price
            </a>
          </div>
          <div className="rise-2 mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-semibold text-zinc-600">
            {["Free 1-page sample", "Only 30% advance", "Deadline-or-refund"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M2 6.5l2.6 2.5L10 3.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {t}
              </span>
            ))}
          </div>
          <div className="rise-3 mt-6 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.l} className="rounded-2xl border border-white/60 bg-white/75 p-3 text-center shadow-sm backdrop-blur">
                <div className="flex items-center justify-center gap-1 text-lg font-extrabold tracking-tight">{s.n}{s.star ? <span className="text-amber-400 text-sm">★</span> : null}</div>
                <div className="mt-0.5 text-[11px] font-semibold text-zinc-500">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rise-2 relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="absolute -inset-4 rotate-2 rounded-[30px] bg-gradient-to-br from-violet-300 via-fuchsia-200 to-amber-200 opacity-70" aria-hidden />
          <div className="relative overflow-hidden rounded-[24px] border border-ink/10 bg-white shadow-xl">
            <div className="flex items-center justify-between gap-3 bg-ink-strong px-5 py-3.5 text-white">
              <p className="text-sm font-bold">IGNOU BAG — Assignment</p>
              <span className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-[11px] font-extrabold text-emerald-300 ring-1 ring-emerald-400/40">SCORE 78/100</span>
            </div>
            <div className="lined-paper px-6 py-5 pl-14 font-hand text-[1.35rem] leading-[28px] text-sky-900">
              <p><span className="font-bold text-rose-600">Q1. Features of Indian Constitution</span></p>
              <p>1. Lengthiest written constitution…</p>
              <p>2. Federal with unitary bias</p>
              <p className="text-emerald-800">+ cover page • index • maps</p>
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-dashed border-zinc-200 bg-amber-50/60 px-5 py-4">
              <div><p className="text-[11px] font-extrabold tracking-[0.14em] text-zinc-500">HANDWRITTEN • 30 PAGES</p><p className="text-xl font-extrabold">₹2,370 <span className="text-sm font-medium text-zinc-400 line-through">₹3,200</span></p></div>
              <a href={waLink("Hi! I want an IGNOU assignment like the sample. Subject: ___, Deadline: ___")} className="btn-shine rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5">Order similar</a>
            </div>
          </div>
          <div className="glass absolute -bottom-5 -left-3 rounded-2xl border border-ink/10 px-4 py-2.5 shadow-lg animate-float-slow sm:-left-6"><p className="text-[12px] font-bold">Your handwriting, matched</p></div>
          <div className="absolute -right-2 -top-5 rounded-2xl bg-ink px-4 py-2.5 text-white shadow-lg animate-float-delayed sm:-right-4"><p className="text-[12px] font-bold">PDF + courier</p></div>
        </div>
      </div>
      <div className="marquee-mask relative overflow-hidden border-y border-white/10 bg-ink-strong py-3">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap text-[13px] font-bold tracking-wide text-amber-200/90">
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} className="flex items-center gap-10"><span className="text-amber-400">✦</span> {m}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
