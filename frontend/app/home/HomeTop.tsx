import { waLink } from "../components/site";

export default function HomeTop() {
  return (
    <div className="bg-zinc-900 text-white text-[13px]">
      <div className="mx-auto max-w-6xl px-4 py-2 flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 truncate">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="truncate"><strong>All-India delivery:</strong> PDF in 24–48 hrs + courier • Chandigarh same-day 📍</span>
        </p>
        <a href={waLink("Hi StudySathi! I need help with my assignment. Subject: ___, University: ___, Deadline: ___")} className="hidden sm:inline-flex shrink-0 rounded-full bg-emerald-500 px-3 py-1 font-semibold hover:bg-emerald-400">WhatsApp now</a>
      </div>
    </div>
  );
}
