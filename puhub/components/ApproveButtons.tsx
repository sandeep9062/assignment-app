"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/client";
import { useToast } from "@/components/Toaster";

export default function ApproveButtons({ id }: { id: string }) {
  const router = useRouter();
  const toast = useToast();
  const [busy, setBusy] = useState(false);
  async function set(status: "approved" | "rejected") {
    setBusy(true);
    const r = await api(`/api/admin/sellers/${id}`, { status }, "PATCH");
    setBusy(false);
    if (!r.ok) return toast.error(r.error);
    toast.success(status === "approved" ? "Seller approved and now live." : "Seller application rejected.");
    router.refresh();
  }
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
      <button className="btn sm" disabled={busy} onClick={() => set("approved")}>Approve</button>
      <button className="btn sm alt" disabled={busy} onClick={() => set("rejected")}>Reject</button>
    </div>
  );
}
