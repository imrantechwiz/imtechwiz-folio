import DATA from "../data.js";
import Icon from "../components/Icon.jsx";
import { Reveal, Stagger, Item } from "../components/Reveal.jsx";

const TONES = ["", "lav", "", "lav", "", "lime"];
const LOGO = Object.fromEntries(DATA.companies.map((c) => [c.name, c.logo]));

export default function Experience() {
  return (
    <>
      <header className="container page-head">
        <Reveal>
          <h1 className="display">
            Four years of <span className="serif">shipping</span>
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="lede">Every role, every stack, every win — from SWE intern to Founding SDET.</p>
        </Reveal>
      </header>

      <section className="container" style={{ paddingTop: 0 }}>
        <Stagger className="rows" stagger={0.1} style={{ gap: 28 }}>
          {DATA.experience.map((job, i) => (
            <Item className={`tcard ${TONES[i]}`} key={job.role + job.period} style={{ padding: 32 }}>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12, alignItems: "flex-start", marginBottom: 14 }}>
                <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  {LOGO[job.company] && (
                    <span className="logo-tile">
                      <img src={LOGO[job.company]} alt={job.company} />
                    </span>
                  )}
                  <div>
                  <h3 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: 6 }}>
                    {job.role} <span className="serif" style={{ fontSize: "1.1em" }}>at {job.company}</span>
                  </h3>
                  <div className="small">
                    {job.period} · <Icon name="pin" size={12} style={{ display: "inline", verticalAlign: -1 }} /> {job.location}
                  </div>
                  </div>
                </div>
                <div className="tags" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {job.stack.map((s) => (
                    <span className="chip" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <p className="summary" style={{ fontSize: "1.08rem", marginBottom: 14, fontWeight: 500 }}>{job.summary}</p>
              <ul style={{ display: "grid", gap: 8 }}>
                {job.points.map((p, k) => (
                  <li key={k} style={{ display: "flex", gap: 12 }}>
                    <span style={{ color: "var(--purple)", fontWeight: 800 }}>→</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </Item>
          ))}
        </Stagger>
      </section>
    </>
  );
}
