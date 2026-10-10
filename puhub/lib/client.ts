// Small helper for calling our own API from client components.
export interface ApiResult<T = Record<string, never>> {
  ok: boolean;
  status: number;
  data: T;
  error: string;
}

export async function api<T = Record<string, never>>(
  path: string,
  body?: unknown,
  method = "POST"
): Promise<ApiResult<T>> {
  try {
    const res = await fetch(path, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = (await res.json().catch(() => ({}))) as T & { error?: string };
    return {
      ok: res.ok,
      status: res.status,
      data: data as T,
      error: res.ok ? "" : data.error || "Something went wrong. Try again.",
    };
  } catch {
    return { ok: false, status: 0, data: {} as T, error: "Could not reach the server. Check your connection and try again." };
  }
}

// Only allow same-site relative redirects after login.
export const safeNext = (n: unknown): string =>
  typeof n === "string" && n.startsWith("/") && !n.startsWith("//") ? n : "/";
