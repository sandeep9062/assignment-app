"use client";
import { useEffect, useState } from "react";

// Floating "back to top" button that appears after scrolling. Long landing pages
// benefit from this — students can jump back to the top nav / hero quickly.
export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-5 left-5 z-40 grid h-11 w-11 place-items-center rounded-2xl border border-ink/10 bg-white text-ink shadow-[0_12px_28px_-10px_rgb(22_19_31/.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:text-white ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
