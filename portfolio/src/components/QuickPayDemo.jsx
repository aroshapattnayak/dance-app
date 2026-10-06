import { useEffect, useReducer, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import "./QuickPayDemo.css";

/*
  A self-playing replay of the five-second workflow the Narthana app was
  built around: a Zelle text arrives, the owner taps Quick Pay, types the
  parent's name, both siblings appear, one save records both payments.

  Scenes:
  0 notification   1 dashboard + tap   2 sheet opens   3 typing
  4 results + select   5 saved   6 dashboard updated   -> loop
*/

const SCENE_MS = [1500, 1300, 700, 1400, 1500, 1100, 2600];
const QUERY = "Nalini";

const initial = { scene: 0, typed: 0, paid: 12, pending: 50, elapsed: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "next": {
      const scene = (state.scene + 1) % SCENE_MS.length;
      return {
        ...state,
        scene,
        typed: scene === 3 ? 0 : state.typed,
        paid: scene === 6 ? 14 : scene === 0 ? 12 : state.paid,
        pending: scene === 6 ? 48 : scene === 0 ? 50 : state.pending,
      };
    }
    case "type":
      return { ...state, typed: Math.min(QUERY.length, state.typed + 1) };
    default:
      return state;
  }
}

export default function QuickPayDemo() {
  const reduce = useReducedMotion();
  const [state, dispatch] = useReducer(reducer, reduce ? { ...initial, scene: 4, typed: QUERY.length } : initial);
  const [paused, setPaused] = useState(false);
  const { scene, typed, paid, pending } = state;

  // Scene clock
  useEffect(() => {
    if (reduce || paused) return;
    const t = setTimeout(() => dispatch({ type: "next" }), SCENE_MS[scene]);
    return () => clearTimeout(t);
  }, [scene, paused, reduce]);

  // Typing effect during scene 3
  useEffect(() => {
    if (scene !== 3 || reduce || paused) return;
    if (typed >= QUERY.length) return;
    const t = setTimeout(() => dispatch({ type: "type" }), 150);
    return () => clearTimeout(t);
  }, [scene, typed, reduce, paused]);

  const showSheet = scene >= 2 && scene <= 5;
  const showResults = scene >= 4 && scene <= 5;
  const selected = scene >= 4;
  const query = scene >= 3 ? QUERY.slice(0, typed) : "";
  const collected = 1485 + (scene === 6 ? 240 : 0);
  const pct = Math.round((collected / 6555) * 100);

  return (
    <div
      className="demo"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="img"
      aria-label="Animated demo: a Zelle text arrives, the owner taps Quick Pay, searches the parent's name, both siblings appear, and one tap records both payments."
    >
      <div className="demo__phone">
        <div className="demo__notch" />

        {/* App dashboard (always underneath) */}
        <div className={`demo__screen ${showSheet ? "is-dimmed" : ""}`}>
          <div className="demo__appbar">
            <span className="demo__brand">Narthana</span>
            <span className="demo__month">October</span>
          </div>

          <div className="demo__stats">
            <Stat label="Paid" value={paid} tone="good" bump={scene === 6} />
            <Stat label="Pending" value={pending} tone="warn" bump={scene === 6} />
          </div>

          <div className="demo__bar">
            <div className="demo__bar-head">
              <span>Collected</span>
              <span>{pct}%</span>
            </div>
            <div className="demo__track">
              <motion.div
                className="demo__fill"
                animate={{ width: `${pct}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
              />
            </div>
          </div>

          <div className="demo__list">
            <Row name="Priya S." amt="$150" state="paid" />
            <Row name="Aanya B." amt="$120" state={scene === 6 ? "paid" : "due"} />
            <Row name="Riya B." amt="$120" state={scene === 6 ? "paid" : "due"} />
            <Row name="Kabir M." amt="$75" state="due" />
          </div>

          <motion.button
            className="demo__fab"
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            animate={scene === 1 ? { scale: [1, 0.86, 1.08, 1] } : { scale: 1 }}
            transition={{ duration: 0.5, times: [0, 0.3, 0.6, 1] }}
          >
            +
          </motion.button>

          {scene === 1 && <TapRipple />}
        </div>

        {/* Zelle notification */}
        <AnimatePresence>
          {scene === 0 && (
            <motion.div
              className="demo__notif"
              initial={{ y: -80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              <span className="demo__notif-icon">Z</span>
              <div>
                <strong>Zelle</strong>
                <span>Nalini B. sent you $240.00</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Pay sheet */}
        <AnimatePresence>
          {showSheet && (
            <motion.div
              className="demo__sheet"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
            >
              <div className="demo__grab" />
              <h4>Quick Pay</h4>
              <div className={`demo__input ${scene === 3 ? "is-typing" : ""}`}>
                {query || <span className="demo__placeholder">Parent or student name</span>}
                {scene === 3 && <span className="demo__caret" />}
              </div>

              <AnimatePresence>
                {showResults && (
                  <motion.div
                    className="demo__results"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="demo__hint">2 students for Nalini B.</div>
                    <Pick name="Aanya B." fee="$120" on={selected} delay={0.05} />
                    <Pick name="Riya B." fee="$120" on={selected} delay={0.15} />
                    <div className="demo__meta">
                      <span>Zelle</span>
                      <span>Today</span>
                      <span className="demo__total">$240</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                className="demo__save"
                animate={scene === 5 ? { scale: [1, 0.94, 1], backgroundColor: "#2a7a3b" } : { scale: 1 }}
                transition={{ duration: 0.35 }}
              >
                {scene === 5 ? "Saved" : "Save payment"}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sync toast */}
        <AnimatePresence>
          {scene === 6 && (
            <motion.div
              className="demo__toast"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              Synced to laptop · 4.8s
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="demo__caption">
        <span className="demo__dot" aria-hidden="true" />
        {paused ? "Paused. Move away to resume." : "Replaying the five-second workflow"}
      </div>
    </div>
  );
}

function Stat({ label, value, tone, bump }) {
  return (
    <div className={`demo__stat demo__stat--${tone}`}>
      <span>{label}</span>
      <motion.strong
        key={value}
        initial={bump ? { scale: 1.3, color: "#2a7a3b" } : false}
        animate={{ scale: 1, color: "#14142b" }}
        transition={{ type: "spring", stiffness: 300, damping: 14 }}
      >
        {value}
      </motion.strong>
    </div>
  );
}

function Row({ name, amt, state }) {
  return (
    <div className="demo__row">
      <span className="demo__avatar">{name[0]}</span>
      <span className="demo__row-name">{name}</span>
      <motion.span
        className={`demo__badge demo__badge--${state}`}
        key={state}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
      >
        {state === "paid" ? amt : "due"}
      </motion.span>
    </div>
  );
}

function Pick({ name, fee, on, delay }) {
  return (
    <motion.div
      className={`demo__pick ${on ? "is-on" : ""}`}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
    >
      <motion.span
        className="demo__check"
        animate={on ? { scale: [0.6, 1.15, 1] } : { scale: 1 }}
        transition={{ delay: delay + 0.4, duration: 0.35 }}
      >
        ✓
      </motion.span>
      <span>{name}</span>
      <span className="demo__fee">{fee}</span>
    </motion.div>
  );
}

function TapRipple() {
  return (
    <motion.span
      className="demo__ripple"
      initial={{ scale: 0.4, opacity: 0.7 }}
      animate={{ scale: 2.2, opacity: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
    />
  );
}
