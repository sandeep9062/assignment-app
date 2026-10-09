"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { COLLEGES } from "@/data/mock";
import { api, safeNext } from "@/lib/client";

function Auth() {
  const router = useRouter();
  const next = safeNext(useSearchParams().get("next"));
  const [mode, setMode] = useState("login");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const f = Object.fromEntries(new FormData(e.currentTarget));
    const r = await api(mode === "login" ? "/api/auth/login" : "/api/auth/signup", f);
    setBusy(false);
    if (!r.ok) return setError(r.error);
    router.push(next);
    router.refresh();
  }

  return (
    <div className="wrap" style={{ padding: "30px 16px" }}>
      <form className="form" style={{ maxWidth: 440 }} onSubmit={submit}>
        <div className="filters">
          <button type="button" className={`chip ${mode === "login" ? "on" : ""}`} onClick={() => { setMode("login"); setError(""); }}>Log in</button>
          <button type="button" className={`chip ${mode === "signup" ? "on" : ""}`} onClick={() => { setMode("signup"); setError(""); }}>Sign up</button>
        </div>
        {mode === "signup" && (
          <>
            <label htmlFor="name">Full name</label><input id="name" name="name" required minLength={2} autoComplete="name" />
            <label htmlFor="college">College</label>
            <select id="college" name="college" required defaultValue=""><option value="" disabled>Select</option>{COLLEGES.map((c) => <option key={c}>{c}</option>)}</select>
            <label htmlFor="phone">Mobile number (WhatsApp)</label>
            <input id="phone" name="phone" inputMode="tel" pattern="[6-9][0-9]{9}" placeholder="10-digit number" autoComplete="tel-national" />
          </>
        )}
        <label htmlFor="email">Email</label><input id="email" name="email" type="email" required autoComplete="email" />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required minLength={mode === "signup" ? 8 : 1} maxLength={72} autoComplete={mode === "login" ? "current-password" : "new-password"} />
        {mode === "signup" && <p className="note" style={{ margin: "6px 0 0" }}>At least 8 characters.</p>}
        {error && <div className="err" role="alert">{error}</div>}
        <div style={{ marginTop: 20 }}>
          <button className="btn" type="submit" style={{ width: "100%" }} disabled={busy}>
            {busy ? "Please wait" : mode === "login" ? "Log in" : "Create account"}
          </button>
        </div>
        <p className="note" style={{ marginTop: 14 }}>One account works for ordering and selling.</p>
      </form>
    </div>
  );
}

export default function Login() {
  return <Suspense fallback={null}><Auth /></Suspense>;
}
