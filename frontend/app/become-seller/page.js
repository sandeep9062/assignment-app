"use client";
import { useState } from "react";
import { CATEGORIES, COLLEGES } from "@/data/mock";

export default function BecomeSeller() {
  const [done, setDone] = useState(false);
  if (done)
    return (
      <div className="wrap" style={{ padding: "40px 16px" }}>
        <div className="form ok"><div className="big">Application received</div>
          <p>We will review your sample and contact you on WhatsApp. (Demo: backend not connected yet.)</p></div>
      </div>
    );
  return (
    <div className="wrap" style={{ padding: "30px 16px" }}>
      <form className="form" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
        <h2 style={{ marginTop: 0 }}>Become a seller</h2>
        <p className="sub">Use your handwriting and skills to earn. Set your own prices.</p>
        <div className="two">
          <div><label>Full name</label><input required /></div>
          <div><label>Phone / WhatsApp</label><input required inputMode="tel" placeholder="98xxxxxxxx" /></div>
        </div>
        <div className="two">
          <div><label>College</label><select required defaultValue=""><option value="" disabled>Select</option>{COLLEGES.map((c) => <option key={c}>{c}</option>)}</select></div>
          <div><label>Course & year</label><input required placeholder="e.g. B.Com 2nd year" /></div>
        </div>
        <label>What can you offer?</label>
        <div className="filters">
          {CATEGORIES.map((c) => (
            <label key={c.slug} className="chip" style={{ margin: 0, fontWeight: 400 }}>
              <input type="checkbox" style={{ width: "auto", marginRight: 6 }} />{c.label}
            </label>
          ))}
        </div>
        <label>Starting price (₹) and unit</label>
        <input placeholder="e.g. ₹5 per page" />
        <label>Handwriting sample / past work (photos)</label>
        <input type="file" accept="image/*,.pdf" multiple required />
        <label>About you</label>
        <textarea rows="3" placeholder="Subjects you are good at, how fast you can deliver…" />
        <label style={{ fontWeight: 400 }}>
          <input type="checkbox" required style={{ width: "auto", marginRight: 8 }} />
          I will not misrepresent work or break my college's rules, and I agree to the seller terms.
        </label>
        <div style={{ marginTop: 20 }}><button className="btn" type="submit">Submit application</button></div>
      </form>
    </div>
  );
}
