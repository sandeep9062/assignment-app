/**
 * Shared smooth-scroll helpers for the app.
 *
 * `SmoothScroll` (components/SmoothScroll.tsx) owns the Lenis instance and
 * publishes it here, so unrelated components (e.g. a BackToTop button)
 * can scroll without importing Lenis themselves.
 */

import Lenis from "lenis";

/** How long (seconds) a smooth scroll animation takes. */
export const SCROLL_DURATION = 1.2;

/**
 * Momentum-based easing for Lenis. easeOutExpo feels heavy and natural
 * at the end of a scroll.
 */
export const EASING = (t: number): number =>
  t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

/**
 * Whether the visitor prefers reduced motion. Returns `false` on the
 * server so this module can be imported safely by client components.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Module-level singleton for the Lenis instance (one per app).
let lenisInstance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  lenisInstance = lenis;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

/**
 * Smoothly scroll to a DOM element using the registered Lenis instance.
 * Falls back to native `scrollIntoView` when no Lenis instance is active.
 */
export function scrollToElement(el: HTMLElement): void {
  const lenis = getLenis();
  if (!lenis) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  lenis.scrollTo(el);
}

/**
 * Scroll to the top of the page.
 *
 * @param immediate When `true`, jump straight to the top without an
 *   animated sweep (used on route changes).
 */
export function scrollToTop({ immediate = false }: { immediate?: boolean } = {}) {
  const lenis = getLenis();
  if (!lenis) {
    window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
    return;
  }
  lenis.scrollTo(0, { immediate });
}
