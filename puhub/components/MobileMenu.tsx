"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuLink {
  href: string;
  label: string;
  cta?: boolean;
}

export default function MobileMenu({ links, loggedIn }: { links: MenuLink[]; loggedIn: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the menu on route change + lock body scroll while open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="mobile-menu">
      <button
        type="button"
        className="menu-btn"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span aria-hidden="true" className={`burger ${open ? "open" : ""}`}>
          <i /><i /><i />
        </span>
      </button>
      {open && (
        <div className="menu-overlay" onClick={() => setOpen(false)}>
          <nav id="mobile-nav" className="menu-panel" aria-label="Mobile" onClick={(e) => e.stopPropagation()}>
            {links.map((l) =>
              l.cta ? (
                <Link key={l.href} href={l.href} className="btn menu-cta" onClick={() => setOpen(false)}>
                  {l.label}
                </Link>
              ) : (
                <Link
                  key={l.href + l.label}
                  href={l.href}
                  aria-current={pathname === l.href ? "page" : undefined}
                  className={`menu-link${pathname === l.href ? " active" : ""}`}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              )
            )}
            {loggedIn && (
              <form action="/api/auth/logout" method="post" className="menu-logout">
                <button type="submit" className="linklike">Log out</button>
              </form>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
