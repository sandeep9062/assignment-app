import type { Metadata } from "next";
import { BRAND, waLink } from "@/data/mock";
import { getUser } from "@/lib/auth";
import ContactForm from "@/components/ContactForm";

export const dynamic = "force-dynamic";

const SITE = `https://${BRAND.domain}`;

export const metadata: Metadata = {
  title: "Contact & support",
  description: `Chat with ${BRAND.name} on WhatsApp, email ${BRAND.email}, or send a message from this page. Help with orders, payments, refunds and seller accounts in ${BRAND.city}.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact & support | ${BRAND.name}`,
    description: `WhatsApp, email or contact form — we usually reply the same day.`,
    url: `${SITE}/contact`,
    type: "website",
  },
};

function WaGlyph() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37s-1.04 1.01-1.04 2.470 1.06 2.86 1.21 3.06c.15.2 2.09 3.2 5.07 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 2C6.5 2 2 6.48 2 12c0 1.77.46 3.45 1.28 4.91L2 22l5.25-1.38A9.96 9.96 0 0 0 12.04 22C17.57 22 22 17.52 22 12S17.57 2 12.04 2zm0 18.2a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.17 8.17 0 0 1-1.25-4.34c0-4.53 3.7-8.22 8.23-8.22 2.2 0 4.26.86 5.81 2.41a8.16 8.16 0 0 1 2.41 5.81c0 4.53-3.7 8.2-8.22 8.2z" />
    </svg>
  );
}

function MailGlyph() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}

export default async function Contact() {
  const user = await getUser();
  return (
    <div className="wrap" style={{ paddingBottom: 30, maxWidth: 820 }}>
      <div className="page-h">
        <h1>Contact &amp; support</h1>
        <p className="sub">
          Questions about an order, payment or becoming a seller? We are here —
          the fastest way is WhatsApp.
        </p>
      </div>

      <div className="grid g2" style={{ marginBottom: 22 }}>
        <a
          className="card contact-card"
          href={waLink("Hi Likhai! I need help with: ___")}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="contact-ic wa">
            <WaGlyph />
          </span>
          <div>
            <h3 style={{ margin: 0 }}>WhatsApp us</h3>
            <p className="note" style={{ margin: "2px 0 0" }}>
              {BRAND.phoneDisplay} · usually replies in a few hours
            </p>
          </div>
        </a>
        <a className="card contact-card" href={`mailto:${BRAND.email}`}>
          <span className="contact-ic mail">
            <MailGlyph />
          </span>
          <div>
            <h3 style={{ margin: 0 }}>Email us</h3>
            <p className="note" style={{ margin: "2px 0 0" }}>
              {BRAND.email} · replies within a day
            </p>
          </div>
        </a>
      </div>

      <p className="note" style={{ margin: "0 0 22px" }}>
        Support hours: {BRAND.hours}. Outside these hours, leave a message below
        or on WhatsApp and we will get back to you on the next working day.
      </p>

      <ContactForm
        defaults={{
          name: user?.name || "",
          email: user?.email || "",
          phone: user?.phone || "",
        }}
      />
    </div>
  );
}