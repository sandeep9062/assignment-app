"use client";
import { useState } from "react";
import { FAQS } from "../components/catalog";
import { Eyebrow } from "../components/ui";

export default function HomeFaq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 pb-4 pt-16">
      <div className="text-center">
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-[2.6rem] md:leading-[1.08]">
          Questions? <span className="font-hand text-gradient text-[1.12em]">Answered.</span>
        </h2>
      </div>
      <div className="mt-7 space-y-3">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className={`overflow-hidden rounded-2xl border transition-all duration-300 ${isOpen ? "border-ink/15 bg-white shadow-[0_16px_36px_-16px_rgb(22_19_31/.25)]" : "border-ink/8 bg-white/70 hover:border-ink/25 hover:bg-white"}`}>
              <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[15px] font-bold tracking-tight">
                <span>{f.q}</span>
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${isOpen ? "rotate-45 bg-ink text-white" : "bg-ink/5 text-ink"}`}>
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
              <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-[15px] leading-relaxed text-zinc-600">{f.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
