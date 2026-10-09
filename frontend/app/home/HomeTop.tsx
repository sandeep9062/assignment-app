import { waLink } from "../components/site";

export default function HomeTop() {
  return (
    <div className="bg-ink-strong text-white text-[13px]">
      <div className="mx-auto max-w-6xl px-4 py-2 flex items-center justify-between gap-3">
        <p className="flex min-w-0 items-center gap-2.5">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="live-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="truncate text-zinc-300">
            <strong className="font-bold text-white">All-India delivery:</strong> PDF in 24–48 hrs + courier
            <span className="mx-1.5 text-zinc-600">|</span>
            <span className="font-semibold text-amber-300">Chandigarh same-day</span>
          </span>
        </p>
        <a
          href={waLink("Hi StudySathi! I need help with my assignment. Subject: ___, University: ___, Deadline: ___")}
          className="btn-shine hidden shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-3.5 py-1.5 text-[12px] font-bold text-white shadow-[0_4px_14px_-4px_rgb(16_185_129/.6)] transition hover:brightness-110 sm:inline-flex"
        >
          WhatsApp now
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M2.5 8h11M9 3.5L13.5 8 9 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}
