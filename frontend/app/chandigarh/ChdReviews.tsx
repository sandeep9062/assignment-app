import { Stars, Eyebrow, AVATAR_BG } from "../components/ui";

const CHD_REVIEWS = [
  { name: "Simran Kaur", meta: "MCM DAV 36 • B.Com", text: "3 handwritten B.Com assignments, delivered at Sec-36 gate next day. Ma'am couldn't tell it wasn't mine. 74 marks!", i: "S" },
  { name: "Gurpreet Singh", meta: "UIET PU • B.E. CSE", text: "DSA practical file + viva prep in 2 days. Neat diagrams, proper readings. Hostel delivery in Sector 25.", i: "G" },
  { name: "Anjali Thakur", meta: "IGNOU BAG • Sec-9 RC", text: "Full BAG semester assignments, Hindi medium. PDF same night, spiral courier to Mohali. On time.", i: "A" },
  { name: "Rohit Bansal", meta: "Chandigarh Univ • BBA", text: "Project + synopsis approved in first go. Mentor said formatting was perfect.", i: "R" },
  { name: "Harleen Gill", meta: "GMCH 32 • Nursing", text: "Anatomy notes with labelled diagrams — revised whole syllabus in hostel. Saved my finals.", i: "H" },
  { name: "Vansh Sharma", meta: "DAV 10 • BA", text: "Same-day pickup from Sector 17 for urgent Pol-Sci assignment. PDF in 6 hours!", i: "V" },
];

export default function ChdReviews() {
  return (
    <section id="reviews" className="mx-auto max-w-6xl px-4 pt-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow tone="emerald">Tricity reviews</Eyebrow>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-[2.6rem] md:leading-[1.08]">
            Chandigarh students <span className="font-hand text-gradient text-[1.12em]">love us</span>
          </h2>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-[#16131f]/10 bg-white px-4 py-2.5 text-sm font-bold shadow-sm"><Stars /> 4.9 • 2,800+ reviews</div>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CHD_REVIEWS.map((r, idx) => (
          <figure key={r.name} className="card-lift relative overflow-hidden rounded-[22px] border border-[#16131f]/8 bg-white p-5">
            <span className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${AVATAR_BG[idx % AVATAR_BG.length]}`} aria-hidden />
            <Stars />
            <blockquote className="mt-2.5 text-[15px] leading-relaxed text-zinc-700">“{r.text}”</blockquote>
            <figcaption className="mt-4 flex items-center gap-3 border-t border-dashed border-zinc-200 pt-4">
              <span className={`grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br text-sm font-extrabold text-white ${AVATAR_BG[idx % AVATAR_BG.length]}`}>{r.i}</span>
              <span><span className="block text-sm font-bold">{r.name}</span><span className="block text-[12px] font-medium text-zinc-500">{r.meta}</span></span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
