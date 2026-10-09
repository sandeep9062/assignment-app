import Link from "next/link";

export default function Navbar() {
  return (
    <header className="nav">
      <div className="wrap">
        <Link href="/" className="logo" aria-label="Likhai home">
          Likhai
          <svg width="62" height="7" viewBox="0 0 62 7" aria-hidden="true">
            <path d="M1 4.5C9 1.5 15 6 23 3.5S39 1.5 47 4s9 0 14-1.5" fill="none" stroke="#D93A4A" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </Link>
        <nav className="links" aria-label="Main">
          <Link href="/browse">Browse</Link>
          <Link href="/how-it-works" className="hide-m">How it works</Link>
          <Link href="/become-seller" className="hide-m">Become a seller</Link>
          <Link href="/login">Log in</Link>
          <Link href="/post-job" className="btn sm">Post a job</Link>
        </nav>
      </div>
    </header>
  );
}
