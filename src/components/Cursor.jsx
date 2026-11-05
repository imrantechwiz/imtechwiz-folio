import { useEffect, useRef } from "react";

/* Purple dot cursor that lags slightly behind the pointer and grows over links. */
export default function Cursor() {
  const ref = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.body.classList.add("has-cursor");

    let mx = -100, my = -100, x = -100, y = -100, raf;
    const el = ref.current;
    const move = (e) => {
      mx = e.clientX;
      my = e.clientY;
      el.classList.remove("hidden");
    };
    const loop = () => {
      x += (mx - x) * 0.22;
      y += (my - y) * 0.22;
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    const sel = "a, button, input, textarea, .sticker, .tcard, [data-cursor]";
    const over = (e) => e.target.closest(sel) && el.classList.add("hover");
    const out = (e) => e.target.closest(sel) && el.classList.remove("hover");
    const leave = () => el.classList.add("hidden");

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    document.addEventListener("mouseleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      document.body.classList.remove("has-cursor");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

  return <div className="cursor hidden" ref={ref} aria-hidden="true" />;
}
