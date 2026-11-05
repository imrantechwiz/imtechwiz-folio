import DATA from "../data.js";
import { Reveal, Heading, Stagger, Item } from "../components/Reveal.jsx";

export default function Skills() {
  return (
    <>
      <header className="container page-head">
        <Reveal>
          <h1 className="display">
            My <span className="serif">toolbox</span>
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="lede">Used in production, not just read about. No percentage bars — ask me about anything here.</p>
        </Reveal>
      </header>

      <section className="container" style={{ paddingTop: 0 }}>
        <Stagger className="skill-grid" stagger={0.1}>
          {DATA.skillGroups.map((g) => (
            <Item className="tcard skill-card" key={g.title}>
              <h3>
                <span className="sq" style={{ background: g.color }} /> {g.title}
              </h3>
              <div className="chips">
                {g.skills.map((s) => (
                  <span className="chip" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </Item>
          ))}
        </Stagger>
      </section>

      <section className="container" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <Heading bold="Certifications &" serif="honours" />
        </div>
        <Stagger className="rows" stagger={0.07}>
          {DATA.certifications.map((c, i) => (
            <Item className="tcard rowc" key={c.title}>
              <span className="n">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <strong>{c.title}</strong>
              </div>
              <span className="right">{c.by}</span>
            </Item>
          ))}
        </Stagger>
      </section>

      <section className="container" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <Heading bold="Languages I" serif="speak" />
        </div>
        <Stagger className="rows" stagger={0.07}>
          {DATA.languages.map((l) => (
            <Item className="tcard rowc lav" key={l.name}>
              <span className="n">{l.name.slice(0, 2).toUpperCase()}</span>
              <div>
                <strong>{l.name}</strong>
              </div>
              <span className="right">{l.level}</span>
            </Item>
          ))}
        </Stagger>
      </section>
    </>
  );
}
