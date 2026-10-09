"use client";
import { useEffect } from "react";

// Adds a subtle fade/slide reveal to every section below the hero as it scrolls
// into view. Zero edits needed in section files — it auto-discovers `main section`.
// Safe if JS is disabled (the hidden state is gated behind the `js-reveal` class,
// which is also set by an inline script in layout so there's no flash).
export default function ScrollReveal() {
  useEffect(() => {
    document.documentElement.classList.add("js-reveal");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -50px 0px" }
    );

    const observeNew = () => {
      const sections = document.querySelectorAll<HTMLElement>("main section");
      sections.forEach((el, i) => {
        if (i === 0) return; // skip the hero — it has its own entrance animation
        if (el.dataset.revealed) return;
        el.dataset.revealed = "1";
        if (reduce || !("IntersectionObserver" in window)) {
          el.classList.add("reveal-in");
        } else {
          io.observe(el);
        }
      });
    };

    observeNew();

    // Handle client-side navigation between / and /chandigarh
    const mo = new MutationObserver(observeNew);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
