"use client";
import { useState } from "react";
import { CATEGORIES, COLLEGES } from "@/data/mock";

export default function PostJob() {
  const [done, setDone] = useState(false);
  const [delivery, setDelivery] = useState("pickup");
  if (done)
    return (
      <div className="wrap" style={{ padding: "40px 16px" }}>
        <div className="form ok"><div className="big">Job posted</div>
          <p>Sellers will start sending offers soon. (Demo: backend not connected yet.)</p>
          <a className="btn" href="/browse">Browse sellers</a></div>
      </div>
    );
  return (
    <div className="wrap" style={{ padding: "30px 16px" }}>
      <form className="form" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
        <h2 style={{ marginTop: 0 }}>Post a job</h2>
        <p className="sub">Tell us what you need. Sellers will send you offers.</p>
        <label>What do you need?</label>
        <select required defaultValue="">
          <option value="" disabled>Select a service</option>
          {CATEGORIES.map((c) => <option key={c.slug}>{c.label}</option>)}
        </select>
        <div className="two">
          <div><label>College</label><select required defaultValue="">{<option value="" disabled>Select</option>}{COLLEGES.map((c) => <option key={c}>{c}</option>)}</select></div>
          <div><label>Course & semester</label><input required placeholder="e.g. B.Sc Sem 2" /></div>
        </div>
        <div className="two">
          <div><label>Subject</label><input required placeholder="e.g. Physics" /></div>
          <div><label>Pages / items</label><input type="number" min="1" required placeholder="40" /></div>
        </div>
        <div className="two">
          <div><label>Deadline</label><input type="date" required /></div>
          <div><label>Budget (₹)</label><input type="number" min="1" placeholder="500" /></div>
        </div>
        <label>Details</label>
        <textarea rows="4" placeholder="Handwriting style, ink colour, paper type, anything else…" />
        <label>Upload reference (photo/PDF)</label>
        <input type="file" multiple />
        <label>Delivery</label>
        <select value={delivery} onChange={(e) => setDelivery(e.target.value)}>
          <option value="pickup">Pickup from seller / print desk</option>
          <option value="delivery">Doorstep delivery in Chandigarh</option>
          <option value="digital">Digital copy only</option>
        </select>
        {delivery === "delivery" && <div><label>Delivery address</label><input required placeholder="House/hostel, sector, Chandigarh" /></div>}
        <div style={{ marginTop: 20 }}><button className="btn" type="submit">Post job</button></div>
      </form>
    </div>
  );
}
