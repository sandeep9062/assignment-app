import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { BRAND } from "@/data/mock";

const SITE = `https://${BRAND.domain}`;

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The rules for using ${BRAND.name}: accounts, ordering, seller obligations, payments, refunds and acceptable use for students in ${BRAND.city}.`,
  alternates: { canonical: "/terms" },
  openGraph: {
    title: `Terms of Service | ${BRAND.name}`,
    description: `The rules for using ${BRAND.name}: accounts, ordering, seller obligations, payments, refunds and acceptable use.`,
    url: `${SITE}/terms`,
    type: "website",
  },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      sub={`How ${BRAND.name} works and what we ask of you when you use it.`}
      current="/terms"
    >
      <p>
        These Terms of Service (&quot;Terms&quot;) are an agreement between you
        and {BRAND.name} (&quot;we&quot;, &quot;us&quot;), the operator of{" "}
        {BRAND.domain}. They cover your use of our website and marketplace that
        connects students who need handwritten work, practical files, notes,
        printing and similar services with student sellers in {BRAND.city}.
      </p>
      <p>
        By creating an account, posting a job, sending an offer or applying as a
        seller, you accept these Terms. If you do not agree, please do not use{" "}
        {BRAND.name}. We may update these Terms from time to time; the
        &quot;Last updated&quot; date at the top shows when they last changed.
        Continuing to use the service after a change means you accept the
        updated Terms.
      </p>

      <h2>1. Who can use {BRAND.name}</h2>
      <ul>
        <li>
          You must be at least 18 years old, or a student with the consent of a
          parent or guardian where the law requires it.
        </li>
        <li>
          You must give accurate information when signing up (name, email,
          phone, college) and keep it up to date.
        </li>
        <li>
          One person may hold only one account. You are responsible for
          everything that happens under your login, so keep your password
          secret.
        </li>
        <li>
          You must follow your college&rsquo;s or university&rsquo;s rules,
          including any academic-integrity policy that applies to you.
        </li>
      </ul>

      <h2>2. What we do (and do not do)</h2>
      <p>
        {BRAND.name} is a marketplace. We introduce buyers (students who post
        jobs) to sellers (students and print partners who offer work), and we
        hold the buyer&rsquo;s payment until the work is delivered. The actual
        contract for the work is between the buyer and the seller; we do not
        employ the sellers and we are not the author of their work.
      </p>
      <p>
        We review seller applications and samples before a seller goes live, but
        we do not guarantee the quality or originality of every order, nor the
        marks or results you get after submitting work to your institution.
      </p>

      <h2>3. Accounts and security</h2>
      <p>
        You are responsible for maintaining the confidentiality of your
        password. Tell us at{" "}
        <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a> immediately if you
        suspect unauthorised use of your account. We may suspend or close
        accounts that give false information, misuse the service, harass other
        users or break these Terms.
      </p>
      <h2>4. Buying work</h2>
      <ul>
        <li>
          Describe what you need clearly: subject, pages, deadline, format,
          ink/paper and any college-specific requirements.
        </li>
        <li>
          Payment is made through {BRAND.name}. The seller is paid only after
          you confirm delivery. Do not pay a seller directly outside the
          platform — orders settled off-platform are not covered by these Terms
          or by our <a href="/refund-policy">Refund Policy</a>.
        </li>
        <li>
          Every order includes one revision round. If the work does not match
          your brief, ask for a fix or raise a dispute before confirming
          delivery.
        </li>
        <li>
          Delivery dates depend on the details and deadline you give. If you
          change the brief after a seller starts, allow extra time.
        </li>
      </ul>

      <h2>5. Selling on {BRAND.name}</h2>
      <ul>
        <li>
          Apply with your own real details and genuine handwriting/work
          samples. Samples must be work you actually did yourself.
        </li>
        <li>
          You decide your prices and turnaround. You must deliver what you
          promised, by the time you promised it, or tell the buyer early.
        </li>
        <li>
          Work must be original. Do not copy from the internet, books or other
          people&rsquo;s files, do not resell the same file to multiple buyers,
          and do not misrepresent your work or break your college&rsquo;s
          rules.
        </li>
        <li>
          A platform commission is deducted from your earnings before payout
          (currently 10%, unless shown otherwise when you accept an offer).
        </li>
        <li>
          You are responsible for paying any tax that applies to money you earn
          on {BRAND.name}.
        </li>
      </ul>
      <h2>6. Payments, payouts and refunds</h2>
      <p>
        Payments are collected through our payment partner Razorpay. Card, UPI
        and net-banking details are handled by Razorpay — we never see or store
        your full card number or PIN. Your payment is held by us and released
        to the seller after you confirm delivery, or after a dispute is
        resolved.
      </p>
      <p>
        Refunds, cancellations and dispute handling are described in our{" "}
        <a href="/refund-policy">Refund Policy</a>, which is part of these
        Terms.
      </p>

      <h2>7. Acceptable use</h2>
      <p>You must not:</p>
      <ul>
        <li>
          use {BRAND.name} for anything unlawful, fraudulent or sexually
          explicit;
        </li>
        <li>
          submit purchased work as your own where your institution prohibits it
          — how you use the delivered material is your responsibility;
        </li>
        <li>post false reviews, fake orders or misleading seller profiles;</li>
        <li>take orders or payments off-platform to avoid the commission;</li>
        <li>
          harass, abuse or share other users&rsquo; personal details (including
          delivery addresses and phone numbers);
        </li>
        <li>upload viruses, scrape the site, or interfere with the service.</li>
      </ul>
      <h2>8. Your content and our rights</h2>
      <p>
        You keep ownership of what you upload — job details, messages, samples
        and delivered files. You give us a licence to store, display and share
        it as needed to run the service (for example, showing your sample to a
        buyer you are working with). {BRAND.name}, its logo and design belong to
        us; you may not copy them without permission.
      </p>

      <h2>9. Disclaimers and liability</h2>
      <p>
        The service is provided &quot;as is&quot;. To the extent permitted by
        law, we are not liable for indirect or consequential losses, lost
        profits or lost marks/grades arising from work bought or sold on{" "}
        {BRAND.name}. Our total liability for any claim is limited to the amount
        you paid to (or received from) {BRAND.name} in the 3 months before the
        claim. Nothing here limits liability that cannot be limited under Indian
        law, including your rights as a consumer.
      </p>

      <h2>10. Governing law</h2>
      <p>
        These Terms are governed by the laws of India, and the courts of
        Chandigarh have jurisdiction. Before starting any legal action, please
        contact us at <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a> —
        most issues can be sorted out conversationally.
      </p>

      <h2>11. Contact us</h2>
      <p>
        Questions about these Terms? Email{" "}
        <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>. See also our{" "}
        <a href="/privacy-policy">Privacy Policy</a> and{" "}
        <a href="/refund-policy">Refund Policy</a>.
      </p>
    </LegalPage>
  );
}