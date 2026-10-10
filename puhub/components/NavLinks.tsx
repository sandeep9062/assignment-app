"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

export interface NavLink {
  href: string;
  label: string;
  /** Rendered as the highlighter-sticker "Post a job" button. */
  cta?: boolean;
  /** Prefix the label with a round initial badge (the signed-in account link). */
  avatar?: boolean;
}

/** "/" only matches itself; every other link also matches its sub-routes. */
export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function NavLinks({ links, loggedIn }: { links: NavLink[]; loggedIn: boolean }) {
  const pathname = usePathname();

  return (
    <nav className="links links-desktop" aria-label="Main">
      {links.map((link) =>
        link.cta ? (
          <Link key={link.href} href={link.href} className="btn sm nav-cta">
            {link.label}
          </Link>
        ) : (
          <Link
            key={link.href + link.label}
            href={link.href}
            className={`nav-link${isActivePath(pathname, link.href) ? " active" : ""}`}
            aria-current={isActivePath(pathname, link.href) ? "page" : undefined}
          >
            {link.avatar && (
              <span className="nav-avatar" aria-hidden="true">
                {link.label.trim().charAt(0).toUpperCase()}
              </span>
            )}
            {link.label}
          </Link>
        )
      )}
      {loggedIn && <LogoutButton />}
    </nav>
  );
}
