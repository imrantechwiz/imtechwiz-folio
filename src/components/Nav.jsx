import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Icon from "./Icon.jsx";
import DATA from "../data.js";

/* Keep in sync with ROUTES in App.jsx */
const LINKS = [
  { to: "/", label: "Home" },
  { to: "/experience", label: "Experience" },
  { to: "/skills", label: "Skills" },
  { to: "/education", label: "Education" },
  { to: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <div className="container">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          {DATA.first.toLowerCase()}
          <span className="dot">.</span>
          <span className="serif">{DATA.last.toLowerCase()}</span>
        </Link>

        <nav className={`nav-links ${open ? "open" : ""}`} aria-label="Primary">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"} className={({ isActive }) => (isActive ? "active" : "")} onClick={() => setOpen(false)}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-right">
          <a className="btn btn-cv" href={DATA.cv} download>
            <Icon name="download" /> <span>Download CV</span>
          </a>
          <button className="burger" onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}>
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
    </header>
  );
}
