import { MARQUEE, waLink } from "../components/site";
import { LOCAL_STATS } from "../components/chandigarh";

export default function ChdHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="dotted-bg absolute inset-0 opacity-60" />
      <div className="absolute -top-10 -right-10 h-64 w-64 rounded-full bg-amber-200/50 blur-3xl" />
      <div className="absolute top-40 -left-10 h-64 w-64 rounded-full bg-violet-200/50 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-4 pt-10 pb-10 md:pt-14 grid md:grid-cols-[1.1fr_.9fr] gap-10 items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-[12px] font-semibold">
            <span className="rounded-full border border-amber-300 bg-amber-50 px-3 py-1">📍 Chandigarh • Mohali • Panchkula</span>
            <span className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1">⭐ 4.9 — 2,800+ Tricity reviews</span>
            <span className="rounded-full border border-zinc-300 bg-white px-3 py-1">🚚 Same-day delivery</span>
          </div>
          <p className="mt-4 text-sm font-medium text-zinc-500"><a href="/" className="hover:underline">Home</a><span className="mx-1">/</span><span className="text-zinc-800">Chandigarh</span></p>
          <h1 className="mt-2 text-4xl md:text-[3.3rem] font-extrabold leading-[1.05] tracking-tight">Assignments & <span className="font-hand text-amber-600 text-[1.15em]">handwritten notes</span> in Chandigarh</h1>
          <p className="mt-4 text-lg text-zinc-600 leading-relaxed max-w-xl">For <strong className="text-zinc-900">PU, DAV, PEC, UIET, CU, Chitkara, IGNOU Sec-9</strong> & every Tricity college. Written in <em>your</em> handwriting, PDF in 24–48 hrs + delivery to hostel & gate.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a href={waLink("Hi StudySathi Chandigarh! I need an assignment. College: ___, Subject: ___, Pages: ___, Deadline: ___")} className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3.5 font-bold text-white shadow-lg hover:bg-emerald-500">💬 Order on WhatsApp — reply in 5 min</a>
            <a href="#pricing" className="inline-flex items-center justify-center rounded-full border-2 border-zinc-900 bg-white px-6 py-3 font-bold hover:bg-zinc-900 hover:text-white">See Tricity pricing ↓</a>
          </div>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-600"><span>✅ Free 1-page sample</span><span>✅ Only 30% advance</span><span>✅ Deadline-or-refund</span></div>
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl">
            {LOCAL_STATS.map((s) => (
              <div key={s.l} className="rounded-2xl border border-zinc-200 bg-white p-3 text-center shadow-sm">
                <div className="text-lg font-extrabold">{s.n}</div>
                <div className="text-[11px] font-medium text-zinc-500">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-3 rotate-2 rounded-[28px] bg-amber-200/60" />
          <div className="relative rounded-[24px] border-2 border-zinc-900 bg-white shadow-[8px_8px_0_#18181b] overflow-hidden">
            <div className="flex items-center justify-between bg-zinc-900 px-5 py-3 text-white">
              <p className="text-sm font-bold">📓 PU B.Com — Accounting</p>
              <span className="rounded-full bg-emerald-500 px-2.5 py-0.5 text-[11px] font-bold">DELIVERED • SEC 36</span>
            </div>
            <div className="lined-paper px-6 py-5 font-hand text-[1.35rem] leading-[28px] text-sky-900">
              <p><span className="text-rose-600 font-bold">Q1. Journal entries —</span> colour-coded ✨</p>
              <p>Cash A/c Dr. 50,000 …</p>
              <p>To Capital A/c ……… ✅</p>
              <p className="text-emerald-800">Trial balance shortcut → p.42 ⭐</p>
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-dashed border-zinc-200 px-5 py-4">
              <div><p className="text-[12px] font-semibold text-zinc-500">PDF + SPIRAL</p><p className="text-xl font-extrabold">₹349 <span className="text-sm font-medium text-zinc-400 line-through">₹649</span></p></div>
              <a href={waLink("Hi! I want PU B.Com Accounting notes (Chd). Share sample.")} className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-600">Get sample free</a>
            </div>
          </div>
          <div className="absolute -left-4 -bottom-5 rotate-[-6deg] rounded-2xl border-2 border-zinc-900 bg-white px-4 py-2 shadow-[4px_4px_0_#18181b] animate-float-slow"><p className="text-[12px] font-bold">🚚 Sec-17 pickup in 30 min</p></div>
          <div className="absolute -right-3 -top-5 rotate-[5deg] rounded-2xl border-2 border-zinc-900 bg-amber-300 px-4 py-2 shadow-[4px_4px_0_#18181b] animate-float-delayed"><p className="text-[12px] font-bold">✍️ Matched to your handwriting</p></div>
        </div>
      </div>
      <div className="relative border-y-2 border-zinc-900 bg-zinc-900 py-2.5 overflow-hidden">
        <div className="animate-marquee flex w-max gap-8 whitespace-nowrap text-sm font-semibold text-amber-200">
          {[...MARQUEE, ...MARQUEE].map((m, i) => (<span key={i} className="flex items-center gap-8">✦ {m}</span>))}
        </div>
      </div>
    </section>
  );
}
