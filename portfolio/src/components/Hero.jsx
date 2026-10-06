import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import QuickPayDemo from "./QuickPayDemo.jsx";
import { profile } from "../data/profile.js";
import "./Hero.css";

const lines = ["Thirty minutes", "of chores,", "down to a", "five-second tap."];

export default function Hero() {
  const reduce = useReducedMotion();
  const line = {
    hidden: { y: "110%" },
    show: (i) => ({
      y: 0,
      transition: { delay: 0.1 + i * 0.09, type: "spring", stiffness: 140, damping: 20 },
    }),
  };

  return (
    <section className="hero">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <p className="hero__kicker">
            {profile.title}, {profile.location}
          </p>
          <h1 className="hero__title" aria-label={lines.join(" ")}>
            {lines.map((l, i) => (
              <span className="hero__mask" key={l} aria-hidden="true">
                <motion.span
                  className="hero__line"
                  custom={i}
                  variants={line}
                  initial={reduce ? false : "hidden"}
                  animate="show"
                >
                  {l}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            className="lede hero__lede"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
          >
            {profile.intro}
          </motion.p>
          <motion.div
            className="hero__actions"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Link className="btn" to="/work/narthana">
              Read the studio case study
            </Link>
            <Link className="btn btn--ghost" to="/#thinking">
              How I think
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="hero__demo"
          initial={reduce ? false : { opacity: 0, y: 40, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ delay: 0.35, type: "spring", stiffness: 90, damping: 18 }}
        >
          <QuickPayDemo />
        </motion.div>
      </div>
    </section>
  );
}
