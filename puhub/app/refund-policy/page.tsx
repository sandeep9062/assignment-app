import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { BRAND } from "@/data/mock";

const SITE = `https://${BRAND.domain}`;

export const metadata: Metadata = {
  title: "Refund Policy",
  description: `When orders on ${BRAND.name} are eligible for a refund, how disputes work, how long refunds take and how to request one.`,
  alternates: { canonical: "/refund-policy" },
  openGraph: {
    title: `Refund Policy | ${BRAND.name}`,
    description: `When orders on ${BRAND.name} are eligible for a refund, how disputes work, how long refunds take and how to request one.`,
    url: `${SITE}/refund-policy`,
    type: "website",
  },
};

export default function RefundPage() {
  return (
    <LegalPage
      title="Refund Policy"
      sub="When you get your money back, and how to ask for it."
      current="/refund-policy"
    >
      <p>
        At {BRAND.name}, payment is held until the work is delivered — that is
        the core of how the marketplace works. This Refund Policy explains when
        a refund applies, when it does not, and how long it takes. It forms part
        of our <a href="/terms">Terms of Service</a>.
      </p>

      <h2>1. How payment and delivery work</h2>
      <ul>
        <li>
          When you accept an offer, your payment goes to {BRAND.name} (via
          Razorpay) — not directly to the seller.
        </li>
        <li>
          We hold the payment while the seller completes the order.
        </li>
        <li>
          The seller is paid only after you confirm delivery, or automatically
          once the order is marked delivered and no dispute is raised within the
          dispute window (see section 4).
        </li>
      </ul>
      <h2>2. When you are eligible for a refund</h2>
      <p>You can request a full or partial refund if:</p>
      <ul>
        <li>
          the seller did not deliver by the agreed deadline and did not agree
          an extension with you;
        </li>
        <li>
          the delivered work does not match the brief you both agreed on, and
          the free revision round does not fix it;
        </li>
        <li>
          the seller cancelled the order, or their account was removed for
          breaking our rules;
        </li>
        <li>
          the work is plagiarised or copied from somewhere else;
        </li>
        <li>
          you were charged twice, or charged the wrong amount, due to a
          payment error.
        </li>
      </ul>

      <h2>3. When a refund does not apply</h2>
      <ul>
        <li>
          You changed your mind after the seller started work and the work was
          delivered as agreed.
        </li>
        <li>
          You missed giving the seller the details or deadline in time — the
          delivery date depended on you.
        </li>
        <li>
          Minor preferences (slightly different ink shade, neater margins) that
          can be handled by the free revision round instead.
        </li>
        <li>
          Orders completed and confirmed by you more than 7 days earlier, with
          no dispute raised at the time.
        </li>
        <li>
          Work you already used and submitted, where the work matched the brief.
        </li>
      </ul>
      <h2>4. Disputes and the dispute window</h2>
      <ul>
        <li>
          If there is a problem, raise a dispute from your order/account page
          (or email us) within <strong>7 days</strong> of the delivery date.
        </li>
        <li>
          While a dispute is open, the payment stays held — the seller is not
          paid out yet.
        </li>
        <li>
          We review the brief, the delivered files and both sides&rsquo;
          messages, and may ask the seller for proof of original work.
        </li>
        <li>
          We may offer a full refund, a partial refund, or ask the seller to
          revise — our decision is based on what the agreed brief said.
        </li>
        <li>
          If no dispute is raised within the window and you confirm delivery
          (or the order auto-confirms), the payment is released to the seller
          and refunds are no longer available except where required by law.
        </li>
      </ul>

      <h2>5. Cancellation before work starts</h2>
      <p>
        If you cancel an order before the seller has started working, you get a{" "}
        <strong>full refund</strong>. If the seller has already started but
        nothing has been delivered, we may settle on a partial refund covering
        the work not yet done. Sellers can also cancel before starting — in that
        case you are refunded in full.
      </p>
      <h2>6. How to request a refund</h2>
      <ol>
        <li>
          Email{" "}
          <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a> (or raise a
          dispute from your order page) with your order reference, what went
          wrong, and any evidence (photos, screenshots of the brief).
        </li>
        <li>
          We acknowledge requests within <strong>2 business days</strong> and
          aim to resolve most disputes within <strong>5 business days</strong>.
        </li>
        <li>
          If approved, the refund is initiated to the original payment method
          through Razorpay.
        </li>
      </ol>

      <h2>7. How long refunds take</h2>
      <p>
        Once we initiate a refund, the money is returned to the original
        payment method. Razorpay typically credits it within{" "}
        <strong>5–7 business days</strong>; banks, cards and UPI providers may
        take a little longer to show it in your statement. If the refund has not
        arrived after 10 business days, email us and we will chase it with
        Razorpay.
      </p>

      <h2>8. Failed or missed refunds</h2>
      <p>
        If a refund fails (for example, a closed bank account), Razorpay will
        retry or return it to the source account; we will contact you to arrange
        an alternative. We are not responsible for delays caused by your bank
        or payment provider, but we will help you trace the money.
      </p>

      <h2>9. Changes to this policy</h2>
      <p>
        We may update this Refund Policy from time to time. The
        &quot;Last updated&quot; date at the top shows the latest version;
        changes will be announced on the site or by email.
      </p>
    </LegalPage>
  );
}