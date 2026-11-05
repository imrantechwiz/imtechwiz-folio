import { useEffect, useState } from "react";
import sound from "../lib/sound.js";

/* Bottom-left "Sound: ON · Turn it OFF" pill. */
export default function SoundToggle() {
  const [on, setOn] = useState(sound.enabled);

  useEffect(() => {
    const f = (e) => setOn(e.detail);
    window.addEventListener("sound:change", f);
    return () => window.removeEventListener("sound:change", f);
  }, []);

  return (
    <button className="sound-toggle" onClick={() => sound.toggle()} aria-pressed={on} aria-label={`Sound is ${on ? "on" : "off"}. Click to turn it ${on ? "off" : "on"}.`}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M11 5L6 9H2v6h4l5 4V5z" />
        {on ? (
          <>
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M19 5a9 9 0 0 1 0 14" className="wave" />
          </>
        ) : (
          <path d="M23 9l-6 6M17 9l6 6" />
        )}
      </svg>
      <span className="st-label">
        Sound: <b>{on ? "ON" : "OFF"}</b>
      </span>
      <span className="st-hint">Turn it {on ? "OFF" : "ON"}</span>
    </button>
  );
}
