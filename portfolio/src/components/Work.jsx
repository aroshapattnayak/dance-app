import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import "./Work.css";

const cases = [
  {
    to: "/work/narthana",
    world: "amber",
    name: "Narthana Studio Manager",
    role: "Product owner and builder, side project",
    problem:
      "A dance studio was matching Zelle texts to a spreadsheet by hand, 30 minutes a week, on a laptop, for payments that arrived on a phone.",
    result: "Under five seconds per payment. A second studio of 80 students onboarded in six hours. Zero infrastructure cost.",
    stats: [
      ["30 min → 2 min", "weekly reconciliation"],
      ["144", "students across two studios"],
      ["$0", "monthly infrastructure"],
    ],
  },
  {
    to: "/work/forge",
    world: "ember",
    name: "Forge",
    role: "AI platform work at G2",
    problem:
      "Product specs were queuing behind engineering capacity, and three AI coding tools were used three different ways across the team.",
    result: "A nine-phase agentic workflow with human gates that takes a plan to reviewed pull requests. In daily use across multiple repositories since launch.",
    stats: [
      ["9", "phases from plan to document"],
      ["2", "human gates, plan and validate"],
      ["Daily", "use across multiple repositories"],
    ],
  },
];

export default function Work() {
  const reduce = useReducedMotion();
  return (
    <section className="section" id="work">
      <div className="wrap">
        <div className="section-head">
          <h2>Two things I built, in depth</h2>
          <p className="measure">
            One deep case study is worth more than five shallow ones. Each of these shows the problem,
            the evidence, the options I weighed, the trade-offs I made, and how I measured it.
          </p>
        </div>

        <div className="cases">
          {cases.map((c, i) => (
            <motion.article
              key={c.to}
              className={`case case--${c.world}`}
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 90, damping: 18 }}
            >
              <div className="case__text">
                <span className="case__role">{c.role}</span>
                <h3 className="case__name">{c.name}</h3>
                <p className="case__problem">{c.problem}</p>
                <p className="case__result">{c.result}</p>
                <Link className="btn case__btn" to={c.to}>
                  Read the case study
                </Link>
              </div>
              <ul className="case__stats">
                {c.stats.map(([v, l]) => (
                  <li key={l}>
                    <strong>{v}</strong>
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
