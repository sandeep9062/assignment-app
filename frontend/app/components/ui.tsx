// Shared premium UI primitives — SVG icons, headings, buttons.
export function LogoMark({ sub }: { sub?: string }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="relative grid h-10 w-10 place-items-center rounded-2xl bg-ink text-white shadow-[0_8px_20px_-8px_rgb(22_19_31/.5)]">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 20l3.5-1L20 6.5a2.1 2.1 0 0 0-3-3L4.5 16 4 20z" stroke="#fbbf24" strokeWidth="2" strokeLinejoin="round" />
          <path d="M14.5 6.5l3 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-emerald-500 text-[10px] font-black text-white ring-2 ring-canvas">✓</span>
      </span>
      <span className="leading-tight">
        <span className="block text-[17px] font-extrabold tracking-tight text-ink">
          StudySathi{sub ? <span className="text-gradient"> {sub}</span> : null}
        </span>
        <span className="hidden text-[11px] font-semibold tracking-wide text-zinc-500 sm:block">Assignments • Notes • All India</span>
      </span>
    </span>
  );
}

export function Eyebrow({ children, tone = "amber" }: { children: React.ReactNode; tone?: "amber" | "violet" | "emerald" }) {
  const tones: Record<string, string> = {
    amber: "bg-amber-100/80 text-amber-800 ring-amber-200",
    violet: "bg-violet-100/80 text-violet-800 ring-violet-200",
    emerald: "bg-emerald-100/80 text-emerald-800 ring-emerald-200",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.16em] ring-1 ${tones[tone]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}

export function Stars({ className = "text-amber-400" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-label="5 star rating">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9 4.7 17.6l1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

export function Check({ className = "text-emerald-600" }: { className?: string }) {
  return (
    <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-100 ${className}`}>
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path d="M2 6.5l2.6 2.5L10 3.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M2.5 8h11M9 3.5L13.5 8 9 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WaGlyph({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 2a8 8 0 1 1-4.1 14.9l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 0 1 12 4zm-3.2 4c-.2 0-.5 0-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.2.2 1.9 3 4.7 4 .7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4l-.5-.2-2.1-1c-.3-.1-.5-.2-.7.1l-1 1.2c-.2.2-.4.3-.7.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2-.2-.3 0-.4.1-.6l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6L8.9 6.3c-.1-.2-.3-.3-.7-.3z" />
    </svg>
  );
}

export const AVATAR_BG = [
  "from-amber-400 to-orange-500",
  "from-sky-400 to-blue-600",
  "from-emerald-400 to-teal-600",
  "from-violet-400 to-purple-600",
  "from-rose-400 to-pink-600",
  "from-orange-400 to-red-500",
];
