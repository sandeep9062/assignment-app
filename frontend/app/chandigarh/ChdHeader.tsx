import { LogoMark, Arrow } from "../components/ui";

export default function ChdHeader() {
  return (
    <header className="glass sticky top-0 z-40 border-b border-[#16131f]/8">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <a href="/chandigarh" aria-label="StudySathi Chandigarh home">
          <LogoMark sub="Chandigarh" />
        </a>
        <nav className="hidden items-center gap-1 text-sm font-semibold text-zinc-600 md:flex">
          {[["Services", "#services"], ["Notes", "#notes"], ["Pricing", "#pricing"], ["Colleges", "#colleges"], ["Areas", "#areas"], ["FAQ", "#faq"]].map(([l, h]) => (
            <a key={l} href={h} className="rounded-full px-3 py-1.5 transition hover:bg-[#16131f]/5 hover:text-[#16131f]">{l}</a>
          ))}
        </nav>
        <a href="#order" className="btn-shine inline-flex items-center gap-1.5 rounded-full bg-[#16131f] px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5">Order • ₹49+ <Arrow /></a>
      </div>
    </header>
  );
}
