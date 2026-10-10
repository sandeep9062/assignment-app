import Link from "next/link";
import { BRAND } from "@/data/mock";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div>
          <b>{BRAND.name}</b>
          <br />
          {BRAND.tagline}
          <br />
          <span className="note">Preview build. Some sellers and jobs shown are sample profiles.</span>
        </div>
        <div>
          <Link href="/browse">Browse</Link> · <Link href="/become-seller">Become a seller</Link> · <Link href="/how-it-works">FAQ</Link>
          <br />
          Serving {BRAND.city} only · © {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}
