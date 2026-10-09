import { LogoMark, Arrow } from "../components/ui";
import MobileNav, { type NavItem } from "../components/MobileNav";

const NAV: NavItem[] = [
  { label: "Services", href: "#services" },
  { label: "Notes", href: "#notes" },
  { label: "Pricing", href: "#pricing" },
  { label: "Colleges", href: "#colleges" },
  { label: "Areas", href: "#areas" },
  { label: "FAQ", href: "#faq" },
];

export default function ChdHeader() {
  return (
    <header className="glass sticky top-0 z-40 border-b border-ink/8">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <a href="/chandigarh" aria-label="StudySathi Chandigarh home">
          <LogoMark sub="Chandigarh" />
        </a>
        <nav className="hidden items-center gap-1 text-sm font-semibold text-zinc-600 md:flex">
          {NAV.map((n) => (
            <a key={n.label} href={n.href} className="rounded-full px-3 py-1.5 transition hover:bg-ink/5 hover:text-ink">{n.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="#order" className="btn-shine inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 sm:px-5"><span className="hidden sm:inline">Order • ₹49+</span><span className="sm:hidden">₹49+</span> <Arrow /></a>
          <MobileNav items={NAV} extra={{ label: "All-India site", href: "/" }} />
        </div>
      </div>
    </header>
  );
}
