"use client";
import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { CATEGORIES, COLLEGES } from "@/data/mock";
import { api } from "@/lib/client";
import { useToast } from "@/components/Toaster";

interface SellerApplyDefaults {
  phone: string;
  college: string;
}

interface SellerApplyResponse {
  status: string;
}

interface SellerApplyBody {
  [key: string]: FormDataEntryValue | FormDataEntryValue[] | string[] | boolean;
  categories: string[];
  tags: string[];
  agree: boolean;
}

export default function SellerApplyForm({ defaults }: { defaults: SellerApplyDefaults }) {
  const toast = useToast();
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const fd = new FormData(e.currentTarget);
    const body: SellerApplyBody = Object.fromEntries(fd) as SellerApplyBody;
    body.categories = fd.getAll("categories").map(String);
    body.tags = String(fd.get("tags") || "").split(",").map((t) => t.trim()).filter(Boolean).slice(0, 8);
    body.agree = fd.get("agree") === "on";
    const r = await api<SellerApplyResponse>("/api/seller/apply", body);
    setBusy(false);
    if (!r.ok) return toast.error(r.error);
    toast.success(r.data.status === "approved" ? "You are live! Your profile is visible now." : "Application received. We will message you on WhatsApp.");
    setStatus(r.data.status);
  }

  if (status)
    return (
      <div className="form ok">
        <div className="big">{status === "approved" ? "You are live" : "Application received"}</div>
        <p>{status === "approved"
          ? "Your profile is visible to students and you can send offers on open jobs."
          : "We will message you on WhatsApp to collect photos of your handwriting. Once approved, your profile goes live."}</p>
      </div>
    );

  return (
    <form className="form" onSubmit={submit}>
      <h2 style={{ marginTop: 0, fontFamily: "var(--hand)" }}>Become a seller</h2>
      <p className="sub">Use your handwriting and skills to earn. Set your own prices.</p>
      <div className="two">
        <div><label htmlFor="phone">Mobile number (WhatsApp)</label><input id="phone" name="phone" required inputMode="tel" pattern="[6-9][0-9]{9}" defaultValue={defaults.phone} placeholder="10-digit number" /></div>
        <div><label htmlFor="course">Course and year</label><input id="course" name="course" required maxLength={80} placeholder="e.g. B.Com 2nd year" /></div>
      </div>
      <label htmlFor="college">College</label>
      <select id="college" name="college" required defaultValue={COLLEGES.includes(defaults.college) ? defaults.college : ""}><option value="" disabled>Select</option>{COLLEGES.map((c) => <option key={c}>{c}</option>)}</select>
      <label>What can you offer?</label>
      <div className="checks">
        {CATEGORIES.map((c) => <label key={c.slug}><input type="checkbox" name="categories" value={c.slug} />{c.label}</label>)}
      </div>
      <div className="two">
        <div><label htmlFor="price">Starting price (₹)</label><input id="price" name="price" type="number" min="1" max="100000" required placeholder="5" /></div>
        <div><label htmlFor="unit">Per</label>
          <select id="unit" name="unit" defaultValue="page">
            {["page", "file", "set", "project", "deck", "job"].map((u) => <option key={u}>{u}</option>)}
          </select></div>
      </div>
      <div className="two">
        <div><label htmlFor="turnaroundDays">Usual delivery time (days)</label><input id="turnaroundDays" name="turnaroundDays" type="number" min="0" max="30" defaultValue="3" /></div>
        <div><label htmlFor="hand">Closest handwriting style</label>
          <select id="hand" name="hand" defaultValue="kalam">
            <option value="kalam">Upright print-style</option><option value="caveat">Fast cursive</option>
            <option value="patrick">Neat and rounded</option><option value="shadows">Light and slanted</option>
          </select></div>
      </div>
      <label htmlFor="sampleText">One line to show as your sample</label>
      <input id="sampleText" name="sampleText" maxLength={140} placeholder="e.g. Photosynthesis takes place in the chloroplasts." />
      <label htmlFor="tags">Subjects or skills (separate with commas)</label>
      <input id="tags" name="tags" placeholder="Fair copy, Cursive, Diagrams" />
      <label htmlFor="bio">About you</label>
      <textarea id="bio" name="bio" rows={3} maxLength={500} placeholder="Subjects you are good at, how fast you can deliver" />
      <p className="note">Photo samples are not uploaded here yet. After you apply, we will ask for them on WhatsApp.</p>
      <label style={{ fontWeight: 400 }}>
        <input type="checkbox" name="agree" required style={{ width: "auto", marginRight: 8 }} />
        I will not misrepresent work or break my college&apos;s rules, and I agree to the{" "}
        <Link href="/terms" style={{ color: "var(--blue)", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 3 }}>
          seller terms
        </Link>
        .
      </label>
      <div style={{ marginTop: 20 }}><button className="btn" type="submit" disabled={busy}>{busy ? "Submitting" : "Submit application"}</button></div>
    </form>
  );
}
