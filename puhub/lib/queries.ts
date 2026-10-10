import { Types } from "mongoose";
import { connectDB } from "@/lib/db";
import { User, Service, Order, Request, ContactMessage } from "@/lib/models";
import { CATEGORIES as CATS } from "@/data/mock";
import { escapeRegex, isId } from "@/lib/http";
import type { ServiceLean, UserLean } from "@/lib/types";

export const labelOf = (slug: string | undefined): string | undefined =>
  CATS.find((c) => c.slug === slug)?.label;
export const slugOf = (label: string | undefined): string | undefined =>
  CATS.find((c) => c.label === label)?.slug;

const PALETTE = ["#F4A261", "#2A9D8F", "#E76F51", "#264653", "#E9C46A", "#8D99AE", "#B56576", "#6D597A"];
const colorFor = (name = ""): string =>
  PALETTE[[...name].reduce((a, c) => a + c.charCodeAt(0), 0) % PALETTE.length];

const TURNAROUND = (d: number): string => (d <= 0 ? "Instant" : d === 1 ? "1 day" : `${d} days`);

interface StatBucket {
  jobs: number;
  sum: number;
  n: number;
}

async function statsFor(ids: Types.ObjectId[]): Promise<Map<string, StatBucket>> {
  const done = await Order.find({ seller: { $in: ids }, status: "completed" })
    .select("seller review")
    .lean();
  const m = new Map<string, StatBucket>();
  for (const o of done) {
    const k = String(o.seller);
    const s = m.get(k) || { jobs: 0, sum: 0, n: 0 };
    s.jobs += 1;
    if (o.review?.rating) {
      s.sum += o.review.rating;
      s.n += 1;
    }
    m.set(k, s);
  }
  return m;
}

export interface SellerCard {
  id: string;
  name: string;
  college?: string;
  course: string;
  tags: string[];
  hand: string;
  sample: string;
  turnaround: string;
  verified: boolean;
  color: string;
  category: string;
  from: number | null;
  unit: string;
  jobs: number;
  rating: number | null;
}

function toCard(u: UserLean, services: ServiceLean[], stats: Map<string, StatBucket>, cat: string): SellerCard {
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
    verified: true,
    color: colorFor(u.name),
    category: cat || slugOf(pool[0]?.category) || "",
    from: cheapest?.price ?? null,
    unit: cheapest?.unit || "job",
    jobs: st?.jobs || 0,
    rating: st?.n ? Math.round((st.sum / st.n) * 10) / 10 : null,
  };
}

export interface ListSellersOpts {
  cat?: string;
  q?: string;
  college?: string;
  limit?: number;
}

export async function listSellers({ cat = "", q = "", college = "", limit = 60 }: ListSellersOpts = {}): Promise<SellerCard[]> {
  await connectDB();
  const filter: Record<string, unknown> = { sellerStatus: "approved" };
  if (college) filter.college = String(college);
  const text = String(q).trim().slice(0, 60);
  if (text) {
    const rx = new RegExp(escapeRegex(text), "i");
    filter.$or = [{ name: rx }, { college: rx }, { "sellerProfile.course": rx }, { "sellerProfile.tags": rx }];
  }
  if (cat && labelOf(cat)) {
    const ids = (
      await Service.find({ category: labelOf(cat), active: true }).select("seller").lean()
    ).map((s) => s.seller);
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

export interface SellerService {
  id: string;
  title: string;
  description: string;
  category: string | undefined;
  price: number;
  unit: string;
}

export interface SellerReview {
  by: string;
  text: string;
  rating?: number;
}

export interface SellerDetail extends SellerCard {
  services: SellerService[];
  reviews: SellerReview[];
  bio?: string;
}

interface PopulatedBuyer {
  name?: string;
  college?: string;
}

export async function getSeller(id: string): Promise<SellerDetail | null> {
  if (!isId(id)) return null;
  await connectDB();
  const u = await User.findOne({ _id: id, sellerStatus: "approved" }).select("-passwordHash -email -phone").lean();
  if (!u) return null;
  const [services, stats] = await Promise.all([
    Service.find({ seller: u._id, active: true }).lean(),
    statsFor([u._id]),
  ]);
  const orders = await Order.find({ seller: u._id, status: "completed", "review.rating": { $gte: 1 } })
    .sort({ updatedAt: -1 })
    .limit(10)
    .populate<{ buyer?: PopulatedBuyer | null }>("buyer", "name college")
    .lean();
  const reviews: SellerReview[] = orders.map((o) => ({
    by: [o.buyer?.name?.split(" ")[0], o.buyer?.college].filter(Boolean).join(", "),
    text: o.review?.text || "",
    rating: o.review?.rating,
  }));
  return {
    ...toCard(u, services, stats, ""),
    services: services.map((s) => ({
      id: String(s._id),
      title: s.title,
      description: s.description,
      category: slugOf(s.category),
      price: s.price,
      unit: s.unit,
    })),
    reviews,
    bio: u.bio,
  };
}

function dueIn(d: unknown): string {
  if (!d) return "flexible";
  const days = Math.ceil((new Date(d as string | number | Date).getTime() - Date.now()) / 86400000);
  return days < 0 ? "overdue" : days === 0 ? "today" : days === 1 ? "1 day" : `${days} days`;
}

const formatDate = (d: Date | string | undefined): string =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";

export interface JobCard {
  id: string;
  title: string;
  where: string;
  budget: string;
  due: string;
  offers: number;
  category: string | undefined;
  posted: string;
}

export async function listOpenJobs(limit = 12): Promise<JobCard[]> {
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
    posted: formatDate(j.createdAt),
  }));
}

export interface JobDetail {
  id: string;
  title: string;
  description: string;
  category: string | undefined;
  college: string;
  course: string;
  subject: string;
  pages: number;
  budget: number;
  due: string;
  deliveryMode: string;
  status: string;
  offers: number;
  posted: string;
}

export async function getJob(id: string): Promise<JobDetail | null> {
  if (!isId(id)) return null;
  await connectDB();
  const j = await Request.findById(id).select("-address -student -offers").lean();
  if (!j) return null;
  const offers = await Request.findById(id).select("offers").lean();
  return {
    id: String(j._id),
    title: j.title,
    description: j.description,
    category: slugOf(j.category),
    college: j.college,
    course: j.course,
    subject: j.subject,
    pages: j.pages,
    budget: j.budget,
    due: dueIn(j.deadline),
    deliveryMode: j.deliveryMode,
    status: j.status,
    offers: offers?.offers?.length || 0,
    posted: formatDate(j.createdAt),
  };
}

export interface MyJobOffer {
  id: string;
  sellerId: string;
  seller: string;
  college: string;
  price: number;
  days: number;
  message: string;
}

export interface MyJob {
  id: string;
  title: string;
  status: string;
  budget: number;
  due: string;
  offers: MyJobOffer[];
}

interface PopulatedSeller {
  _id?: Types.ObjectId;
  name?: string;
  college?: string;
}

interface OfferWithSeller {
  _id: Types.ObjectId;
  price: number;
  days: number;
  message: string;
  seller?: PopulatedSeller | null;
}

export async function myJobs(userId: string | Types.ObjectId): Promise<MyJob[]> {
  await connectDB();
  const jobs = await Request.find({ student: userId })
    .sort({ createdAt: -1 })
    .limit(50)
    .populate<{ offers: OfferWithSeller[] }>("offers.seller", "name college sellerProfile")
    .lean();
  return jobs.map((j) => ({
    id: String(j._id),
    title: j.title,
    status: j.status,
    budget: j.budget,
    due: dueIn(j.deadline),
    offers: (j.offers || []).map((o) => ({
      id: String(o._id),
      sellerId: String(o.seller?._id || ""),
      seller: o.seller?.name || "Seller",
      college: o.seller?.college || "",
      price: o.price,
      days: o.days,
      message: o.message,
    })),
  }));
}

export interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  role: string;
  sellerStatus: string;
  active: boolean;
  joined: string;
}

// Admin page: every account, newest first. passwordHash is never selected.
export async function allUsers(limit = 500): Promise<AdminUserRow[]> {
  await connectDB();
  const users = await User.find({})
    .select("name email phone college isSeller isAdmin isActive sellerStatus createdAt")
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
  return users.map((u) => ({
    id: String(u._id),
    name: u.name,
    email: u.email || "",
    phone: u.phone || "",
    college: u.college || "",
    role: u.isAdmin ? "Admin" : u.isSeller ? "Seller" : "Student",
    sellerStatus: u.sellerStatus,
    active: u.isActive !== false, // docs saved before this field existed count as active
    joined: formatDate((u as { createdAt?: Date }).createdAt),
  }));
}

export interface ContactRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  replied: boolean;
  at: string;
}

// Admin page: support messages, newest first.
export async function contactMessages(limit = 100): Promise<ContactRow[]> {
  await connectDB();
  const msgs = await ContactMessage.find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
  return msgs.map((m) => ({
    id: String(m._id),
    name: m.name,
    email: m.email,
    phone: m.phone || "",
    topic: m.topic,
    message: m.message,
    replied: m.replied === true,
    at: formatDate((m as { createdAt?: Date }).createdAt),
  }));
}

export interface PendingSeller {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  college?: string;
  course: string;
  sample: string;
  services: string[];
}

export async function pendingSellers(): Promise<PendingSeller[]> {
  await connectDB();
  const users = await User.find({ sellerStatus: "pending" })
    .select("name email phone college sellerProfile createdAt")
    .sort({ createdAt: 1 })
    .limit(100)
    .lean();
  const services = await Service.find({ seller: { $in: users.map((u) => u._id) } }).lean();
  return users.map((u) => ({
    id: String(u._id),
    name: u.name,
    email: u.email,
    phone: u.phone,
    college: u.college,
    course: u.sellerProfile?.course || "",
    sample: u.sellerProfile?.sampleText || "",
    services: services
      .filter((s) => String(s.seller) === String(u._id))
      .map((s) => `${s.category} from ₹${s.price}/${s.unit}`),
  }));
}

