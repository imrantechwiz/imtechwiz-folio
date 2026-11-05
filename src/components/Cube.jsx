import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

/* ------------------------------------------------------------
   CSS-3D Rubik's cube — 27 individual cubelets, rounded, with the
   purple core showing through the gaps. The top layer twists 90°
   every TWIST_MS; one lime corner has popped out and floats; a
   purple ball orbits nearby. Whole thing follows the pointer over
   `followRef`, and idles with a slow tumble otherwise.
   Size: --cube in CSS (.cube-scene).
   ------------------------------------------------------------ */

const TWIST_MS = 2600;
const FACES = ["front", "back", "right", "left", "top", "bottom"];

/* which faces of a cubelet are on the outside of the big cube */
const isOuter = (f, x, y, z) =>
  (f === "front" && z === 2) || (f === "back" && z === 0) || (f === "right" && x === 2) || (f === "left" && x === 0) || (f === "top" && y === 0) || (f === "bottom" && y === 2);

function Cubelet({ x, y, z, tone = "", style }) {
  return (
    <div className={`cubelet ${tone}`} style={{ "--x": x - 1, "--y": y - 1, "--z": z - 1, ...style }}>
      {FACES.map((f) => (
        <span key={f} className={`cf ${f} ${isOuter(f, x, y, z) ? "outer" : "inner"}`} />
      ))}
    </div>
  );
}

export default function Cube({ followRef }) {
  const rx = useMotionValue(-22);
  const ry = useMotionValue(32);
  const sx = useSpring(rx, { stiffness: 55, damping: 14, mass: 0.9 });
  const sy = useSpring(ry, { stiffness: 55, damping: 14, mass: 0.9 });
  const transform = useMotionTemplate`rotateX(${sx}deg) rotateY(${sy}deg)`;
  const hovering = useRef(false);
  const [twist, setTwist] = useState(0);

  /* top layer twist */
  useEffect(() => {
    const id = setInterval(() => setTwist((t) => t + 90), TWIST_MS);
    return () => clearInterval(id);
  }, []);

  /* idle tumble + pointer follow */
  useEffect(() => {
    const area = followRef?.current || document.body;
    let raf;
    let t = 0;
    const idle = () => {
      if (!hovering.current) {
        t += 0.0035;
        rx.set(-22 + Math.sin(t) * 8);
        ry.set(32 + t * 18);
      }
      raf = requestAnimationFrame(idle);
    };
    idle();
    const move = (e) => {
      const r = area.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      hovering.current = true;
      rx.set(-22 - py * 60);
      ry.set(32 + px * 80);
    };
    const leave = () => (hovering.current = false);
    area.addEventListener("mousemove", move);
    area.addEventListener("mouseleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      area.removeEventListener("mousemove", move);
      area.removeEventListener("mouseleave", leave);
    };
  }, [followRef, rx, ry]);

  const layers = [1, 2]; // middle + bottom are static
  const popped = { x: 0, y: 0, z: 2 }; // the lime corner, lives outside the top layer

  return (
    <div className="cube-scene" data-cursor>
      <motion.div className="rubik" style={{ transform }}>
        {/* top layer — twists */}
        <motion.div className="layer" animate={{ rotateY: twist }} transition={{ type: "spring", stiffness: 70, damping: 14 }}>
          {[0, 1, 2].flatMap((z) =>
            [0, 1, 2].map((x) => (x === popped.x && z === popped.z ? null : <Cubelet key={`0${x}${z}`} x={x} y={0} z={z} />))
          )}
        </motion.div>

        {/* static layers */}
        {layers.map((y) => (
          <div className="layer" key={y}>
            {[0, 1, 2].flatMap((z) => [0, 1, 2].map((x) => <Cubelet key={`${y}${x}${z}`} x={x} y={y} z={z} />))}
          </div>
        ))}

        {/* popped lime corner + purple ball */}
        <div className="popped">
          <Cubelet x={popped.x} y={popped.y} z={popped.z} tone="lime" />
        </div>
        <div className="ball" />
      </motion.div>
    </div>
  );
}
