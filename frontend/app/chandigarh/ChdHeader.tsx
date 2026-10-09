export default function ChdHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-[#faf9f7]/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
        <a href="/chandigarh" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-zinc-900 text-lg">✍️</span>
          <span className="leading-tight">
            <span className="block font-extrabold tracking-tight">StudySathi <span className="text-amber-600">Chandigarh</span></span>
            <span className="block text-[11px] font-medium text-zinc-500">Assignments • Notes • Tricity Delivery</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-zinc-600">
          <a href="#services" className="hover:text-zinc-950">Services</a>
          <a href="#notes" className="hover:text-zinc-950">Notes</a>
          <a href="#pricing" className="hover:text-zinc-950">Pricing</a>
          <a href="#colleges" className="hover:text-zinc-950">Colleges</a>
          <a href="#areas" className="hover:text-zinc-950">Areas</a>
          <a href="#faq" className="hover:text-zinc-950">FAQ</a>
        </nav>
        <a href="#order" className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-700">Order • ₹49+</a>
      </div>
    </header>
  );
}
