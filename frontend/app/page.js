import Link from "next/link";
import { BRAND, CATEGORIES, SELLERS, STEPS, OPEN_JOBS, PROMISES } from "@/data/mock";
import SellerCard from "@/components/SellerCard";

export default function Home() {
  return (
    <>
      <div className="wrap hero">
        <div>
          <h1>
            <span>Likhna humara,</span>
            <span>chill karna tumhara.</span>
          </h1>
          <p className="lead">
            Find students in {BRAND.city} who write fair copies, make practical files, share notes and design
            presentations. Pick by handwriting sample, pay safely, get it at your door.
          </p>
          <div className="cta">
            <Link href="/post-job" className="btn">Post a job</Link>
            <Link href="/browse" className="btn alt">Browse sellers</Link>
          </div>
          <form className="search" action="/browse" role="search">
            <input name="q" aria-label="Search sellers" placeholder="Try: physics practical file, PU B.Com notes" />
            <button className="btn sm" type="submit">Search</button>
          </form>
        </div>

        <div className="notebook" aria-label="Sample of a handwritten practical file page">
          <div className="holes" aria-hidden="true"><i /><i /><i /></div>
          <span className="l">Practical File</span>
          <span className="l">Subject: Physics</span>
          <span className="l"><span className="mark">Experiment 1</span></span>
          <span className="l">To find the focal length</span>
          <span className="l">of a convex lens.</span>
          <div className="by">Sample by Simran, PU B.Com. Every seller shows a page like this.</div>
        </div>
      </div>

      <div className="wrap">
        <div className="promises">
          {PROMISES.map((p) => (
            <div key={p.title} className="promise"><h3>{p.title}</h3><p>{p.text}</p></div>
          ))}
        </div>
      </div>

      <section className="s wrap">
        <h2 className="t">What do you need?</h2>
        <p className="sub">What students ask for every semester, in one place.</p>
        <div className="index">
          {CATEGORIES.map((c) => (
            <Link key={c.slug} href={`/browse?cat=${c.slug}`} style={{ "--tab": c.color }}>
              <h3>{c.label}</h3>
              <p>{c.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="s wrap">
        <h2 className="t">Sellers near you</h2>
        <p className="sub">Handwriting samples, ratings and past work are visible before you order. Profiles below are samples for this preview.</p>
        <div className="grid g4">
          {SELLERS.slice(0, 4).map((s) => <SellerCard key={s.id} s={s} />)}
        </div>
        <p style={{ marginTop: 18 }}><Link href="/browse" className="btn alt">See all sellers</Link></p>
      </section>

      <section className="s wrap">
        <h2 className="t">How it works</h2>
        <p className="sub">Four steps, from posting a job to holding the finished file.</p>
        <div className="steps">
          {STEPS.map((s) => (
            <div key={s.n} className="step">
              <div className="n">{s.n}</div><h3>{s.title}</h3><p>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="s wrap">
        <h2 className="t">Open requests</h2>
        <p className="sub">Sellers, this is work waiting for you.</p>
        <div className="grid">
          {OPEN_JOBS.map((j) => (
            <div key={j.title} className="job">
              <div><h3>{j.title}</h3><small>{j.where} · due in {j.due} · {j.offers} offers</small></div>
              <div className="row" style={{ gap: 14 }}><span className="price">{j.budget}</span><Link href="/become-seller" className="btn sm">Send offer</Link></div>
            </div>
          ))}
        </div>
      </section>

      <section className="s wrap">
        <div className="band">
          <div><h2>Good handwriting? Earn from it.</h2><p>Join as a seller, upload your sample and start getting orders from students in {BRAND.city}.</p></div>
          <Link href="/become-seller" className="btn hl">Become a seller</Link>
        </div>
      </section>
    </>
  );
}
