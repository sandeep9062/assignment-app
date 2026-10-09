import { waLink } from "../components/site";

export default function ChdTopBar() {
  return (
    <div className="bg-zinc-900 text-white text-[13px]">
      <div className="mx-auto max-w-6xl px-4 py-2 flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 truncate">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="truncate"><strong>Tricity live:</strong> same-day delivery Sec 17 • 34 • PU • Mohali • Panchkula</span>
        </p>
        <a href={waLink("Hi! I need assignment help in Chandigarh. College: ___, Deadline: ___")} className="hidden sm:inline-flex shrink-0 rounded-full bg-emerald-500 px-3 py-1 font-semibold hover:bg-emerald-400">WhatsApp now</a>
      </div>
    </div>
  );
}
