import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getUser } from "@/lib/auth";
import { pendingSellers } from "@/lib/queries";
import ApproveButtons from "@/components/ApproveButtons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Seller applications",
  robots: { index: false, follow: false },
};

export default async function Admin() {
  const user = await getUser();
  if (!user?.isAdmin) notFound(); // don't reveal that this page exists
  const list = await pendingSellers();
  return (
    <div className="wrap" style={{ paddingBottom: 30, maxWidth: 820 }}>
      <div className="page-h"><h1>Seller applications</h1><p className="sub">Check the handwriting photos on WhatsApp, then approve.</p></div>
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
    </div>
  );
}
