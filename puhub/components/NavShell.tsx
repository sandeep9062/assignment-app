"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * The sticky header chrome (the <header> itself) as a client component so it can
 * react to scrolling: once the page moves under the bar we add `is-scrolled`,
 * which fades in a drop shadow and the highlighter accent line.
 *
 * The actual contents (logo, links, mobile menu) are passed in as `children`
 * from the async server Navbar, so session-dependent markup still renders on
 * the server.
 */
export default function NavShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? " is-scrolled" : ""}`}>
      <div className="wrap nav-inner">{children}</div>
    </header>
  );
}
