import { BRAND } from "@/data/mock";
import type { MetadataRoute } from "next";
import { listSellers, listOpenJobs } from "@/lib/queries";

const SITE = `https://${BRAND.domain}`;

// Static, always-available routes.
const STATIC: { path: string; priority: number; changeFrequency: "daily" | "hourly" | "weekly" | "monthly" }[] = [
  { path: "/", priority: 1.0, changeFrequency: "daily" },
  { path: "/browse", priority: 0.9, changeFrequency: "daily" },
  { path: "/jobs", priority: 0.8, changeFrequency: "hourly" },
  { path: "/how-it-works", priority: 0.6, changeFrequency: "monthly" },
];

const safe = async <T,>(p: Promise<T>): Promise<T | never[]> => {
  try {
    return await p;
  } catch {
    return [];
  }
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries = STATIC.map((r) => ({
    url: `${SITE}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // Dynamic seller profiles and open job pages. Failures fall back to static only,
  // so a database outage never breaks sitemap generation.
  const [sellers, jobs] = await Promise.all([
    safe(listSellers({ limit: 500 })),
    safe(listOpenJobs(500)),
  ]);

  for (const s of sellers) {
    entries.push({ url: `${SITE}/seller/${s.id}`, lastModified: now, changeFrequency: "weekly", priority: 0.7 });
  }
  for (const j of jobs) {
    entries.push({ url: `${SITE}/jobs/${j.id}`, lastModified: now, changeFrequency: "daily", priority: 0.6 });
  }

  return entries;
}
