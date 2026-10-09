import { waLink } from "../components/site";

export default function ChdTopBar() {
  return (
    <div className="bg-[#14111f] text-[13px] text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2">
        <p className="flex min-w-0 items-center gap-2.5">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="live-dot absolute inline-flex h-full w-full rounded-full bg-amber-400" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
          </span>
          <span className="truncate text-zinc-300">
            <strong className="font-bold text-white">Tricity live:</strong> same-day delivery Sec 17 • 34 • PU • Mohali • Panchkula
          </span>
        </p>
        <a href={waLink("Hi! I need assignment help in Chandigarh. College: ___, Deadline: ___")} className="btn-shine hidden shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-3.5 py-1.5 text-[12px] font-bold text-white transition hover:brightness-110 sm:inline-flex">WhatsApp now</a>
      </div>
    </div>
  );
}
