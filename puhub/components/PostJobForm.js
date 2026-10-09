"use client";
import { useState } from "react";
import Link from "next/link";
import { CATEGORIES, COLLEGES } from "@/data/mock";
import { api } from "@/lib/client";
import { useToast } from "@/components/Toaster";

export default function PostJobForm({ defaultCollege = "" }) {
  const toast = useToast();
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [delivery, setDelivery] = useState("pickup");
  const today = new Date().toISOString().slice(0, 10);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    const f = Object.fromEntries(new FormData(e.currentTarget));
    const r = await api("/api/jobs", f);
    setBusy(false);
    if (!r.ok) return toast.error(r.error);
    toast.success("Job posted. Sellers can see it now.");
    setDone(true);
  }

  if (done)
    return (
      <div className="form ok">
        <div className="big">Job posted</div>
        <p>Sellers can see it now and will send offers. You can check them on your account page.</p>
        <Link className="btn" href="/account">See my jobs</Link>
      </div>
    );

  return (
    <form className="form" onSubmit={submit}>
      <h2 style={{ marginTop: 0, fontFamily: "var(--hand)" }}>Post a job</h2>
      <p className="sub">Tell us what you need. Sellers will send you offers.</p>
      <label htmlFor="category">What do you need?</label>
      <select id="category" name="category" required defaultValue="">
        <option value="" disabled>Select a service</option>
        {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.label}</option>)}
      </select>
      <div className="two">
        <div><label htmlFor="college">College</label>
          <select id="college" name="college" required defaultValue={COLLEGES.includes(defaultCollege) ? defaultCollege : ""}><option value="" disabled>Select</option>{COLLEGES.map((c) => <option key={c}>{c}</option>)}</select></div>
        <div><label htmlFor="course">Course and semester</label><input id="course" name="course" required maxLength={80} placeholder="e.g. B.Sc Sem 2" /></div>
      </div>
      <div className="two">
        <div><label htmlFor="subject">Subject</label><input id="subject" name="subject" required maxLength={80} placeholder="e.g. Physics" /></div>
        <div><label htmlFor="pages">Pages or items</label><input id="pages" name="pages" type="number" min="1" max="2000" placeholder="40" /></div>
      </div>
      <div className="two">
        <div><label htmlFor="deadline">Deadline</label><input id="deadline" name="deadline" type="date" min={today} required /></div>
        <div><label htmlFor="budget">Budget (₹)</label><input id="budget" name="budget" type="number" min="0" max="100000" placeholder="500" /></div>
      </div>
      <label htmlFor="details">Details</label>
      <textarea id="details" name="details" rows="4" maxLength={1000} placeholder="Handwriting style, ink colour, paper type, anything else" />
      <label htmlFor="deliveryMode">Delivery</label>
      <select id="deliveryMode" name="deliveryMode" value={delivery} onChange={(e) => setDelivery(e.target.value)}>
        <option value="pickup">Pickup from seller or print desk</option>
        <option value="delivery">Doorstep delivery in Chandigarh</option>
        <option value="digital">Digital copy only</option>
      </select>
      {delivery === "delivery" && (
        <div><label htmlFor="address">Delivery address</label><input id="address" name="address" required minLength={5} maxLength={200} placeholder="House or hostel, sector, Chandigarh" />
          <p className="note" style={{ margin: "6px 0 0" }}>Only shared with the seller you choose.</p></div>
      )}
      <div style={{ marginTop: 20 }}><button className="btn" type="submit" disabled={busy}>{busy ? "Posting" : "Post job"}</button></div>
    </form>
  );
}
