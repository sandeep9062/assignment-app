import { waLink } from "../components/site";
import { WaGlyph, Arrow, LogoMark } from "../components/ui";

export default function HomeCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="mesh-dark relative overflow-hidden rounded-[28px] px-7 py-12 text-center text-white sm:p-12">
        <div className="dotted-bg-light absolute inset-0 opacity-20" aria-hidden />
        <div className="absolute -top-20 left-1/2 h-56 w-[38rem] -translate-x-1/2 rounded-full bg-amber-400/20 blur-3xl" aria-hidden />
        <div className="absolute -bottom-24 -left-16 h-56 w-72 rounded-full bg-emerald-400/15 blur-3xl" aria-hidden />
        <div className="relative">
          <p className="font-hand text-2xl text-amber-300 sm:text-[1.7rem]">deadline close? we have got you</p>
          <h2 className="mx-auto mt-2 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">Get your assignment done tonight.</h2>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-zinc-300">Message your subject now. Free sample + exact quote in 5 minutes. PDF in 24–48 hrs, courier to your doorstep.</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={waLink("Hi StudySathi! I want to order. Subject: ___, University: ___, Pages: ___, Deadline: ___")} className="btn-shine inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 font-bold shadow-[0_16px_32px_-10px_rgb(16_185_129/.6)] transition hover:-translate-y-0.5"><WaGlyph size={20} /> WhatsApp to order</a>
            <a href="/chandigarh" className="inline-flex items-center justify-center gap-1.5 rounded-2xl border border-white/20 bg-white/[0.06] px-8 py-4 font-bold backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:text-ink">Chandigarh? Same-day here <Arrow /></a>
          </div>
          <div className="mx-auto mt-6 flex max-w-lg flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[12px] font-semibold text-zinc-400">
            <span>9am–11pm support</span><span className="h-1 w-1 rounded-full bg-zinc-600" /><span>UPI / cards</span><span className="h-1 w-1 rounded-full bg-zinc-600" /><span>Only 30% advance</span>
          </div>
        </div>
      </div>
      <footer className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-ink/8 pb-6 pt-6 text-[13px] text-zinc-500 md:flex-row">
        <p className="flex items-center gap-2"><LogoMark /> <span className="hidden sm:inline">• IGNOU • DU SOL • B.Tech • MBA • All India</span></p>
        <p className="flex gap-5 font-semibold"><a href="/chandigarh" className="transition hover:text-ink">Chandigarh</a><a href="#pricing" className="transition hover:text-ink">Pricing</a><a href="#faq" className="transition hover:text-ink">FAQ</a></p>
      </footer>
      <a href={waLink("Hi StudySathi! I need help with: ___")} aria-label="Chat on WhatsApp" className="btn-shine fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-[0_16px_32px_-8px_rgb(16_185_129/.7)] transition hover:scale-105">
        <WaGlyph size={26} />
        <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5"><span className="live-dot absolute inline-flex h-full w-full rounded-full bg-amber-400" /><span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-400" /></span>
      </a>
    </section>
  );
}
