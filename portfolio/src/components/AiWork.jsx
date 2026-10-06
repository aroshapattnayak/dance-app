import { Link } from "react-router-dom";
import { aiWork } from "../data/profile.js";
import "./AiWork.css";

export default function AiWork() {
  return (
    <section className="section" id="ai">
      <div className="wrap">
        <div className="section-head">
          <h2>AI product work</h2>
          <p className="measure">
            What I shipped with AI at G2 this year. Each line follows the same shape: what changed, how
            it was measured, and what I did to cause it.
          </p>
        </div>
        <ul className="ai">
          {aiWork.map((w) => (
            <li className="ai__item" key={w.name}>
              <div className="ai__metric">
                <strong>{w.metric}</strong>
                <span>{w.metricLabel}</span>
              </div>
              <div className="ai__text">
                <h3>{w.name}</h3>
                <p>{w.xyz}</p>
                {w.link && (
                  <Link className="link" to={w.link}>
                    Read how Forge works
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
