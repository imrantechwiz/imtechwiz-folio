import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import sound from "../lib/sound.js";

/* ------------------------------------------------------------
   Intro overlay: "0%" counter → tile grid with "CLICK TO ENTER"
   → tiles fly away. Shown once per browser session.
   TILE = tile size in px. Skipped for bots / reduced motion.
   ------------------------------------------------------------ */
const TILE = 128;

export default function Intro({ onEnter }) {
  const [phase, setPhase] = useState(() => {
    try {
      if (navigator.webdriver || sessionStorage.getItem("entered") === "1") return "done";
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "done";
    } catch {}
    return "count";
  });
  const [n, setN] = useState(0);
  const [dims, setDims] = useState({ cols: 1, rows: 1 });

  // tell App immediately if we're skipping
  useEffect(() => {
    if (phase === "done") onEnter?.();
  }, [phase, onEnter]);

  // 0 → 100 counter
  useEffect(() => {
    if (phase !== "count") return;
    let start;
    let raf;
    const dur = 1300;
    const step = (t) => {
      start ??= t;
      const p = Math.min((t - start) / dur, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(step);
      else setTimeout(() => setPhase("enter"), 250);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  // grid size for the tile wall
  useEffect(() => {
    const f = () => setDims({ cols: Math.ceil(window.innerWidth / TILE), rows: Math.ceil(window.innerHeight / TILE) });
    f();
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);

  const tiles = useMemo(() => {
    const { cols, rows } = dims;
    const cc = Math.floor(cols / 2);
    const cr = Math.floor(rows / 2);
    const list = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const d = Math.hypot(c - cc, r - cr); // distance from centre → stagger
        list.push({ id: `${r}-${c}`, c, r, d, center: c === cc && r === cr, ry: (c - cc) * 3.5, rx: (cr - r) * 2.5 });
      }
    }
    return list;
  }, [dims]);

  const enter = () => {
    try {
      sessionStorage.setItem("entered", "1");
    } catch {}
    sound.play("whoosh");
    setPhase("leaving");
    setTimeout(() => {
      setPhase("done");
    }, 900);
  };

  if (phase === "done") return null;

  return (
    <div className="intro" aria-hidden={phase !== "enter"}>
      <AnimatePresence>
        {phase === "count" && (
          <motion.div className="intro-count" key="count" exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.35 }}>
            {n}
            <span className="serif">%</span>
          </motion.div>
        )}
      </AnimatePresence>

      {(phase === "enter" || phase === "leaving") && (
        <div
          className="tiles"
          style={{ gridTemplateColumns: `repeat(${dims.cols}, 1fr)`, gridTemplateRows: `repeat(${dims.rows}, 1fr)` }}
        >
          {tiles.map((t) => (
            <motion.div
              key={t.id}
              className={`tile ${t.center ? "center" : ""}`}
              initial={{ opacity: 0, scale: 0.6, rotateY: t.ry, rotateX: t.rx }}
              animate={
                phase === "leaving"
                  ? { opacity: 0, scale: 0.2, rotateY: t.ry * 6, rotateX: t.rx * 6, transition: { duration: 0.6, delay: t.d * 0.04, ease: [0.4, 0, 1, 1] } }
                  : { opacity: 1, scale: 1, rotateY: t.ry, rotateX: t.rx, transition: { duration: 0.5, delay: t.d * 0.035, ease: [0.22, 1, 0.36, 1] } }
              }
              onClick={t.center ? enter : undefined}
              role={t.center ? "button" : undefined}
              tabIndex={t.center ? 0 : undefined}
              onKeyDown={t.center ? (e) => (e.key === "Enter" || e.key === " ") && enter() : undefined}
            >
              {t.center && (
                <>
                  CLICK
                  <br />
                  TO
                  <br />
                  ENTER
                </>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
