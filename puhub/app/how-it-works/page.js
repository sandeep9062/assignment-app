import { STEPS, FAQ } from "@/data/mock";
export default function How() {
  return (
    <div className="wrap" style={{ paddingBottom: 30 }}>
      <div className="page-h"><h1>How it works</h1><p className="sub">Simple, safe and local.</p></div>
      <div className="steps">
        {STEPS.map((s) => <div key={s.n} className="step"><div className="n">{s.n}</div><h3>{s.title}</h3><p>{s.text}</p></div>)}
      </div>
      <h2 className="t" style={{ marginTop: 40 }}>FAQ</h2>
      {FAQ.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
    </div>
  );
}
