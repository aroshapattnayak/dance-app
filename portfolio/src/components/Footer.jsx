import { profile } from "../data/profile.js";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__row">
        <p className="footer__note">
          Designed and built by {profile.name} with React and Claude Code. Student and parent names in
          the demo are fictional.
        </p>
        <ul className="footer__links">
          <li><a className="link" href={`mailto:${profile.email}`}>Email</a></li>
          <li><a className="link" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
          <li><a className="link" href={profile.github} target="_blank" rel="noreferrer">GitHub</a></li>
        </ul>
      </div>
    </footer>
  );
}
