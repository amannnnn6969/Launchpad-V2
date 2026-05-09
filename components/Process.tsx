"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "We figure out what the business needs to say before the interface starts trying to say it.",
  },
  {
    num: "02",
    title: "Direction",
    desc: "We lock the visual tone, layout logic, and content structure so the build has a clear standard.",
  },
  {
    num: "03",
    title: "Build",
    desc: "The site gets coded, refined, and tested with the same care as the visuals.",
  },
  {
    num: "04",
    title: "Launch",
    desc: "We help ship it cleanly, then support the details that matter right after go-live.",
  },
];

export default function Process() {
  const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: true });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const sync = () => setIsMobile(window.innerWidth < 768);
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  return (
    <section id="process" className="section-shell">
      <div
        ref={ref}
        className={`glass-panel reveal ${inView ? "visible" : ""}`}
        style={{ padding: isMobile ? "26px 20px" : "42px" }}
      >
        <div style={{ maxWidth: 760 }}>
          <div className="section-kicker">Process</div>
          <h2 className="section-title section-title--medium" style={{ marginTop: 22 }}>
            A simple system with enough rigor to feel expensive.
          </h2>
          <p className="section-copy" style={{ marginTop: 18 }}>
            Four steps, no disappearing acts, and a cleaner handoff from idea to live
            site.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(4, minmax(0, 1fr))",
            gap: "16px",
            marginTop: 28,
          }}
        >
          {steps.map((step) => (
            <div
              key={step.num}
              className="surface-card"
              style={{
                padding: "22px",
                background: "rgba(12,12,16,0.9)",
              }}
            >
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 18,
                  display: "grid",
                  placeItems: "center",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "var(--text)",
                  fontFamily: "Outfit, sans-serif",
                  fontSize: "1rem",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                }}
              >
                {step.num}
              </div>
              <h3
                style={{
                  marginTop: 18,
                  fontFamily: "Outfit, sans-serif",
                  fontSize: "1.35rem",
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  marginTop: 12,
                  color: "var(--text-soft)",
                  fontSize: "0.92rem",
                  lineHeight: 1.65,
                }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
