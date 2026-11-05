import { motion, useScroll, useTransform } from "framer-motion";

/* ------------------------------------------------------------
   Small 3D cubes scattered behind a section, drifting at
   different speeds as you scroll (parallax). Pass `items`:
   { x: "10%", y: "20%", s: 64, label: "Java", speed: 0.3, rot: -12 }
   ------------------------------------------------------------ */

function MiniCube({ s, label, rot = 0 }) {
  const z = s / 2;
  const faces = [
    ["front", `rotateY(0) translateZ(${z}px)`],
    ["right", `rotateY(90deg) translateZ(${z}px)`],
    ["top", `rotateX(90deg) translateZ(${z}px)`],
    ["left", `rotateY(-90deg) translateZ(${z}px)`],
    ["bottom", `rotateX(-90deg) translateZ(${z}px)`],
    ["back", `rotateY(180deg) translateZ(${z}px)`],
  ];
  return (
    <div className="box" style={{ "--s": `${s}px`, transform: `rotateX(-22deg) rotateY(${30 + rot}deg)` }}>
      {faces.map(([n, t]) => (
        <div key={n} className={`f ${n}`} style={{ transform: t }}>
          {n === "front" && label}
        </div>
      ))}
    </div>
  );
}

export default function FloatingCubes({ items }) {
  const { scrollY } = useScroll();
  return (
    <>
      {items.map((it, i) => (
        <Floater key={i} {...it} scrollY={scrollY} />
      ))}
    </>
  );
}

function Floater({ x, y, s, label, speed = 0.25, rot = 0, scrollY, delay = 0 }) {
  const ty = useTransform(scrollY, [0, 2000], [0, -2000 * speed]);
  return (
    <motion.div
      className="fcube"
      style={{ left: x, top: y, y: ty, perspective: 800 }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <div className="float" style={{ animationDelay: `${-i(delay)}s` }}>
        <MiniCube s={s} label={label} rot={rot} />
      </div>
    </motion.div>
  );
}
const i = (d) => d * 7;
