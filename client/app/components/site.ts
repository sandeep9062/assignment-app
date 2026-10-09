export const WHATSAPP_NUMBER = "919876543210"; // ← replace with your real number

export const waLink = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

export const NAV = [
  { label: "Services", href: "#services" },
  { label: "Notes", href: "#notes" },
  { label: "Pricing", href: "#pricing" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

export const MARQUEE = [
  "IGNOU Solved Assignments",
  "DU SOL Notes",
  "B.Tech Practical Files",
  "UPSC Handwritten Notes",
  "Class 11–12 NCERT Notes",
  "MBA Projects",
  "BCA / MCA Assignments",
  "NEET Biology Notes",
];

export const SERVICES = [
  {
    icon: "pen",
    grad: "from-amber-400 to-orange-500",
    soft: "bg-amber-50",
    badge: "Most ordered",
    title: "Custom Assignments",
    desc: "Handwritten or typed, as per your university format — IGNOU, DU SOL, Amity, LPU, B.Tech, MBA & more.",
    points: ["Plagiarism-free, in your handwriting style", "Cover page, index & diagrams included", "PDF in 24–48 hrs, courier available"],
    price: "from ₹49 / page",
    cta: "Order assignment",
    msg: "Hi StudySathi! I need help with my assignment. Subject: ___, University: ___, Deadline: ___",
  },
  {
    icon: "note",
    grad: "from-violet-400 to-purple-600",
    soft: "bg-violet-50",
    badge: "Bestseller",
    title: "Handwritten Notes",
    desc: "Neat, topper-style notes with diagrams, mnemonics & highlights. PDF + spiral courier.",
    points: ["NCERT, UPSC, NEET, B.Tech, B.Com, Nursing", "Colour-coded headings & mind maps", "Sample pages free before you pay full"],
    price: "from ₹299 / subject",
    cta: "Browse notes",
    msg: "Hi StudySathi! I want handwritten notes. Subject: ___, Class/Course: ___",
  },
  {
    icon: "flask",
    grad: "from-emerald-400 to-teal-600",
    soft: "bg-emerald-50",
    badge: "Practical files",
    title: "Practical Files & Projects",
    desc: "Physics, Chemistry, CS & Engineering practicals with readings, graphs & viva questions.",
    points: ["Accurate readings, graphs & outputs", "Viva Q&A + certificate page", "Major / minor + synopsis support"],
    price: "from ₹999 / file",
    cta: "Get project help",
    msg: "Hi StudySathi! I need a practical file / project. Subject: ___, Details: ___",
  },
  {
    icon: "bolt",
    grad: "from-rose-400 to-pink-600",
    soft: "bg-rose-50",
    badge: "24-hr delivery",
    title: "Exam Crash Kit",
    desc: "Last-minute weapon: important Q&A, previous-year solved papers & one-shot revision sheets.",
    points: ["PYQs solved + expected questions", "One-shot revision charts", "Delivered in 24 hrs for urgent orders"],
    price: "from ₹199 / kit",
    cta: "Get crash kit",
    msg: "Hi StudySathi! I need an exam crash kit urgently. Subject: ___, Exam date: ___",
  },
];

export const STEPS = [
  { n: "01", title: "Share details on WhatsApp", desc: "Send subject, university, pages & deadline. Free quote in 5 minutes.", grad: "from-emerald-400 to-teal-500" },
  { n: "02", title: "Approve sample & price", desc: "1 free sample page in your preferred handwriting style.", grad: "from-violet-400 to-purple-600" },
  { n: "03", title: "We write + send proof", desc: "Track progress with photo proofs, diagrams & cover page.", grad: "from-amber-400 to-orange-500" },
  { n: "04", title: "Pay & get PDF + courier", desc: "UPI / cards. Instant PDF + spiral courier in 3–5 days.", grad: "from-sky-400 to-blue-600" },
];
