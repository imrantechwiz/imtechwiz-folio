/* ------------------------------------------------------------
   Tiny synthesised UI sounds (Web Audio, no audio files).
   sound.play("hover" | "click" | "pop" | "whoosh" | "on")
   sound.enabled / sound.toggle() — persisted in localStorage.
   ------------------------------------------------------------ */

let ctx = null;
let master = null;

function ensure() {
  if (ctx) return ctx;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  ctx = new AC();
  master = ctx.createGain();
  master.gain.value = 0.6;
  master.connect(ctx.destination);
  return ctx;
}

function tone({ type = "sine", from = 440, to = from, dur = 0.08, gain = 0.05, attack = 0.004 }) {
  const c = ensure();
  if (!c) return;
  if (c.state === "suspended") c.resume();
  const t = c.currentTime;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(from, t);
  if (to !== from) o.frequency.exponentialRampToValueAtTime(to, t + dur);
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(gain, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(master);
  o.start(t);
  o.stop(t + dur + 0.02);
}

function noise({ dur = 0.45, gain = 0.12, from = 400, to = 4000 }) {
  const c = ensure();
  if (!c) return;
  if (c.state === "suspended") c.resume();
  const t = c.currentTime;
  const buf = c.createBuffer(1, c.sampleRate * dur, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  const src = c.createBufferSource();
  src.buffer = buf;
  const f = c.createBiquadFilter();
  f.type = "bandpass";
  f.Q.value = 0.8;
  f.frequency.setValueAtTime(from, t);
  f.frequency.exponentialRampToValueAtTime(to, t + dur);
  const g = c.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(gain, t + 0.05);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(f).connect(g).connect(master);
  src.start(t);
}

const SOUNDS = {
  hover: () => tone({ type: "sine", from: 1400, to: 1700, dur: 0.045, gain: 0.018 }),
  click: () => tone({ type: "triangle", from: 520, to: 220, dur: 0.09, gain: 0.07 }),
  pop: () => tone({ type: "sine", from: 260, to: 720, dur: 0.14, gain: 0.09 }),
  drop: () => tone({ type: "sine", from: 600, to: 240, dur: 0.12, gain: 0.07 }),
  whoosh: () => noise({ dur: 0.55, gain: 0.14, from: 300, to: 5000 }),
  on: () => {
    tone({ type: "sine", from: 523, dur: 0.1, gain: 0.06 });
    setTimeout(() => tone({ type: "sine", from: 784, dur: 0.14, gain: 0.06 }), 90);
  },
  off: () => {
    tone({ type: "sine", from: 784, dur: 0.1, gain: 0.06 });
    setTimeout(() => tone({ type: "sine", from: 523, dur: 0.14, gain: 0.06 }), 90);
  },
};

const sound = {
  get enabled() {
    try {
      return localStorage.getItem("sound") !== "off";
    } catch {
      return true;
    }
  },
  set enabled(v) {
    try {
      localStorage.setItem("sound", v ? "on" : "off");
    } catch {}
  },
  toggle() {
    const next = !sound.enabled;
    sound.enabled = next;
    SOUNDS[next ? "on" : "off"]();
    window.dispatchEvent(new CustomEvent("sound:change", { detail: next }));
    return next;
  },
  play(name) {
    if (!sound.enabled) return;
    SOUNDS[name]?.();
  },
  /* Call once (App) — attaches global hover/click sounds to links & buttons. */
  attachGlobal() {
    const sel = "a, button, .sticker, .tcard";
    let last = null;
    const over = (e) => {
      const el = e.target.closest(sel);
      if (el && el !== last) {
        last = el;
        sound.play("hover");
      }
      if (!el) last = null;
    };
    const click = (e) => e.target.closest("a, button") && sound.play("click");
    document.addEventListener("mouseover", over);
    document.addEventListener("click", click);
    return () => {
      document.removeEventListener("mouseover", over);
      document.removeEventListener("click", click);
    };
  },
};

export default sound;
