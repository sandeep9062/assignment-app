"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { isActivePath, type NavLink } from "@/components/NavLinks";

export default function MobileMenu({ links, loggedIn }: { links: NavLink[]; loggedIn: boolean }) {
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
      {open &&
        // Portal to <body>: the nav has a backdrop-filter, which makes it a
        // containing block and would clip a position:fixed overlay down to the bar.
        createPortal(
          <div className="menu-overlay" onClick={() => setOpen(false)}>
            <nav id="mobile-nav" className="menu-panel" aria-label="Mobile" onClick={(e) => e.stopPropagation()}>
              <div className="menu-head">
                <span className="menu-brand" aria-hidden="true">
                  Likhai
                  <svg width="52" height="6" viewBox="0 0 62 7">
                    <path d="M1 4.5C9 1.5 15 6 23 3.5S39 1.5 47 4s9 0 14-1.5" fill="none" stroke="#D93A4A" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                </span>
                <button type="button" className="menu-close" aria-label="Close menu" onClick={() => setOpen(false)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
              {links.map((l) =>
                l.cta ? (
                  <Link key={l.href} href={l.href} className="btn menu-cta" onClick={() => setOpen(false)}>
                    {l.label}
                  </Link>
                ) : (
                  <Link
                    key={l.href + l.label}
                    href={l.href}
                    aria-current={isActivePath(pathname, l.href) ? "page" : undefined}
                    className={`menu-link${isActivePath(pathname, l.href) ? " active" : ""}`}
                    onClick={() => setOpen(false)}
                  >
                    {l.avatar && (
                      <span className="nav-avatar" aria-hidden="true">
                        {l.label.trim().charAt(0).toUpperCase()}
                      </span>
                    )}
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
          </div>,
          document.body
        )}
    </div>
  );
}
