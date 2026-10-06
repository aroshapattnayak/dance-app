import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { profile } from "../data/profile.js";
import "./Nav.css";

const links = [
  { to: "/#work", label: "Work" },
  { to: "/#thinking", label: "How I think" },
  { to: "/#experience", label: "Experience" },
  { to: "/#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="wrap nav__bar">
        <Link to="/" className="nav__name" aria-label="Home">
          <span className="nav__mark" aria-hidden="true">A</span>
          <span>{profile.name}</span>
        </Link>

        <nav className={`nav__links ${open ? "is-open" : ""}`} aria-label="Primary">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="nav__link" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <a className="btn btn--sm nav__cta" href={`${import.meta.env.BASE_URL}${profile.resume}`} download>
            Download résumé
          </a>
        </nav>

        <button
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav__toggle-line" />
          <span className="nav__toggle-line" />
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>
    </header>
  );
}
