import DATA from "../data.js";
import { Reveal, Heading, Stagger, Item } from "../components/Reveal.jsx";

export default function Education() {
  return (
    <>
      <header className="container page-head">
        <Reveal>
          <h1 className="display">
            Where it <span className="serif">started</span>
          </h1>
        </Reveal>
      </header>

      <section className="container" style={{ paddingTop: 0 }}>
        <Stagger className="rows" stagger={0.1}>
          {DATA.education.map((e, i) => (
            <Item className={`tcard rowc ${i === 0 ? "lav" : ""}`} key={e.school + e.degree} style={{ padding: 26 }}>
              <span className="n">{e.period.slice(-2)}</span>
              <div>
                <strong style={{ fontSize: "1.2rem" }}>{e.school}</strong>
                <span className="sub">
                  {e.degree} · {e.detail}
                </span>
              </div>
              <span className="right">{e.period}</span>
            </Item>
          ))}
        </Stagger>
      </section>

      <section className="container" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <Heading bold="Quiz" serif="trophies" purple />
          <Reveal delay={0.1}>
            <p className="lede">Before I was breaking software I was breaking quiz buzzers.</p>
          </Reveal>
        </div>
        <Stagger className="rows" stagger={0.07}>
          {DATA.awards.map((a, i) => (
            <Item className="tcard rowc" key={a.title}>
              <span className="n">🏆</span>
              <div>
                <strong>{a.title}</strong>
              </div>
              <span className="right">{a.by}</span>
            </Item>
          ))}
        </Stagger>
      </section>

      <section className="container" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <Heading bold="Published" serif="work" />
        </div>
        <Stagger className="rows">
          {DATA.publications.map((p) => (
            <Item className="tcard rowc lime" key={p.title}>
              <span className="n">📄</span>
              <div>
                <strong>
                  {p.url ? (
                    <a href={p.url} target="_blank" rel="noreferrer">
                      {p.title}
                    </a>
                  ) : (
                    p.title
                  )}
                </strong>
              </div>
              <span className="right" style={{ color: "var(--ink)" }}>
                {p.by}
              </span>
            </Item>
          ))}
        </Stagger>
      </section>
    </>
  );
}
