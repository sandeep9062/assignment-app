import Link from "next/link";
import { NAV } from "../components/site";
import { LogoMark, Arrow } from "../components/ui";
import MobileNav from "../components/MobileNav";

export default function HomeHeader() {
  return (
    <header className="glass sticky top-0 z-40 border-b border-[#16131f]/8">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" aria-label="StudySathi home">
          <LogoMark />
        </Link>
        <nav className="hidden items-center gap-1 text-sm font-semibold text-zinc-600 md:flex">
          {NAV.map((n) => (
            <a key={n.label} href={n.href} className="rounded-full px-3 py-1.5 transition hover:bg-[#16131f]/5 hover:text-[#16131f]">{n.label}</a>
          ))}
          <a href="/chandigarh" className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 px-3.5 py-1.5 font-bold text-[#16131f] shadow-[0_4px_14px_-4px_rgb(245_158_11/.6)] transition hover:brightness-105">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" stroke="currentColor" strokeWidth="2.2" />
              <circle cx="12" cy="10" r="2.6" fill="currentColor" />
            </svg>
            Chandigarh
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <a href="#order" className="btn-shine inline-flex items-center gap-1.5 rounded-full bg-[#16131f] px-4 py-2.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 sm:px-5">
            <span className="hidden sm:inline">Order • ₹49+</span><span className="sm:hidden">₹49+</span> <Arrow />
          </a>
          <MobileNav items={NAV} extra={{ label: "Chandigarh", href: "/chandigarh" }} />
        </div>
      </div>
    </header>
  );
}
