import Link from "next/link";
import { getSessionLight } from "@/lib/auth";
import NavShell from "@/components/NavShell";
import NavLinks, { type NavLink } from "@/components/NavLinks";
import MobileMenu from "@/components/MobileMenu";

export default async function Navbar() {
  const session = await getSessionLight();
  const firstName = session?.name?.split(" ")[0];

  // One list drives both the desktop links and the mobile panel.
  const adminLink: NavLink[] = session?.isAdmin ? [{ href: "/admin", label: "Admin" }] : [];
  const links: NavLink[] = [
    { href: "/browse", label: "Browse" },
    { href: "/jobs", label: "Open jobs" },
    { href: "/how-it-works", label: "How it works" },
    ...adminLink,
    session
      ? { href: "/account", label: firstName || "Account", avatar: true }
      : { href: "/login", label: "Log in" },
    { href: "/post-job", label: "Post a job", cta: true },
  ];

  return (
    <NavShell>
      <Link href="/" className="logo" aria-label="Likhai home">
        Likhai
        <svg width="62" height="7" viewBox="0 0 62 7" aria-hidden="true">
          <path d="M1 4.5C9 1.5 15 6 23 3.5S39 1.5 47 4s9 0 14-1.5" fill="none" stroke="#D93A4A" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </Link>
      <NavLinks links={links} loggedIn={!!session} />
      {/* Quick CTA next to the hamburger on small screens (the desktop one lives in NavLinks). */}
      <Link href="/post-job" className="btn sm nav-cta nav-cta-mobile">
        Post a job
      </Link>
      <MobileMenu links={links} loggedIn={!!session} />
    </NavShell>
  );
}
