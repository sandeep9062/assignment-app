import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { BRAND } from "@/data/mock";

const SITE = `https://${BRAND.domain}`;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `What ${BRAND.name} collects (account, job and payment data), how it is used, who it is shared with, cookies, retention and your rights.`,
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: `Privacy Policy | ${BRAND.name}`,
    description: `What ${BRAND.name} collects, how it is used, who it is shared with, cookies, retention and your rights.`,
    url: `${SITE}/privacy-policy`,
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      sub="What we collect, why we collect it, and the control you have over it."
      current="/privacy-policy"
    >
      <p>
        This Privacy Policy explains how {BRAND.name} (&quot;we&quot;,
        &quot;us&quot;) collects, uses and protects your personal information
        when you use {BRAND.domain} in {BRAND.city}. By using the service you
        agree to this policy.
      </p>

      <h2>1. What we collect</h2>
      <ul>
        <li>
          <strong>Account details:</strong> name, email address, phone number
          (WhatsApp), college and course, and a securely hashed password.
        </li>
        <li>
          <strong>Job and order details:</strong> what you post or offer —
          subject, pages, deadline, budget, notes, handwriting samples and
          delivery preferences. If you choose doorstep delivery, we also collect
          your delivery address.
        </li>
        <li>
          <strong>Payment details:</strong> transaction IDs, amounts and status
          from Razorpay. Card numbers, CVV, UPI PINs and net-banking passwords
          are entered on Razorpay&rsquo;s checkout and are never stored on our
          servers.
        </li>
        <li>
          <strong>Technical data:</strong> IP address, browser/device type, pages
          visited and cookies, collected to keep the site secure and working
          properly.
        </li>
        <li>
          <strong>Communications:</strong> messages you send us, including
          support requests and dispute details.
        </li>
      </ul>

      <h2>2. How we use your information</h2>
      <ul>
        <li>To create and manage your account and keep you signed in.</li>
        <li>
          To run the marketplace: show your profile or job to relevant users,
          match buyers with sellers, and deliver orders.
        </li>
        <li>
          To process payments and payouts through Razorpay, and to issue
          refunds when our Refund Policy applies.
        </li>
        <li>
          To contact you about orders, disputes and security alerts (mostly by
          WhatsApp or email).
        </li>
        <li>To prevent fraud, abuse and spam, and to enforce our Terms.</li>
        <li>To improve the service using aggregated, non-identifying stats.</li>
      </ul>
      <h2>3. What we do not do</h2>
      <p>
        We do not sell or rent your personal information to anyone. Your
        delivery address and phone number are never shown publicly — a
        buyer&rsquo;s address is shared only with the seller they choose for
        that order, and a seller&rsquo;s contact details are shared only after
        an offer is made.
      </p>

      <h2>4. Who we share data with</h2>
      <ul>
        <li>
          <strong>Razorpay</strong> — to collect payments and send refunds. Its
          handling of your payment data is covered by its own privacy policy.
        </li>
        <li>
          <strong>The other party in your order</strong> — the buyer and seller
          in a deal see what they need to complete it (brief, price, delivery
          details).
        </li>
        <li>
          <strong>Service providers</strong> — our hosting and database
          providers (for example MongoDB and Vercel), who process data only on
          our instructions.
        </li>
        <li>
          <strong>Authorities</strong> — if the law requires us to disclose it,
          or to protect the safety of our users.
        </li>
      </ul>
      <h2>5. Cookies</h2>
      <p>
        We use a small number of cookies: an essential session cookie that keeps
        you signed in, and cookies needed for basic site function. We do not use
        advertising or third-party tracking cookies. You can clear cookies in
        your browser at any time; blocking essential cookies will sign you out
        and stop account features from working.
      </p>

      <h2>6. How long we keep it</h2>
      <p>
        We keep account information while your account is active. After you
        delete your account, we remove or anonymise your personal data within a
        reasonable period, except records we must keep for legal, tax or
        dispute-resolution purposes (payment records are typically kept as long
        as Indian law requires).
      </p>

      <h2>7. How we protect it</h2>
      <p>
        Passwords are hashed (never stored in plain text), sessions use a
        signed HttpOnly cookie, and the site is served over HTTPS. Access to
        user data inside {BRAND.name} is limited to administrators who need it
        to run the service. No system is 100% secure, but we work to protect
        your data and will tell you promptly if a breach affects you.
      </p>
      <h2>8. Your rights</h2>
      <p>You can, at any time:</p>
      <ul>
        <li>see the data we hold about you from your account page;</li>
        <li>
          ask us to correct inaccurate data, or to delete your account and
          personal data;
        </li>
        <li>
          withdraw consent for optional communications (for example, order
          update messages);
        </li>
        <li>
          raise a complaint or ask a question by emailing{" "}
          <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>.
        </li>
      </ul>
      <p>
        We aim to respond to data requests within 30 days. If you are in India,
        you may also exercise rights under the Digital Personal Data Protection
        Act, 2023 where it applies.
      </p>

      <h2>9. Children</h2>
      <p>
        {BRAND.name} is a student service, but it is not directed at children
        under 13, and we do not knowingly collect their data. If you believe a
        child has signed up, contact us and we will delete the account.
      </p>

      <h2>10. Changes to this policy</h2>
      <p>
        We may update this policy occasionally. The current version is always on
        this page with its &quot;Last updated&quot; date; material changes will
        be announced on the site or by email.
      </p>

      <h2>11. Contact</h2>
      <p>
        For any privacy question, email{" "}
        <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>. See also our{" "}
        <a href="/terms">Terms of Service</a> and{" "}
        <a href="/refund-policy">Refund Policy</a>.
      </p>
    </LegalPage>
  );
}