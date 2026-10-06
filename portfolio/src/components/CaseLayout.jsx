import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useSpring } from "motion/react";
import "./CaseLayout.css";

/*
  Shared frame for case studies. The chapter list on the left is the
  table of contents for a real sequence (problem -> result), so the
  numbering carries information.
*/
export function CaseLayout({ world, kicker, title, summary, facts, chapters, children }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const { pathname } = useLocation();

  return (
    <article className={`cs cs--${world}`}>
      <motion.div className="cs__progress" style={{ scaleX: progress }} aria-hidden="true" />

      <header className="cs__hero">
        <div className="wrap">
          <Link to="/#work" className="cs__back">
            Back to work
          </Link>
          <p className="cs__kicker">{kicker}</p>
          <h1 className="cs__title">{title}</h1>
          <p className="lede cs__summary">{summary}</p>
          <dl className="cs__facts">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="wrap cs__grid">
        <nav className="cs__toc" aria-label="Chapters">
          <ol>
            {chapters.map((c) => (
              <li key={c.id}>
                <Link to={{ pathname, hash: `#${c.id}` }}>{c.label}</Link>
              </li>
            ))}
          </ol>
        </nav>
        <div className="cs__body">{children}</div>
      </div>
    </article>
  );
}

export function Chapter({ id, title, children }) {
  return (
    <section className="cs__chapter" id={id}>
      <h2 className="cs__h2">{title}</h2>
      <div className="cs__prose">{children}</div>
    </section>
  );
}

export function Tradeoff({ chose, over, because }) {
  return (
    <div className="cs__tradeoff">
      <div className="cs__tradeoff-row">
        <span className="cs__tag cs__tag--chose">Chose</span>
        <strong>{chose}</strong>
      </div>
      <div className="cs__tradeoff-row">
        <span className="cs__tag">Over</span>
        <span>{over}</span>
      </div>
      <p className="cs__tradeoff-why">{because}</p>
    </div>
  );
}

export function Callout({ children, tone = "world" }) {
  return <div className={`cs__callout cs__callout--${tone}`}>{children}</div>;
}

export function Numbers({ items }) {
  return (
    <ul className="cs__numbers">
      {items.map(([v, l]) => (
        <li key={l}>
          <strong>{v}</strong>
          <span>{l}</span>
        </li>
      ))}
    </ul>
  );
}

// numbered=true only when the items are a real sequence.
export function Steps({ items, numbered = false }) {
  const Tag = numbered ? "ol" : "ul";
  return (
    <Tag className={`cs__steps ${numbered ? "" : "cs__steps--plain"}`}>
      {items.map((s, i) => (
        <li key={s.title}>
          <span className="cs__step-num" aria-hidden={!numbered}>
            {numbered ? i + 1 : ""}
          </span>
          <div>
            <strong>{s.title}</strong>
            <p>{s.body}</p>
          </div>
        </li>
      ))}
    </Tag>
  );
}
