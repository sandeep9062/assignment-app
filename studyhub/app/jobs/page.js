import Link from "next/link";
import { listOpenJobs } from "@/lib/queries";

export const dynamic = "force-dynamic";
export const metadata = { title: "Open jobs | Likhai" };

export default async function Jobs() {
  const jobs = await listOpenJobs(50);
  return (
    <div className="wrap" style={{ paddingBottom: 30 }}>
      <div className="page-h"><h1>Open jobs</h1><p className="sub">Work waiting for a seller. Open one to send your offer.</p></div>
      {jobs.length ? (
        <div className="grid">
          {jobs.map((j) => (
            <Link key={j.id} href={`/jobs/${j.id}`} className="job">
              <div><h3>{j.title}</h3><small>{j.where} · due in {j.due} · {j.offers} {j.offers === 1 ? "offer" : "offers"}</small></div>
              <span className="price">{j.budget}</span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="card ok"><div className="big">No open jobs right now</div><p>New requests from students show up here.</p></div>
      )}
    </div>
  );
}
