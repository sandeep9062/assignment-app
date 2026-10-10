"use client";
import { Suspense, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BRAND, COLLEGES, PROMISES } from "@/data/mock";
import { api, safeNext } from "@/lib/client";
import { useToast } from "@/components/Toaster";

/* Inline line-icons that inherit currentColor; sized via Tailwind so no extra CSS is needed. */
const Svg = ({ children, className = "h-[18px] w-[18px]" }: { children: ReactNode; className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);
const MailIcon = () => <Svg><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></Svg>;
const LockIcon = () => <Svg><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></Svg>;
const UserIcon = () => <Svg><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></Svg>;
const PhoneIcon = () => <Svg><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></Svg>;
const CollegeIcon = () => <Svg><path d="M3 21h18" /><path d="M5 21V8l7-4 7 4v13" /><path d="M9 21v-6h6v6" /></Svg>;
const EyeIcon = () => <Svg><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></Svg>;
const EyeOffIcon = () => <Svg><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><path d="M9.9 9.9a3 3 0 0 0 4.24 4.24" /><path d="M1 1l22 22" /></Svg>;
const CheckIcon = () => <Svg className="h-3 w-3"><path d="M20 6 9 17l-5-5" /></Svg>;

function Auth() {
  const router = useRouter();
  const toast = useToast();
  const next = safeNext(useSearchParams().get("next"));
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [busy, setBusy] = useState(false);
  const [showPw, setShowPw] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const f = Object.fromEntries(new FormData(e.currentTarget));
    const r = await api<{ user: { name: string; isAdmin?: boolean } }>(mode === "login" ? "/api/auth/login" : "/api/auth/signup", f);
    setBusy(false);
    if (!r.ok) return toast.error(r.error);
    toast.success(mode === "login" ? `Welcome back, ${r.data.user.name.split(" ")[0]}!` : "Account created. Welcome!");
    // Admins land on the review dashboard; everyone else honours ?next (or goes home).
    const dest = mode === "login" && r.data.user.isAdmin ? "/admin" : next;
    router.push(dest);
    router.refresh();
  }

  const switchMode = (m: "login" | "signup") => { setMode(m); setShowPw(false); };
  const [tagBefore, tagAfter = ""] = BRAND.tagline.split(",");
  const inputCls = "w-full rounded-xl border border-[var(--edge)] bg-white py-3 pl-11 pr-4 text-[var(--ink)] transition placeholder:text-[#9AA6C4] focus:border-[var(--blue)] focus:outline-none focus:ring-[3px] focus:ring-[rgba(27,42,155,0.16)]";

  return (
    <div className="px-4 py-10 sm:py-14">
      <div className="mx-auto grid max-w-4xl overflow-hidden rounded-2xl border border-[var(--edge)] shadow-[0_26px_60px_-30px_rgba(20,26,51,0.5)] md:grid-cols-[1.05fr_0.95fr]">
        <aside className="relative flex flex-col justify-center gap-4 bg-[var(--blue)] p-8 text-white [background-image:repeating-linear-gradient(to_bottom,transparent_0,transparent_33px,rgba(255,255,255,0.13)_33px,rgba(255,255,255,0.13)_34px)] [background-position:0_20px] sm:p-10">
          <span className="relative text-sm font-bold tracking-wide opacity-90 [font-family:var(--hand)]">Welcome to {BRAND.name}</span>
          <h2 className="relative m-0 [font-family:var(--hand)] text-[clamp(1.9rem,3.4vw,2.5rem)] font-bold leading-tight">
            {tagBefore},{" "}
            <span className="rounded-sm bg-[linear-gradient(transparent_26%,rgba(255,225,77,0.92)_26%,rgba(255,225,77,0.92)_84%,transparent_84%)] px-1">{tagAfter.trim()}</span>
          </h2>
          <ul className="relative m-0 grid list-none gap-2.5 p-0">
            {PROMISES.slice(0, 3).map((p) => (
              <li key={p.title} className="flex items-start gap-2.5 text-[0.95rem] leading-snug text-white/95">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/15"><CheckIcon /></span>
                <span><b className="font-semibold">{p.title}.</b> {p.text}</span>
              </li>
            ))}
          </ul>
          <p className="relative hidden border-t border-white/20 pt-3.5 [font-family:'Caveat','Kalam',cursive] text-2xl leading-snug text-white/95 md:block">
            &ldquo;Demand is the quantity of a good that buyers will purchase at a given price.&rdquo;
            <span className="mt-1.5 block [font-family:var(--body)] text-xs text-white/70">A sample page by Simran, PU B.Com</span>
          </p>
          <span aria-hidden="true" className="pointer-events-none absolute left-6 top-0 bottom-0 border-l-2 border-[rgba(217,58,74,0.95)]"></span>
        </aside>
        <div className="bg-[var(--paper)] p-8 sm:p-10">
          <div className="mb-5 grid grid-cols-2 gap-1 rounded-xl border border-[var(--edge)] bg-[#E9EEF9] p-1" role="group" aria-label="Choose log in or sign up">
            <button type="button" aria-pressed={mode === "login"} onClick={() => switchMode("login")} className={`cursor-pointer rounded-lg border-0 px-3 py-2.5 text-base font-semibold transition ${mode === "login" ? "bg-[var(--paper)] text-[var(--blue)] shadow-sm" : "bg-transparent text-[var(--muted)] hover:text-[var(--blue)]"}`}>Log in</button>
            <button type="button" aria-pressed={mode === "signup"} onClick={() => switchMode("signup")} className={`cursor-pointer rounded-lg border-0 px-3 py-2.5 text-base font-semibold transition ${mode === "signup" ? "bg-[var(--paper)] text-[var(--blue)] shadow-sm" : "bg-transparent text-[var(--muted)] hover:text-[var(--blue)]"}`}>Sign up</button>
          </div>

          <h2 className="m-0 mb-1 [font-family:var(--hand)] text-[1.9rem] font-bold leading-tight text-[var(--ink)]">{mode === "login" ? "Welcome back" : "Create your account"}</h2>
          <p className="mt-0 mb-1 text-[0.98rem] text-[var(--muted)]">{mode === "login" ? "Log in to manage your orders and offers." : "One account to order work and earn from your skills."}</p>

          <form onSubmit={submit} className="mt-3">
            {mode === "signup" && (
              <>
                <div>
                  <label htmlFor="name" className="mb-1.5 mt-4 block text-sm font-semibold text-[var(--ink)]">Full name</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)]"><UserIcon /></span>
                    <input id="name" name="name" required minLength={2} autoComplete="name" placeholder="Your full name" className={inputCls} />
                  </div>
                </div>
                <div>
                  <label htmlFor="college" className="mb-1.5 mt-4 block text-sm font-semibold text-[var(--ink)]">College</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)]"><CollegeIcon /></span>
                    <select id="college" name="college" required defaultValue="" className={`${inputCls} appearance-none pr-4`}>
                      <option value="" disabled>Select your college</option>
                      {COLLEGES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1.5 mt-4 block text-sm font-semibold text-[var(--ink)]">Mobile number (WhatsApp)</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)]"><PhoneIcon /></span>
                    <input id="phone" name="phone" inputMode="tel" pattern="[6-9][0-9]{9}" placeholder="10-digit number" autoComplete="tel-national" className={inputCls} />
                  </div>
                  <p className="mt-1.5 text-[0.8rem] text-[var(--muted)]">Optional, for order updates on WhatsApp.</p>
                </div>
              </>
            )}
            <div>
              <label htmlFor="email" className="mb-1.5 mt-4 block text-sm font-semibold text-[var(--ink)]">Email</label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)]"><MailIcon /></span>
                <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@college.edu" className={inputCls} />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 mt-4 block text-sm font-semibold text-[var(--ink)]">Password</label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)]"><LockIcon /></span>
                <input id="password" name="password" type={showPw ? "text" : "password"} required minLength={mode === "signup" ? 8 : 1} maxLength={72} autoComplete={mode === "login" ? "current-password" : "new-password"} placeholder={mode === "signup" ? "At least 8 characters" : "Enter your password"} className={`${inputCls} pr-12`} />
                <button type="button" onClick={() => setShowPw((v) => !v)} aria-label={showPw ? "Hide password" : "Show password"} className="absolute right-2 top-1/2 grid -translate-y-1/2 cursor-pointer place-items-center rounded-lg border-0 bg-transparent p-2 text-[var(--muted)] transition hover:bg-[#EEF2FB] hover:text-[var(--blue)]">
                  {showPw ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {mode === "signup" && <p className="mt-1.5 text-[0.8rem] text-[var(--muted)]">Use at least 8 characters.</p>}
            </div>
            <button type="submit" disabled={busy} className="mt-6 w-full cursor-pointer rounded-xl border-2 border-[var(--blue)] bg-[var(--blue)] px-5 py-3 text-base font-semibold text-white transition hover:border-[var(--blue-d)] hover:bg-[var(--blue-d)] disabled:cursor-not-allowed disabled:opacity-60">
              {busy ? "Please wait…" : mode === "login" ? "Log in" : "Create account"}
            </button>
            <p className="mt-3.5 text-center text-[0.85rem] text-[var(--muted)]">One account works for both ordering and selling.</p>
            {mode === "signup" && <p className="mt-2 text-center text-[0.78rem] leading-relaxed text-[var(--muted)]">By creating an account you agree to our terms and to follow your college&rsquo;s rules.</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default function Login() {
  return <Suspense fallback={null}><Auth /></Suspense>;
}
