"use client";
import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { BRAND, waLink } from "@/data/mock";
import { api } from "@/lib/client";
import { useToast } from "@/components/Toaster";

const TOPICS = ["Order help", "Payment or refund", "Become a seller", "Report a problem", "Something else"] as const;

interface ContactDefaults {
  name: string;
  email: string;
  phone: string;
}

export default function ContactForm({ defaults }: { defaults: ContactDefaults }) {
  const toast = useToast();
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const f = Object.fromEntries(new FormData(e.currentTarget));
    const r = await api("/api/contact", f);
    setBusy(false);
    if (!r.ok) return toast.error(r.error);
    toast.success("Message sent. We will reply by email soon.");
    setDone(true);
  }

  if (done)
    return (
      <div className="form ok">
        <div className="big">Message sent</div>
        <p>
          We usually reply within a few hours during {BRAND.hours}. Need it
          faster? Chat with us on WhatsApp.
        </p>
        <a className="btn" href={waLink("Hi Likhai! I just sent a message from the contact page about: ___")}>
          Chat on WhatsApp
        </a>
      </div>
    );

  return (
    <form className="form" onSubmit={submit}>
      <h2 style={{ marginTop: 0, fontFamily: "var(--hand)" }}>Send us a message</h2>
      <p className="sub">No account needed. We reply to your email, usually the same day.</p>
      <div className="two">
        <div>
          <label htmlFor="c-name">Your name</label>
          <input id="c-name" name="name" required minLength={2} maxLength={80} defaultValue={defaults.name} placeholder="e.g. Aman" />
        </div>
        <div>
          <label htmlFor="c-email">Email</label>
          <input id="c-email" name="email" type="email" required maxLength={160} defaultValue={defaults.email} placeholder="you@college.edu" />
        </div>
      </div>
      <div className="two">
        <div>
          <label htmlFor="c-phone">Phone / WhatsApp (optional)</label>
          <input id="c-phone" name="phone" inputMode="tel" pattern="[6-9][0-9]{9}" maxLength={10} defaultValue={defaults.phone} placeholder="98xxxxxxxx" />
        </div>
        <div>
          <label htmlFor="c-topic">What is it about?</label>
          <select id="c-topic" name="topic" defaultValue="Something else">
            {TOPICS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>
      <label htmlFor="c-message">Message</label>
      <textarea
        id="c-message"
        name="message"
        rows={5}
        required
        minLength={10}
        maxLength={2000}
        placeholder="Tell us what you need help with. If it is about an order, add the job or order details."
      />
      <p className="note" style={{ margin: "8px 0 0" }}>
        For order problems, include your deadline so we can prioritise. Read how we handle your data in the{" "}
        <Link href="/privacy-policy" style={{ color: "var(--blue)", fontWeight: 600 }}>
          Privacy Policy
        </Link>
        .
      </p>
      <div style={{ marginTop: 20 }}>
        <button className="btn" type="submit" disabled={busy}>
          {busy ? "Sending" : "Send message"}
        </button>
      </div>
    </form>
  );
}