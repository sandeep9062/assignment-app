import Link from "next/link";
import { getSessionLight } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";
import MobileMenu from "@/components/MobileMenu";

export default async function Navbar() {
  const session = await getSessionLight();
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <Link href="/" className="logo" aria-label="Likhai home">
          Likhai
          <svg width="62" height="7" viewBox="0 0 62 7" aria-hidden="true">
            <path d="M1 4.5C9 1.5 15 6 23 3.5S39 1.5 47 4s9 0 14-1.5" fill="none" stroke="#D93A4A" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </Link>
        <nav className="links links-desktop" aria-label="Main">
          <Link href="/browse">Browse</Link>
          <Link href="/jobs">Open jobs</Link>
          <Link href="/how-it-works">How it works</Link>
          {session ? (
            <>
              <Link href="/account">{session.name?.split(" ")[0] || "Account"}</Link>
              <LogoutButton />
            </>
          ) : (
            <Link href="/login">Log in</Link>
          )}
          <Link href="/post-job" className="btn sm">Post a job</Link>
        </nav>
        <MobileMenu
          links={[
            { href: "/browse", label: "Browse" },
            { href: "/jobs", label: "Open jobs" },
            { href: "/how-it-works", label: "How it works" },
            ...(session
              ? [{ href: "/account", label: session.name?.split(" ")[0] || "Account" }]
              : [{ href: "/login", label: "Log in" }]),
            { href: "/post-job", label: "Post a job", cta: true },
          ]}
          loggedIn={!!session}
        />
      </div>
    </header>
  );
}
