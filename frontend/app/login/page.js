"use client";
import { useState } from "react";
import { COLLEGES } from "@/data/mock";

export default function Login() {
  const [mode, setMode] = useState("login");
  const [done, setDone] = useState(false);

  if (done)
    return (
      <div className="wrap" style={{ padding: "40px 16px" }}>
        <div className="form ok"><div className="big">Welcome to Likhai</div>
          <p>(Demo: login is not connected to a backend yet.)</p>
          <a className="btn" href="/browse">Start browsing</a></div>
      </div>
    );

  return (
    <div className="wrap" style={{ padding: "30px 16px" }}>
      <form className="form" style={{ maxWidth: 440 }} onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
        <div className="filters">
          <button type="button" className={`chip ${mode === "login" ? "on" : ""}`} onClick={() => setMode("login")}>Log in</button>
          <button type="button" className={`chip ${mode === "signup" ? "on" : ""}`} onClick={() => setMode("signup")}>Sign up</button>
        </div>
        {mode === "signup" && (
          <>
            <label>Full name</label><input required />
            <label>College</label>
            <select required defaultValue=""><option value="" disabled>Select</option>{COLLEGES.map((c) => <option key={c}>{c}</option>)}</select>
            <label>Phone / WhatsApp</label><input required inputMode="tel" placeholder="98xxxxxxxx" />
          </>
        )}
        <label>Email</label><input type="email" required />
        <label>Password</label><input type="password" required minLength={6} />
        <div style={{ marginTop: 20 }}><button className="btn" type="submit" style={{ width: "100%" }}>{mode === "login" ? "Log in" : "Create account"}</button></div>
        <p className="sub" style={{ marginTop: 14, fontSize: ".85rem" }}>You can both order and sell with one account.</p>
      </form>
    </div>
  );
}
