import { profile } from "../data/profile.js";
import "./Contact.css";

export default function Contact() {
  return (
    <section className="section" id="contact">
      <div className="wrap contact">
        <h2 className="contact__title">
          If you read this far, we should probably talk.
        </h2>
        <p className="lede contact__lede">
          I'm open to senior and principal product roles on AI platforms, marketplaces, and the systems
          that make money move. Austin or remote.
        </p>
        <div className="contact__actions">
          <a className="btn" href={`mailto:${profile.email}`}>
            Email me
          </a>
          <a className="btn btn--ghost" href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="btn btn--ghost" href={`${import.meta.env.BASE_URL}${profile.resume}`} download>
            Download résumé
          </a>
        </div>
      </div>
    </section>
  );
}
