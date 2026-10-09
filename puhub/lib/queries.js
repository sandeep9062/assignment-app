import { connectDB } from "@/lib/db";
import { User, Service, Order, Request } from "@/lib/models";
import { CATEGORIES as CATS } from "@/data/mock";
import { escapeRegex, isId } from "@/lib/http";

export const labelOf = (slug) => CATS.find((c) => c.slug === slug)?.label;
export const slugOf = (label) => CATS.find((c) => c.label === label)?.slug;

const PALETTE = ["#F4A261", "#2A9D8F", "#E76F51", "#264653", "#E9C46A", "#8D99AE", "#B56576", "#6D597A"];
const colorFor = (name = "") => PALETTE[[...name].reduce((a, c) => a + c.charCodeAt(0), 0) % PALETTE.length];

const TURNAROUND = (d) => (d <= 0 ? "Instant" : d === 1 ? "1 day" : `${d} days`);

async function statsFor(ids) {
  const done = await Order.find({ seller: { $in: ids }, status: "completed" }).select("seller review").lean();
  const m = new Map();
  for (const o of done) {
    const k = String(o.seller);
    const s = m.get(k) || { jobs: 0, sum: 0, n: 0 };
    s.jobs += 1;
    if (o.review?.rating) { s.sum += o.review.rating; s.n += 1; }
    m.set(k, s);
  }
  return m;
}

function toCard(u, services, stats, cat) {
  const own = services.filter((s) => String(s.seller) === String(u._id));
  const scoped = cat ? own.filter((s) => s.category === labelOf(cat)) : own;
  const pool = scoped.length ? scoped : own;
  const cheapest = pool.slice().sort((a, b) => a.price - b.price)[0];
  const st = stats.get(String(u._id));
  const p = u.sellerProfile || {};
  return {
    id: String(u._id),
    name: u.name,
    college: u.college,
    course: p.course || "",
    tags: p.tags || [],
    hand: p.hand || "kalam",
    sample: p.sampleText || "",
    turnaround: TURNAROUND(p.turnaroundDays ?? 3),
    verified: true, // listed only after we check the sample
    color: colorFor(u.name),
    category: cat || slugOf(pool[0]?.category) || "",
    from: cheapest?.price ?? null,
    unit: cheapest?.unit || "job",
    jobs: st?.jobs || 0,
    rating: st?.n ? Math.round((st.sum / st.n) * 10) / 10 : null, // null = no reviews yet
  };
}

export async function listSellers({ cat = "", q = "", college = "", limit = 60 } = {}) {
  await connectDB();
  const filter = { sellerStatus: "approved" };
  if (college) filter.college = String(college);
  const text = String(q).trim().slice(0, 60);
  if (text) {
    const rx = new RegExp(escapeRegex(text), "i");
    filter.$or = [{ name: rx }, { college: rx }, { "sellerProfile.course": rx }, { "sellerProfile.tags": rx }];
  }
  if (cat && labelOf(cat)) {
    const ids = (await Service.find({ category: labelOf(cat), active: true }).select("seller").lean()).map((s) => s.seller);
    filter._id = { $in: ids };
  }
  const users = await User.find(filter).select("-passwordHash -email -phone").sort({ createdAt: -1 }).limit(limit).lean();
  if (!users.length) return [];
  const ids = users.map((u) => u._id);
  const [services, stats] = await Promise.all([
    Service.find({ seller: { $in: ids }, active: true }).lean(),
    statsFor(ids),
  ]);
  return users.map((u) => toCard(u, services, stats, cat && labelOf(cat) ? cat : ""));
}

export async function getSeller(id) {
  if (!isId(id)) return null;
  await connectDB();
  const u = await User.findOne({ _id: id, sellerStatus: "approved" }).select("-passwordHash -email -phone").lean();
  if (!u) return null;
  const [services, stats] = await Promise.all([Service.find({ seller: u._id, active: true }).lean(), statsFor([u._id])]);
  const reviews = (
    await Order.find({ seller: u._id, status: "completed", "review.rating": { $gte: 1 } })
      .sort({ updatedAt: -1 }).limit(10).populate("buyer", "name college").lean()
  ).map((o) => ({ by: [o.buyer?.name?.split(" ")[0], o.buyer?.college].filter(Boolean).join(", "), text: o.review?.text || "", rating: o.review.rating }));
  return {
    ...toCard(u, services, stats, ""),
    services: services.map((s) => ({ id: String(s._id), title: s.title, description: s.description, category: slugOf(s.category), price: s.price, unit: s.unit })),
    reviews,
    bio: u.bio,
  };
}

function dueIn(d) {
  if (!d) return "flexible";
  const days = Math.ceil((new Date(d) - Date.now()) / 86400000);
  return days < 0 ? "overdue" : days === 0 ? "today" : days === 1 ? "1 day" : `${days} days`;
}

// Public view of a job: never includes address, phone or the student's name.
export async function listOpenJobs(limit = 12) {
  await connectDB();
  const jobs = await Request.find({ status: "open" }).select("-address -student").sort({ createdAt: -1 }).limit(limit).lean();
  return jobs.map((j) => ({
    id: String(j._id),
    title: j.title,
    where: j.college || "Chandigarh",
    budget: j.budget ? `₹${j.budget}` : "Open budget",
    due: dueIn(j.deadline),
    offers: j.offers?.length || 0,
    category: slugOf(j.category),
  }));
}

export async function getJob(id) {
  if (!isId(id)) return null;
  await connectDB();
  const j = await Request.findById(id).select("-address -student -offers").lean();
  if (!j) return null;
  const offers = await Request.findById(id).select("offers").lean();
  return {
    id: String(j._id), title: j.title, description: j.description, category: slugOf(j.category), college: j.college, course: j.course,
    subject: j.subject, pages: j.pages, budget: j.budget, due: dueIn(j.deadline), deliveryMode: j.deliveryMode, status: j.status,
    offers: offers?.offers?.length || 0,
  };
}

// The student's own jobs, including who offered what. Only call with the logged-in user's id.
export async function myJobs(userId) {
  await connectDB();
  const jobs = await Request.find({ student: userId }).sort({ createdAt: -1 }).limit(50)
    .populate("offers.seller", "name college sellerProfile").lean();
  return jobs.map((j) => ({
    id: String(j._id), title: j.title, status: j.status, budget: j.budget, due: dueIn(j.deadline),
    offers: (j.offers || []).map((o) => ({
      id: String(o._id), sellerId: String(o.seller?._id || ""), seller: o.seller?.name || "Seller", college: o.seller?.college || "",
      price: o.price, days: o.days, message: o.message,
    })),
  }));
}

export async function pendingSellers() {
  await connectDB();
  const users = await User.find({ sellerStatus: "pending" }).select("name email phone college sellerProfile createdAt").sort({ createdAt: 1 }).limit(100).lean();
  const services = await Service.find({ seller: { $in: users.map((u) => u._id) } }).lean();
  return users.map((u) => ({
    id: String(u._id), name: u.name, email: u.email, phone: u.phone, college: u.college,
    course: u.sellerProfile?.course || "", sample: u.sellerProfile?.sampleText || "",
    services: services.filter((s) => String(s.seller) === String(u._id)).map((s) => `${s.category} from ₹${s.price}/${s.unit}`),
  }));
}
