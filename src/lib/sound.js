/* ------------------------------------------------------------
   Tiny synthesised UI sounds (Web Audio, no audio files).
   sound.play("hover" | "click" | "pop" | "drop" | "whoosh" | "on" | "off")
   sound.enabled / sound.toggle() — persisted in localStorage.

   Browsers keep audio muted until the visitor clicks / taps / presses a
   key, so `attachGlobal()` unlocks the context on the first gesture and
   nothing is scheduled while it is still suspended (otherwise every hover
   would queue a note that all fire at once on the first click).
   ------------------------------------------------------------ */

let ctx = null;
let master = null;

const VOLUME = 0.9; // master level, 0–1

function ensure() {
  if (ctx) return ctx;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  ctx = new AC();
  const comp = ctx.createDynamicsCompressor(); // keeps overlapping blips from clipping
  comp.threshold.value = -18;
  comp.ratio.value = 6;
  master = ctx.createGain();
  master.gain.value = VOLUME;
  master.connect(comp).connect(ctx.destination);
  return ctx;
}

/* Try to start the clock. Only succeeds inside a user gesture. */
function unlock() {
  const c = ensure();
  if (c && c.state !== "running") c.resume().catch(() => {});
  return c;
}

/* Returns a running context, or null if the browser still has it muted. */
function ready() {
  const c = unlock();
  return c && c.state === "running" ? c : null;
}

function tone({ type = "sine", from = 440, to = from, dur = 0.08, gain = 0.2, attack = 0.004 }) {
  const c = ready();
  if (!c) return;
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

function noise({ dur = 0.45, gain = 0.3, from = 400, to = 4000 }) {
  const c = ready();
  if (!c) return;
  const t = c.currentTime;
  const buf = c.createBuffer(1, Math.ceil(c.sampleRate * dur), c.sampleRate);
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
  hover: () => tone({ type: "sine", from: 1500, to: 1900, dur: 0.05, gain: 0.09 }),
  click: () => tone({ type: "triangle", from: 560, to: 220, dur: 0.1, gain: 0.32 }),
  pop: () => tone({ type: "sine", from: 260, to: 760, dur: 0.14, gain: 0.35 }),
  drop: () => tone({ type: "sine", from: 640, to: 240, dur: 0.12, gain: 0.3 }),
  whoosh: () => noise({ dur: 0.55, gain: 0.45, from: 300, to: 5000 }),
  on: () => {
    tone({ type: "sine", from: 523, dur: 0.1, gain: 0.28 });
    setTimeout(() => tone({ type: "sine", from: 784, dur: 0.16, gain: 0.28 }), 90);
  },
  off: () => {
    tone({ type: "sine", from: 784, dur: 0.1, gain: 0.28 });
    setTimeout(() => tone({ type: "sine", from: 523, dur: 0.16, gain: 0.28 }), 90);
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
  /* "running" | "suspended" | "none" — handy for debugging in the console. */
  get state() {
    return ctx ? ctx.state : "none";
  },
  toggle() {
    const next = !sound.enabled;
    sound.enabled = next;
    unlock();
    SOUNDS[next ? "on" : "off"]();
    window.dispatchEvent(new CustomEvent("sound:change", { detail: next }));
    return next;
  },
  play(name) {
    if (!sound.enabled) return;
    SOUNDS[name]?.();
  },
  /* Call once (App) — unlocks audio on the first gesture and attaches
     global hover/click sounds to links, buttons, stickers and cards. */
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
    const gesture = () => unlock();
    const opts = { capture: true, passive: true };
    document.addEventListener("mouseover", over);
    document.addEventListener("click", click);
    for (const ev of ["pointerdown", "keydown", "touchstart"]) document.addEventListener(ev, gesture, opts);
    return () => {
      document.removeEventListener("mouseover", over);
      document.removeEventListener("click", click);
      for (const ev of ["pointerdown", "keydown", "touchstart"]) document.removeEventListener(ev, gesture, opts);
    };
  },
};

if (typeof window !== "undefined") window.__sound = sound; // debugging aid: __sound.state, __sound.play("click")

export default sound;
