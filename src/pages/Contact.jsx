import { useState } from "react";
import DATA from "../data.js";
import Icon from "../components/Icon.jsx";
import ContactPlayground from "../components/ContactPlayground.jsx";
import { Reveal } from "../components/Reveal.jsx";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  /* Opens the visitor's mail client pre-filled. Swap for a Formspree / Web3Forms POST to store messages. */
  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Hello from ${form.name || "your website"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`);
    window.location.href = `mailto:${DATA.email}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <header className="container page-head">
        <Reveal>
          <h1 className="display">
            Say <span className="serif">hello</span>
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="lede">A fintech platform that needs a test strategy, a pipeline that keeps breaking, or a game of chess — my inbox is open.</p>
        </Reveal>
      </header>

      <section className="container" style={{ paddingTop: 0, maxWidth: 720 }}>
        <Reveal delay={0.2}>
          <form className="form" onSubmit={submit}>
            <div className="field">
              <label htmlFor="name">Your name</label>
              <input id="name" value={form.name} onChange={set("name")} required placeholder="Ada Lovelace" />
            </div>
            <div className="field">
              <label htmlFor="email">Your email</label>
              <input id="email" type="email" value={form.email} onChange={set("email")} required placeholder="ada@example.com" />
            </div>
            <div className="field">
              <label htmlFor="message">What's on your mind?</label>
              <textarea id="message" rows="5" value={form.message} onChange={set("message")} required placeholder="We're building…" />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap", marginTop: 8 }}>
              <button type="submit" className="btn btn-purple">
                Send <Icon name="send" />
              </button>
              <span className="small">Opens your mail app — nothing is stored here.</span>
            </div>
          </form>
        </Reveal>
      </section>

      <ContactPlayground />
    </>
  );
}
