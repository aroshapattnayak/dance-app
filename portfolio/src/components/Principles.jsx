import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { principles } from "../data/profile.js";
import "./Principles.css";

export default function Principles() {
  const [active, setActive] = useState(0);
  const p = principles[active];

  return (
    <section className="section" id="thinking">
      <div className="wrap">
        <div className="section-head">
          <h2>How I think</h2>
          <p className="measure">
            Five habits that show up in everything I ship. Each one is tied to a real outcome, because
            product sense without evidence is just opinion.
          </p>
        </div>

        <div className="prin">
          <ul className="prin__list" role="tablist" aria-label="Principles">
            {principles.map((item, i) => (
              <li key={item.title}>
                <button
                  role="tab"
                  aria-selected={i === active}
                  className={`prin__tab ${i === active ? "is-active" : ""}`}
                  onClick={() => setActive(i)}
                >
                  <span className="prin__num" aria-hidden="true" />
                  <span>{item.title}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="prin__panel" role="tabpanel">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
              >
                <h3 className="prin__title">{p.title}</h3>
                <p className="prin__body">{p.body}</p>
                <div className="prin__proof">
                  <span className="prin__proof-label">What happened</span>
                  <p>{p.proof}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
