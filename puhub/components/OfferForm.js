"use client";
import { useState } from "react";
import { api } from "@/lib/client";
import { useToast } from "@/components/Toaster";

export default function OfferForm({ jobId }) {
  const toast = useToast();
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    const r = await api(`/api/jobs/${jobId}/offers`, Object.fromEntries(new FormData(e.currentTarget)));
    setBusy(false);
    if (!r.ok) return toast.error(r.error);
    toast.success(r.data.updated ? "Offer updated." : "Offer sent. The student will see it on their account page.");
    e.currentTarget.reset();
  }

  return (
    <form className="form" style={{ margin: 0 }} onSubmit={submit}>
      <h3 style={{ marginTop: 0 }}>Send an offer</h3>
      <div className="two">
        <div><label htmlFor="price">Your price (₹)</label><input id="price" name="price" type="number" min="1" max="100000" required /></div>
        <div><label htmlFor="days">Days to deliver</label><input id="days" name="days" type="number" min="0" max="60" defaultValue="3" /></div>
      </div>
      <label htmlFor="message">Message</label>
      <textarea id="message" name="message" rows="3" maxLength={300} placeholder="Why you are a good fit, what you will include" />
      <div style={{ marginTop: 16 }}><button className="btn" type="submit" disabled={busy}>{busy ? "Sending" : "Send offer"}</button></div>
    </form>
  );
}
