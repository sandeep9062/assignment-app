import type { CategorySlug } from "@/lib/types";
import type { HandStyle } from "@/lib/models";

// ← replace with your real WhatsApp number (E.164, no "+"), same placeholder as client/.
export const WHATSAPP_NUMBER = "919876543210";

export const waLink = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

export const BRAND = {
  name: "Likhai",
  tagline: "Likhna humara, chill karna tumhara.",
  sub: "Neat handwriting. Ready files. Delivered across Chandigarh.",
  city: "Chandigarh",
  domain: "puhub.vercel.app",
  // Public contact shown on the footer, /contact page and legal pages.
  // Replace both with your real details before launch.
  email: "support@likhai.in",
  phoneDisplay: "+91 98765 43210",
  hours: "10 am – 8 pm, Monday to Saturday",
};

// Sample content for the design preview. Replace with real data once the backend is connected.
export interface Review { by: string; text: string }

export const REVIEWS: Review[] = [
  {
    by: "Aman, PU B.Com",
    text: "Fair copy was so neat my teacher asked who wrote it. Delivered to my hostel before the deadline.",
  },
  {
    by: "Tanvi, CCET CSE",
    text: "Got my DBMS lab file with outputs and diagrams. Saved me a whole weekend.",
  },
  {
    by: "Gurleen, MCM DAV",
    text: "Loved that I could see the handwriting sample first. No surprises.",
  },
];

export interface CategoryInfo { slug: CategorySlug; label: string; blurb: string; color: string }

export const CATEGORIES: CategoryInfo[] = [
  {
    slug: "fair-copy",
    label: "Fair copy & handwriting",
    blurb: "Neat handwritten copies of notes, assignments and answers.",
    color: "#1B2A9B",
  },
  {
    slug: "practical-files",
    label: "Practical files",
    blurb: "Complete lab files, journals, diagrams and charts.",
    color: "#D93A4A",
  },
  {
    slug: "notes",
    label: "Notes",
    blurb: "Topper-style notes and previous-year papers.",
    color: "#E0A800",
  },
  {
    slug: "project-guidance",
    label: "Project guidance",
    blurb: "Mentoring, ideas and reference material for projects.",
    color: "#12805C",
  },
  {
    slug: "report-editing",
    label: "Report & thesis editing",
    blurb: "Proofreading, formatting and citation help.",
    color: "#1B2A9B",
  },
  {
    slug: "ppt-design",
    label: "PPT & design",
    blurb: "Clean presentations, posters and charts.",
    color: "#D93A4A",
  },
  {
    slug: "typing",
    label: "Typing & formatting",
    blurb: "Typing, Word/PDF formatting and layout.",
    color: "#E0A800",
  },
  {
    slug: "printing",
    label: "Printing & binding",
    blurb: "Printing, spiral/hard binding with delivery.",
    color: "#12805C",
  },
];

export const COLLEGES: string[] = [
  "Panjab University (PU)",
  "PU Regional Centre / Affiliated colleges",
  "Chandigarh University",
  "Chandigarh College of Engineering & Technology",
  "DAV College, Sector 10",
  "GCG / Govt. College, Sector 11",
  "MCM DAV College for Women",
  "Government Polytechnic",
  "Other",
];

// hand: which handwriting style the sample is shown in (see .hw-* in globals.css)
export interface SellerSeed {
  id: number;
  name: string;
  college: string;
  course: string;
  rating: number;
  jobs: number;
  from: number;
  unit: string;
  category: CategorySlug;
  tags: string[];
  turnaround: string;
  verified: boolean;
  color: string;
  hand: HandStyle;
  sample: string;
}

export const SELLERS: SellerSeed[] = [
  {
    id: 1,
    name: "Simran Kaur",
    college: "Panjab University (PU)",
    course: "B.Com",
    rating: 4.9,
    jobs: 132,
    from: 4,
    unit: "page",
    category: "fair-copy",
    tags: ["Fair copy", "Cursive", "Blue/Black ink"],
    turnaround: "2 days",
    verified: true,
    color: "#F4A261",
    hand: "caveat",
    sample:
      "Demand is the quantity of a good that buyers are willing to purchase at a given price.",
  },
  {
    id: 2,
    name: "Arjun Sharma",
    college: "Chandigarh College of Engineering & Technology",
    course: "B.Tech CSE",
    rating: 4.8,
    jobs: 96,
    from: 350,
    unit: "file",
    category: "practical-files",
    tags: ["Practical file", "Diagrams", "Code + output"],
    turnaround: "4 days",
    verified: true,
    color: "#2A9D8F",
    hand: "patrick",
    sample:
      "Aim: To create a table and insert records using SQL. Output attached below.",
  },
  {
    id: 3,
    name: "Riya Mehta",
    college: "DAV College, Sector 10",
    course: "BBA",
    rating: 4.7,
    jobs: 64,
    from: 99,
    unit: "set",
    category: "notes",
    tags: ["Topper notes", "Semester 3", "Marketing"],
    turnaround: "Instant",
    verified: true,
    color: "#E76F51",
    hand: "kalam",
    sample: "The 4 Ps of marketing: Product, Price, Place and Promotion.",
  },
  {
    id: 4,
    name: "Harpreet Singh",
    college: "Panjab University (PU)",
    course: "MCA",
    rating: 4.9,
    jobs: 58,
    from: 600,
    unit: "project",
    category: "project-guidance",
    tags: ["Guidance", "Reference code", "Viva prep"],
    turnaround: "5 days",
    verified: true,
    color: "#264653",
    hand: "patrick",
    sample: "Project plan: define scope, list modules, set weekly milestones.",
  },
  {
    id: 5,
    name: "Nisha Verma",
    college: "MCM DAV College for Women",
    course: "B.Sc Medical",
    rating: 4.8,
    jobs: 81,
    from: 6,
    unit: "page",
    category: "fair-copy",
    tags: ["Neat print-style", "Diagrams", "Biology"],
    turnaround: "3 days",
    verified: false,
    color: "#E9C46A",
    hand: "shadows",
    sample:
      "Photosynthesis takes place in the chloroplasts of green plant cells.",
  },
  {
    id: 6,
    name: "Kunal Bansal",
    college: "Chandigarh University",
    course: "B.Tech ME",
    rating: 4.6,
    jobs: 40,
    from: 150,
    unit: "deck",
    category: "ppt-design",
    tags: ["PPT", "Posters", "Canva"],
    turnaround: "2 days",
    verified: true,
    color: "#8D99AE",
    hand: "kalam",
    sample: "Slide 1: Title, team names and guide. Slide 2: Problem statement.",
  },
  {
    id: 7,
    name: "Preeti Gill",
    college: "Panjab University (PU)",
    course: "M.A English",
    rating: 4.9,
    jobs: 73,
    from: 2,
    unit: "page",
    category: "report-editing",
    tags: ["Proofreading", "APA/MLA", "Formatting"],
    turnaround: "2 days",
    verified: true,
    color: "#B56576",
    hand: "caveat",
    sample:
      "Check citations, fix margins, and keep the same font through the whole report.",
  },
  {
    id: 8,
    name: "Likhai Print Desk",
    college: "Pickup and delivery across Chandigarh",
    course: "Printing partner",
    rating: 4.8,
    jobs: 410,
    from: 1,
    unit: "page",
    category: "printing",
    tags: ["Printing", "Spiral binding", "Doorstep delivery"],
    turnaround: "Same day",
    verified: true,
    color: "#6D597A",
    hand: "shadows",
    sample: "Print, bind and deliver. Spiral or hard cover, your choice.",
  },
];

export interface OpenJobSeed {
  title: string;
  where: string;
  budget: string;
  due: string;
  offers: number;
}

export const OPEN_JOBS: OpenJobSeed[] = [
  {
    title: "Physics practical file, B.Sc Sem 2",
    where: "PU, Sector 14",
    budget: "₹500–700",
    due: "6 days",
    offers: 4,
  },
  {
    title: "Handwritten fair copy, 40 pages",
    where: "DAV College, Sector 10",
    budget: "₹200",
    due: "3 days",
    offers: 7,
  },
  {
    title: "DBMS lab file with outputs",
    where: "CCET, Sector 26",
    budget: "₹400",
    due: "5 days",
    offers: 3,
  },
];

export interface Step {
  n: number;
  title: string;
  text: string;
}

export const STEPS: Step[] = [
  {
    n: 1,
    title: "Post what you need",
    text: "Pick your college, course and subject. Add pages, deadline and budget.",
  },
  {
    n: 2,
    title: "Get offers from students",
    text: "Check handwriting samples, ratings and past work, then pick a seller.",
  },
  {
    n: 3,
    title: "Pay safely",
    text: "Your payment is held until the work is delivered.",
  },
  {
    n: 4,
    title: "Pickup or doorstep delivery",
    text: "Get the finished work, printed and bound if you want, anywhere in Chandigarh.",
  },
];

export interface PromiseInfo {
  title: string;
  text: string;
}

export const PROMISES: PromiseInfo[] = [
  {
    title: "See the handwriting first",
    text: "Every seller shows a sample before you order.",
  },
  {
    title: "Payment held until delivery",
    text: "The seller is paid after you confirm the work.",
  },
  {
    title: "Pickup or doorstep delivery",
    text: "Printed, bound and brought to your hostel or home.",
  },
  { title: "One revision included", text: "Ask for a fix once, free." },
];

export interface Faq {
  q: string;
  a: string;
}

export const FAQ: Faq[] = [
  {
    q: "Is this only for Chandigarh?",
    a: "Yes, we are starting in Chandigarh and nearby areas first so delivery and quality stay fast and reliable.",
  },
  {
    q: "Can I become a seller?",
    a: "Any student with neat handwriting or skills in notes, design or typing can apply. We check your sample before approval.",
  },
  {
    q: "How does payment work?",
    a: "Payment is held by the platform and released to the seller after you confirm delivery.",
  },
  {
    q: "What if I don't like the work?",
    a: "Each order includes one revision round, and you can raise a dispute from the order page.",
  },
  {
    q: "How do I contact you?",
    a: "Chat with us on WhatsApp, email support@likhai.in, or send a message from the contact page. We usually reply the same day.",
  },
];
