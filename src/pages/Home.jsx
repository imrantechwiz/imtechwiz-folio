import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import DATA from "../data.js";
import Cube from "../components/Cube.jsx";
import FloatingCubes from "../components/FloatingCubes.jsx";
import { Reveal, Heading, Stagger, Item, EASE, POP } from "../components/Reveal.jsx";

const CUBES_WORK = [
  { x: "3%", y: "-6%", s: 56, label: "Jv", speed: 0.18, rot: -10, delay: 0.1 },
  { x: "88%", y: "0%", s: 72, label: "Go", speed: 0.3, rot: 14, delay: 0.2 },
  { x: "70%", y: "70%", s: 44, speed: 0.12, rot: 30, delay: 0.3 },
  { x: "12%", y: "80%", s: 60, label: "CI", speed: 0.22, rot: -20, delay: 0.15 },
  { x: "50%", y: "-10%", s: 34, speed: 0.4, rot: 5, delay: 0.25 },
];
const CUBES_FUN = [
  { x: "6%", y: "20%", s: 48, label: "♟", speed: 0.2, rot: -12 },
  { x: "90%", y: "30%", s: 56, label: "k8s", speed: 0.28, rot: 18 },
  { x: "78%", y: "75%", s: 36, speed: 0.15, rot: 40 },
];

export default function Home() {
  const heroRef = useRef(null);

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="container hero" ref={heroRef}>
        <div className="hero-text">
          <h1 className="display">
            {DATA.heroLines.map((line, i) => (
              <span key={i} className="line">
                {line.map((seg, j) => (
                  <motion.span
                    key={j}
                    style={{ display: "inline-block" }}
                    className={seg.serif ? "serif" : ""}
                    initial={{ y: "110%", rotate: 4 }}
                    animate={{ y: 0, rotate: 0 }}
                    transition={{ duration: 0.9, delay: 0.15 + (i * 2 + j) * 0.1, ease: EASE }}
                  >
                    {seg.text}
                    {j < line.length - 1 ? " " : ""}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          <motion.div className="hero-intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.65, ease: EASE }}>
            <div className="avatar">
              {/* Replace with: <img src="/me.jpg" alt={DATA.name} /> after dropping me.jpg into /public */}
              {DATA.initials}
            </div>
            <p>
              Hi! I'm <b>{DATA.name},</b> {DATA.heroIntro}
            </p>
          </motion.div>
        </div>

        <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.7, rotate: -8 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1.1, delay: 0.4, ease: POP }}>
          <div className="hover-hint">
            <span>
              Hover to <span className="serif">play</span>
            </span>
            <svg width="54" height="46" viewBox="0 0 54 46" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M50 4c-8 2-22 14-30 34" strokeDasharray="3 4" />
              <path d="M26 30l-6 9 10 1" />
            </svg>
          </div>
          <Cube followRef={heroRef} />
        </motion.div>
      </section>

      {/* ---------- WORK EXPERIENCE ---------- */}
      <section>
        <FloatingCubes items={CUBES_WORK} />
        <div className="container">
          <div className="section-head">
            <Heading bold="Work" serif="experience" />
            <Reveal delay={0.1}>
              <p className="lede">{DATA.workBlurb}</p>
            </Reveal>
          </div>

          <Stagger className="exp-grid" stagger={0.12}>
            {DATA.companies.map((c) => (
              <Item className="tcard exp-card" key={c.name}>
                <div className="co">
                  <span className="logo-tile">{c.logo ? <img src={c.logo} alt={c.name} /> : c.mark}</span>
                  <div>
                    <h3>{c.name}</h3>
                    <div className="small">{c.sub}</div>
                  </div>
                </div>
                <ul className="roles">
                  {c.roles.map((r) => (
                    <li key={r.title + r.yr}>
                      <div>
                        <strong>{r.title}</strong>
                        <span>{r.note}</span>
                      </div>
                      <span className="yr">{r.yr}</span>
                    </li>
                  ))}
                </ul>
              </Item>
            ))}
          </Stagger>

          <Reveal delay={0.1} className="center" style={{ marginTop: 40 }}>
            <Link to="/experience" className="btn">
              Full timeline →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- WINS ---------- */}
      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <Heading bold="Things I've" serif="shipped" purple />
          </div>
          <Stagger className="wins" stagger={0.12}>
            {DATA.wins.map((w) => (
              <Item className={`tcard win ${w.tone}`} key={w.title}>
                <span className="label">{w.label}</span>
                <div className="num">{w.num}</div>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
                <div className="tags">
                  {w.tags.map((t) => (
                    <span className="chip" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------- WHEN I'M NOT TESTING ---------- */}
      <section>
        <FloatingCubes items={CUBES_FUN} />
        <div className="container center">
          <Heading bold="When I'm not" serif="testing" />
          <Reveal delay={0.1}>
            <p className="lede" style={{ margin: "18px auto 0" }}>
              {DATA.hobbiesBlurb}
            </p>
          </Reveal>
          <Stagger className="hobby-row" stagger={0.08}>
            {DATA.hobbies.map((h) => (
              <Item as="span" className="hobby" key={h.text}>
                <span className="emoji">{h.emoji}</span> {h.text}
              </Item>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
