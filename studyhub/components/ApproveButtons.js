"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/client";

export default function ApproveButtons({ id }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function set(status) {
    setBusy(true);
    const r = await api(`/api/admin/sellers/${id}`, { status }, "PATCH");
    setBusy(false);
    if (!r.ok) return setError(r.error);
    router.refresh();
  }
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
      <button className="btn sm" disabled={busy} onClick={() => set("approved")}>Approve</button>
      <button className="btn sm alt" disabled={busy} onClick={() => set("rejected")}>Reject</button>
      {error && <span className="note" role="alert">{error}</span>}
    </div>
  );
}
