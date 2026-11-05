import DATA from "../data.js";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <span>
          © {new Date().getFullYear()} {DATA.name} · {DATA.location}
        </span>
        <ul>
          <li>
            <a href={DATA.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={DATA.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href={`mailto:${DATA.email}`}>Email</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
