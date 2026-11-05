import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/* Counts up to `value` once visible. */
export default function Counter({ value, prefix = "", suffix = "", duration = 1400 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start;
    const step = (t) => {
      start ??= t;
      const p = Math.min((t - start) / duration, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {n}
      {suffix && <sup>{suffix}</sup>}
    </span>
  );
}
