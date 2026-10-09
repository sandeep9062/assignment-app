"use client";
import { useState } from "react";

export type NavItem = { label: string; href: string };

// Accessible hamburger menu for small screens. Students browse mostly on phones,
// so this replaces the desktop-only nav on mobile. Closes on link tap & Escape.
export default function MobileNav({
  items,
  extra,
}: {
  items: NavItem[];
  extra?: NavItem;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
        aria-label="Toggle menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="grid h-10 w-10 place-items-center rounded-xl border border-[#16131f]/10 bg-white text-[#16131f] shadow-sm transition hover:bg-[#16131f]/5"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          )}
        </svg>
      </button>
      <div
        id="mobile-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-[#16131f]/8 bg-white/95 shadow-[0_20px_40px_-16px_rgb(22_19_31/.28)] backdrop-blur-lg"
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
          {items.map((n) => (
            <a
              key={n.label}
              href={n.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 text-[15px] font-bold text-zinc-700 transition hover:bg-[#16131f]/5 hover:text-[#16131f]"
            >
              {n.label}
            </a>
          ))}
          {extra ? (
            <a
              href={extra.href}
              onClick={() => setOpen(false)}
              className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 px-4 py-2.5 font-bold text-[#16131f]"
            >
              {extra.label}
            </a>
          ) : null}
        </nav>
      </div>
    </div>
  );
}
