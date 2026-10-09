import { NextResponse } from "next/server";
import { z } from "zod";

// Forms send "" for fields left empty. Treat that as "not provided" so optional/default rules apply.
export const blank = (schema) => z.preprocess((v) => (v === "" || v === null ? undefined : v), schema);

export const json = (data, status = 200) => NextResponse.json(data, { status });
export const fail = (message, status = 400, extra = {}) => NextResponse.json({ error: message, ...extra }, { status });

// Reject cross-site form posts. Cookies are SameSite=Lax already; this is a second layer.
export function sameOrigin(req) {
  const origin = req.headers.get("origin");
  if (!origin) return true; // non-browser clients (curl, server-to-server)
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function readJson(req) {
  if (!sameOrigin(req)) return { error: fail("Request blocked.", 403) };
  if (!(req.headers.get("content-type") || "").includes("application/json")) {
    return { error: fail("Send JSON.", 415) };
  }
  try {
    return { data: await req.json() };
  } catch {
    return { error: fail("Invalid JSON.", 400) };
  }
}

// Validate with a zod schema. Returns { data } or { error: Response } with the first readable message.
export function parse(schema, input) {
  const r = schema.safeParse(input);
  if (r.success) return { data: r.data };
  const issue = r.error.issues[0];
  const field = issue.path.join(".") || "request";
  return { error: fail(`${field}: ${issue.message}`, 422) };
}

// In-memory limiter. Good enough for one server process. On serverless hosting it resets per instance,
// so move this to Redis/Upstash before relying on it at scale.
const hits = new Map();
export function limited(key, max, windowMs) {
  const now = Date.now();
  const list = (hits.get(key) || []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(key, list);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k);
  return list.length > max;
}

export const clientIp = (req) =>
  (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "local";

export const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
export const isId = (s) => /^[0-9a-f]{24}$/i.test(String(s));
