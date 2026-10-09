// Small helper for calling our own API from client components.
export async function api(path, body, method = "POST") {
  try {
    const res = await fetch(path, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, data, error: res.ok ? "" : data.error || "Something went wrong. Try again." };
  } catch {
    return { ok: false, status: 0, data: {}, error: "Could not reach the server. Check your connection and try again." };
  }
}

// Only allow same-site relative redirects after login.
export const safeNext = (n) => (typeof n === "string" && n.startsWith("/") && !n.startsWith("//") ? n : "/");
