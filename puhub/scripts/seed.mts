// Loads sample sellers and jobs so the site isn't empty while you build.
//   npm run seed                        add sample data (safe to re-run)
//   npm run seed:reset                  remove sample data only
// Optional: set ADMIN_EMAIL and ADMIN_PASSWORD to create/update an admin account.
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { User, Service, Request } from "../lib/models";
import { SELLERS, CATEGORIES } from "../data/mock";
import type { CategorySlug } from "../lib/types";

const DOMAIN = "@seed.likhai.local";
const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/studyhub";
await mongoose.connect(uri);

const old = await User.find({ email: { $regex: `${DOMAIN.replace(".", "\\.")}$` } }).select("_id").lean();
const oldIds = old.map((u) => u._id);
await Service.deleteMany({ seller: { $in: oldIds } });
await Request.deleteMany({ student: { $in: oldIds } });
await User.deleteMany({ _id: { $in: oldIds } });
if (process.argv.includes("--reset")) {
  console.log(`Removed ${oldIds.length} sample accounts and their data.`);
  await mongoose.disconnect();
  process.exit(0);
}

const unusable = (): Promise<string> => bcrypt.hash(crypto.randomBytes(24).toString("hex"), 10); // nobody can log in as a sample seller
const UNIT: Record<string, string> = { page: "page", file: "file", set: "set", project: "project", deck: "deck" };

for (const s of SELLERS) {
  const cat = CATEGORIES.find((c) => c.slug === s.category);
  if (!cat) throw new Error(`Unknown seller category: ${s.category}`);
  const u = await User.create({
    name: s.name, email: `${s.name.toLowerCase().replace(/\W+/g, ".")}${DOMAIN}`, passwordHash: await unusable(),
    college: s.college, isSeller: true, sellerStatus: "approved",
    sellerProfile: { course: s.course, tags: s.tags, hand: s.hand, sampleText: s.sample, turnaroundDays: s.turnaround === "Instant" ? 0 : s.turnaround === "Same day" ? 0 : parseInt(s.turnaround) || 3 },
  });
  await Service.create({ seller: u._id, title: cat.label, description: cat.blurb, category: cat.label, price: s.from, unit: UNIT[s.unit] || "job" });
}

const student = await User.create({ name: "Sample Student", email: `student${DOMAIN}`, passwordHash: await unusable(), college: "Panjab University (PU)" });
const label = (slug: CategorySlug): string => {
  const c = CATEGORIES.find((x) => x.slug === slug);
  if (!c) throw new Error(`Unknown job category: ${slug}`);
  return c.label;
};
const jobs: { slug: CategorySlug; subject: string; course: string; college: string; budget: number; days: number }[] = [
  { slug: "practical-files", subject: "Physics", course: "B.Sc Sem 2", college: "Panjab University (PU)", budget: 600, days: 6 },
  { slug: "fair-copy", subject: "Economics", course: "B.Com Sem 3", college: "DAV College, Sector 10", budget: 200, days: 3 },
  { slug: "practical-files", subject: "DBMS", course: "B.Tech CSE Sem 4", college: "Chandigarh College of Engineering & Technology", budget: 400, days: 5 },
];
for (const j of jobs) {
  await Request.create({
    student: student._id, title: `${j.subject}: ${label(j.slug)}`, description: `${label(j.slug)} for ${j.course}.`, category: label(j.slug),
    college: j.college, course: j.course, subject: j.subject, budget: j.budget, deadline: new Date(Date.now() + j.days * 86400000),
  });
}

if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
  await User.findOneAndUpdate(
    { email: process.env.ADMIN_EMAIL.toLowerCase() },
    { name: "Admin", passwordHash: await bcrypt.hash(process.env.ADMIN_PASSWORD, 12), isAdmin: true },
    { upsert: true, setDefaultsOnInsert: true }
  );
  console.log("Admin account ready:", process.env.ADMIN_EMAIL);
}
console.log(`Seeded ${SELLERS.length} sellers and ${jobs.length} open jobs.`);
await mongoose.disconnect();
