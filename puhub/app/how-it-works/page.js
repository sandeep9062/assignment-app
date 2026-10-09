import { STEPS, FAQ, BRAND } from "@/data/mock";

const SITE = `https://${BRAND.domain}`;

export const metadata = {
  title: "How it works",
  description: `Post what you need, get offers from students, pay safely and pick up or get doorstep delivery. See the handwriting first. Simple, safe and local to ${BRAND.city}.`,
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: `How it works | ${BRAND.name}`,
    description: `Post what you need, get offers from students, pay safely and get doorstep delivery. Simple, safe and local to ${BRAND.city}.`,
    url: `${SITE}/how-it-works`,
    type: "website",
  },
};

// FAQPage structured data can earn an expandable FAQ result in search.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function How() {
  return (
    <div className="wrap" style={{ paddingBottom: 30 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="page-h"><h1>How it works</h1><p className="sub">Simple, safe and local.</p></div>
      <div className="steps">
        {STEPS.map((s) => <div key={s.n} className="step"><div className="n">{s.n}</div><h3>{s.title}</h3><p>{s.text}</p></div>)}
      </div>
      <h2 className="t" style={{ marginTop: 40 }}>FAQ</h2>
      {FAQ.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
    </div>
  );
}
