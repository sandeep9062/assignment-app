import Link from "next/link";
import { BRAND, waLink } from "@/data/mock";

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
          <br />
          <a href={waLink("Hi Likhai! I need help with: ___")} target="_blank" rel="noopener noreferrer">WhatsApp {BRAND.phoneDisplay}</a>
          {" · "}
          <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
        </div>
        <div>
          <Link href="/browse">Browse</Link> · <Link href="/become-seller">Become a seller</Link> · <Link href="/how-it-works">FAQ</Link> · <Link href="/contact">Contact</Link>
          <br />
          <Link href="/terms">Terms</Link> · <Link href="/privacy-policy">Privacy Policy</Link> · <Link href="/refund-policy">Refund Policy</Link>
          <br />
          Serving {BRAND.city} only · © {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}
