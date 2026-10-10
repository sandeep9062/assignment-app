import Link from "next/link";
import type { ReactNode } from "react";
import { BRAND } from "@/data/mock";

// Cross-links so every policy page points at the other two (Razorpay checks
// that Terms, Privacy and Refund policies exist and are linked).
const POLICIES = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/refund-policy", label: "Refund Policy" },
];

export const LEGAL_UPDATED = "10 October 2026";

export default function LegalPage({
  title,
  sub,
  current,
  children,
}: {
  title: string;
  sub: string;
  /** Path of this page, used to mark the active chip in the policy nav. */
  current: string;
  children: ReactNode;
}) {
  return (
    <div className="wrap legal">
      <div className="page-h">
        <h1>{title}</h1>
        <p className="sub">{sub}</p>
      </div>
      <p className="note" style={{ margin: "0 0 14px" }}>
        Last updated {LEGAL_UPDATED}
      </p>
      <nav className="legal-nav" aria-label="Legal pages">
        {POLICIES.map((p) =>
          p.href === current ? (
            <span key={p.href} className="on" aria-current="page">
              {p.label}
            </span>
          ) : (
            <Link key={p.href} href={p.href}>
              {p.label}
            </Link>
          ),
        )}
      </nav>
      <div className="legal-body">{children}</div>
      <div className="legal-contact">
        <p style={{ margin: 0 }}>
          Questions about this page? Email{" "}
          <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a> and we will reply
          within 2 business days.
        </p>
      </div>
    </div>
  );
}