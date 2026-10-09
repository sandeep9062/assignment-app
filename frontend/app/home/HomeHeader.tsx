import { NAV } from "../components/site";

export default function HomeHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-[#faf9f7]/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-zinc-900 text-lg">✍️</span>
          <span className="leading-tight">
            <span className="block font-extrabold tracking-tight">StudySathi</span>
            <span className="block text-[11px] font-medium text-zinc-500">Assignments • Notes • All India</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-zinc-600">
          {NAV.map((n) => (
            <a key={n.label} href={n.href} className="hover:text-zinc-950">{n.label}</a>
          ))}
          <a href="/chandigarh" className="rounded-full border border-amber-400 bg-amber-50 px-3 py-1 font-bold text-amber-800 hover:bg-amber-100">📍 Chandigarh</a>
        </nav>
        <a href="#order" className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-700">Order • ₹49+</a>
      </div>
    </header>
  );
}
