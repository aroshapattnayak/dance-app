import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { experience, education, skills } from "../data/profile.js";
import "./Experience.css";

export default function Experience() {
  const [open, setOpen] = useState(0);

  return (
    <section className="section" id="experience">
      <div className="wrap">
        <div className="section-head">
          <h2>Experience</h2>
          <p className="measure">
            Ten years, five companies, two continents. Open any role for the outcomes, each written as
            what changed, how it was measured, and what I did.
          </p>
        </div>

        <ol className="xp">
          {experience.map((job, i) => {
            const isOpen = open === i;
            return (
              <li key={job.company} className={`xp__item ${isOpen ? "is-open" : ""}`}>
                <button
                  className="xp__head"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span className="xp__period">{job.period}</span>
                  <span className="xp__title">
                    <strong>{job.company}</strong>
                    <span>{job.role}</span>
                  </span>
                  <span className="xp__chev" aria-hidden="true" />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="xp__body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <ul className="xp__bullets">
                        {job.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ol>

        <div className="xp__foot">
          <div>
            <h3 className="xp__foot-title">Education</h3>
            <ul className="xp__edu">
              {education.map((e) => (
                <li key={e.school}>
                  <strong>{e.degree}</strong>
                  <span>
                    {e.school}, {e.period}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="xp__foot-title">Skills</h3>
            {Object.entries(skills).map(([group, list]) => (
              <div className="xp__skill" key={group}>
                <span className="xp__skill-group">{group}</span>
                <div className="xp__pills">
                  {list.map((s) => (
                    <span className="pill" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
