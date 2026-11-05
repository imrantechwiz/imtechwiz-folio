import { useRef } from "react";
import { motion } from "framer-motion";
import Icon from "./Icon.jsx";
import DATA from "../data.js";
import { Reveal, POP } from "./Reveal.jsx";
import sound from "../lib/sound.js";

/* ------------------------------------------------------------
   "Looking for an SDET? Let's talk" — with draggable stickers.
   Edit STICKERS to add/remove things to throw around.
   ------------------------------------------------------------ */
/* Positions are % of the playground box; the heading sits at the bottom, so keep y under ~55%. */
const STICKERS = [
  { kind: "open", x: "2%", y: "4%", r: -5 },
  { kind: "app", text: "Jv", x: "4%", y: "26%", r: -8 },
  { kind: "app", text: "Go", x: "26%", y: "34%", r: 6, sm: true },
  { kind: "app", text: "k8s", x: "48%", y: "8%", r: -4, sm: true, hideSm: true },
  { kind: "app", text: "CI", x: "68%", y: "28%", r: 10 },
  { kind: "pill", text: "👋 Drag me!", x: "60%", y: "2%", r: 4 },
  { kind: "bolt", x: "36%", y: "0%", r: 12, hideSm: true },
  { kind: "smile", x: "44%", y: "40%", r: -10 },
  { kind: "flower", x: "86%", y: "0%", r: 0, hideSm: true },
  { kind: "star", x: "22%", y: "4%", r: 15 },
];

function Shape({ kind }) {
  if (kind === "bolt")
    return (
      <svg viewBox="0 0 64 64">
        <path d="M36 4 14 36h16l-4 24 24-34H34z" fill="#8c6ff7" stroke="#3a3a3a" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
    );
  if (kind === "smile")
    return (
      <svg viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="28" fill="#e4d9ff" stroke="#3a3a3a" strokeWidth="2.5" />
        <circle cx="23" cy="26" r="3" fill="#3a3a3a" />
        <circle cx="41" cy="26" r="3" fill="#3a3a3a" />
        <path d="M20 38c4 6 20 6 24 0" fill="none" stroke="#3a3a3a" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  if (kind === "flower")
    return (
      <svg viewBox="0 0 64 64">
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <ellipse key={a} cx="32" cy="14" rx="9" ry="13" transform={`rotate(${a} 32 32)`} fill="#e4d9ff" stroke="#3a3a3a" strokeWidth="2.5" />
        ))}
        <circle cx="32" cy="32" r="9" fill="#8c6ff7" stroke="#3a3a3a" strokeWidth="2.5" />
      </svg>
    );
  if (kind === "star")
    return (
      <svg viewBox="0 0 64 64">
        <path d="M32 4c2 14 10 22 24 24-14 2-22 10-24 24-2-14-10-22-24-24 14-2 22-10 24-24z" fill="#c8f542" stroke="#3a3a3a" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
    );
  return null;
}

export default function ContactPlayground() {
  const box = useRef(null);
  return (
    <section className="contact">
      <div className="container contact-grid">
        <div className="playground" ref={box}>
          {STICKERS.map((s, i) => (
            <motion.div
              key={i}
              className={`sticker ${s.kind === "app" ? `app ${s.sm ? "sm" : ""}` : s.kind === "pill" ? "pill" : s.kind === "open" ? "" : "shape"} ${s.hideSm ? "hide-sm" : ""}`}
              style={{ left: s.x, top: s.y, rotate: s.r }}
              drag
              dragConstraints={box}
              dragElastic={0.15}
              dragMomentum
              onDragStart={() => sound.play("pop")}
              onDragEnd={() => sound.play("drop")}
              whileDrag={{ scale: 1.1, rotate: 0, zIndex: 10 }}
              whileHover={{ scale: 1.06 }}
              initial={{ opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: POP }}
            >
              {s.kind === "open" && <span className="open-pill">OPEN TO WORK</span>}
              {s.kind === "app" && s.text}
              {s.kind === "pill" && s.text}
              {["bolt", "smile", "flower", "star"].includes(s.kind) && <Shape kind={s.kind} />}
            </motion.div>
          ))}
          <Reveal>
            <h2>
              Looking for an
              <br />
              <span className="serif purple">SDET</span> who ships?
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="contact-links">
          <h3>
            Let's <span className="serif">talk</span>
          </h3>
          <a className="clink" href={DATA.linkedin} target="_blank" rel="noreferrer">
            <span className="ico">
              <Icon name="linkedin" />
            </span>
            LinkedIn
          </a>
          <a className="clink" href={`mailto:${DATA.email}`}>
            <span className="ico">
              <Icon name="mail" />
            </span>
            {DATA.email}
          </a>
          <a className="clink" href={DATA.github} target="_blank" rel="noreferrer">
            <span className="ico">
              <Icon name="github" />
            </span>
            GitHub
          </a>
          <a className="clink" href={DATA.cv} download>
            <span className="ico">
              <Icon name="file" />
            </span>
            Download CV
          </a>
        </Reveal>
      </div>
    </section>
  );
}
