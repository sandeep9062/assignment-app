const CHD_REVIEWS = [
  { name: "Simran Kaur", meta: "MCM DAV 36 • B.Com", text: "3 handwritten B.Com assignments, delivered at Sec-36 gate next day. Ma'am couldn't tell it wasn't mine. 74 marks!", s: 5, i: "S", bg: "bg-pink-500" },
  { name: "Gurpreet Singh", meta: "UIET PU • B.E. CSE", text: "DSA practical file + viva prep in 2 days. Neat diagrams, proper readings. Hostel delivery in Sector 25.", s: 5, i: "G", bg: "bg-amber-600" },
  { name: "Anjali Thakur", meta: "IGNOU BAG • Sec-9 RC", text: "Full BAG semester assignments, Hindi medium. PDF same night, spiral courier to Mohali. On time.", s: 5, i: "A", bg: "bg-emerald-600" },
  { name: "Rohit Bansal", meta: "Chandigarh Univ • BBA", text: "Project + synopsis approved in first go. Mentor said formatting was perfect.", s: 5, i: "R", bg: "bg-sky-600" },
  { name: "Harleen Gill", meta: "GMCH 32 • Nursing", text: "Anatomy notes with labelled diagrams — revised whole syllabus in hostel. Saved my finals.", s: 5, i: "H", bg: "bg-violet-600" },
  { name: "Vansh Sharma", meta: "DAV 10 • BA", text: "Same-day pickup from Sector 17 for urgent Pol-Sci assignment. PDF in 6 hours!", s: 5, i: "V", bg: "bg-orange-500" },
];

export default function ChdReviews() {
  return (
    <section id="reviews" className="mx-auto max-w-6xl px-4 pt-14">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <p className="text-[12px] font-extrabold tracking-[0.2em] text-amber-600">TRICITY REVIEWS</p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Chandigarh students <span className="font-hand text-emerald-700 text-[1.15em]">love us</span></h2>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-bold"><span className="text-amber-400">★★★★★</span> 4.9 • 2,800+ reviews</div>
      </div>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CHD_REVIEWS.map((r) => (
          <figure key={r.name} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="text-amber-400">★★★★★</div>
            <blockquote className="mt-2 text-[15px] leading-relaxed text-zinc-700">“{r.text}”</blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              <span className={`grid h-10 w-10 place-items-center rounded-full font-extrabold text-white ${r.bg}`}>{r.i}</span>
              <span><span className="block text-sm font-bold">{r.name}</span><span className="block text-[12px] text-zinc-500">{r.meta}</span></span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
