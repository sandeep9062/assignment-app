import { NextResponse } from "next/server";
import { z } from "zod";

// Forms send "" for fields left empty. Treat that as "not provided" so optional/default rules apply.
export const blank = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((v) => (v === "" || v === null ? undefined : v), schema);

interface RequestLike {
  headers: { get(name: string): string | null };
  url?: string;
  json(): Promise<unknown>;
}

export const json = (data: unknown, status = 200) => NextResponse.json(data, { status });
export const fail = (message: string, status = 400, extra: Record<string, unknown> = {}) =>
  NextResponse.json({ error: message, ...extra }, { status });

// Reject cross-site form posts. Cookies are SameSite=Lax already; this is a second layer.
export function sameOrigin(req: RequestLike): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true; // non-browser clients (curl, server-to-server)
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

type ReadOk = { data: unknown; error?: undefined };
type ReadErr = { data?: undefined; error: NextResponse };

export async function readJson(req: RequestLike): Promise<ReadOk | ReadErr> {
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
export function parse<T extends z.ZodTypeAny>(
  schema: T,
  input: unknown
): { data: z.infer<T>; error?: undefined } | { data?: undefined; error: NextResponse } {
  const r = schema.safeParse(input);
  if (r.success) return { data: r.data };
  const issue = r.error.issues[0];
  const field = issue.path.join(".") || "request";
  return { error: fail(`${field}: ${issue.message}`, 422) };
}

// In-memory limiter. Good enough for one server process. On serverless hosting it resets per instance,
// so move this to Redis/Upstash before relying on it at scale.
const hits = new Map<string, number[]>();
export function limited(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const list = (hits.get(key) || []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(key, list);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k);
  return list.length > max;
}

export const clientIp = (req: RequestLike): string =>
  (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "local";

export const escapeRegex = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
export const isId = (s: unknown): boolean => /^[0-9a-f]{24}$/i.test(String(s));
