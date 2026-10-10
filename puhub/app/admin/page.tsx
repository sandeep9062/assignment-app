import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getUser } from "@/lib/auth";
import { pendingSellers, allUsers } from "@/lib/queries";
import ApproveButtons from "@/components/ApproveButtons";
import ActiveToggle from "@/components/ActiveToggle";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

// Small pill showing the account role / seller state.
function Badge({ text, tone }: { text: string; tone: "blue" | "green" | "amber" | "grey" }) {
  const colors = {
    blue: ["rgba(27,42,155,.10)", "var(--blue)"],
    green: ["rgba(42,157,143,.12)", "#1F7A6E"],
    amber: ["rgba(233,196,106,.28)", "#8A6D1F"],
    grey: ["rgba(20,26,51,.07)", "var(--muted)"],
  } as const;
  const [bg, fg] = colors[tone];
  return (
    <span style={{ background: bg, color: fg, borderRadius: 999, fontSize: ".75rem", fontWeight: 600, padding: "2px 9px", whiteSpace: "nowrap" }}>
      {text}
    </span>
  );
}

export default async function Admin() {
  const user = await getUser();
  if (!user?.isAdmin) notFound(); // don't reveal that this page exists
  const [list, users] = await Promise.all([pendingSellers(), allUsers()]);
  return (
    <div className="wrap" style={{ paddingBottom: 30, maxWidth: 980 }}>
      <div className="page-h"><h1>Admin</h1><p className="sub">Review seller applications and keep an eye on accounts.</p></div>

      <h2 style={{ fontFamily: "var(--hand)", fontSize: "1.6rem", margin: "18px 0 10px" }}>
        Seller applications {list.length > 0 && <Badge text={String(list.length)} tone="amber" />}
      </h2>
      {list.length ? list.map((s) => (
        <div key={s.id} className="card" style={{ marginBottom: 12 }}>
          <div className="row" style={{ alignItems: "flex-start", flexWrap: "wrap" }}>
            <div>
              <h3 style={{ margin: 0 }}>{s.name}</h3>
              <p className="note" style={{ margin: "2px 0" }}>{s.course} · {s.college}</p>
              <p className="note" style={{ margin: "2px 0" }}>WhatsApp {s.phone} · {s.email}</p>
              <p style={{ margin: "6px 0 0" }}>{s.services.join(", ")}</p>
              {s.sample && <p className="note" style={{ margin: "4px 0 0" }}>Sample line: {s.sample}</p>}
            </div>
            <ApproveButtons id={s.id} />
          </div>
        </div>
      )) : <div className="card ok"><div className="big">Nothing to review</div><p>New applications show up here.</p></div>}

      <h2 style={{ fontFamily: "var(--hand)", fontSize: "1.6rem", margin: "26px 0 10px" }}>
        All users <Badge text={String(users.length)} tone="blue" />
      </h2>
      <div className="card" style={{ padding: 0, overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".9rem", minWidth: 840 }}>
          <thead>
            <tr>
              {["Name", "Email", "Phone", "College", "Role", "Status", "Active", "Joined"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "12px 14px", borderBottom: "2px solid var(--edge)", whiteSpace: "nowrap", fontSize: ".78rem", textTransform: "uppercase", letterSpacing: ".04em", color: "var(--muted)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--edge)", fontWeight: 600 }}>{u.name}</td>
                <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--edge)" }}>{u.email || <span className="note">—</span>}</td>
                <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--edge)", whiteSpace: "nowrap" }}>{u.phone || <span className="note">—</span>}</td>
                <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--edge)", maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={u.college}>{u.college || <span className="note">—</span>}</td>
                <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--edge)" }}>
                  <Badge text={u.role} tone={u.role === "Admin" ? "blue" : u.role === "Seller" ? "green" : "grey"} />
                </td>
                <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--edge)" }}>
                  {u.sellerStatus === "none" ? <span className="note">—</span> : (
                    <Badge
                      text={u.sellerStatus}
                      tone={u.sellerStatus === "approved" ? "green" : "amber"}
                    />
                  )}
                </td>
                <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--edge)" }}>
                  {u.id === String(user._id) ? <span className="note" title="You cannot deactivate your own account">—</span> : <ActiveToggle id={u.id} active={u.active} />}
                </td>
                <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--edge)", whiteSpace: "nowrap", color: "var(--muted)" }}>{u.joined}</td>
              </tr>
            ))}
            {!users.length && (
              <tr><td colSpan={8} style={{ padding: 18, textAlign: "center", color: "var(--muted)" }}>No users yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
