"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/client";
import { useToast } from "@/components/Toaster";

// On/off switch in the admin users table. Calls the admin API and refreshes the list.
export default function ActiveToggle({ id, active }: { id: string; active: boolean }) {
  const router = useRouter();
  const toast = useToast();
  const [busy, setBusy] = useState(false);
  const [on, setOn] = useState(active);

  async function toggle() {
    setBusy(true);
    const next = !on;
    const r = await api(`/api/admin/users/${id}`, { isActive: next }, "PATCH");
    setBusy(false);
    if (!r.ok) return toast.error(r.error);
    setOn(next);
    toast.success(next ? "Account reactivated." : "Account deactivated. They can no longer log in.");
    router.refresh();
  }

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={on ? "Deactivate account" : "Activate account"}
        disabled={busy}
        onClick={toggle}
        style={{
          position: "relative",
          width: 42,
          height: 24,
          padding: 0,
          borderRadius: 999,
          border: "none",
          cursor: busy ? "wait" : "pointer",
          background: on ? "rgba(42,157,143,.9)" : "rgba(20,26,51,.18)",
          transition: "background .15s",
          flexShrink: 0,
        }}
      >
        <span style={{ position: "absolute", top: 3, left: on ? 21 : 3, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left .15s", boxShadow: "0 1px 3px rgba(20,26,51,.35)" }} />
      </button>
      <span className="note" style={{ whiteSpace: "nowrap" }}>{on ? "Active" : "Inactive"}</span>
    </span>
  );
}