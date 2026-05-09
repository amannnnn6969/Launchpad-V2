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

  const steps = [
    {
      num: "1",
      title: "Discovery",
      desc: "We learn your brand, audience, and goals. No assumptions — just deep listening before a single pixel gets placed.",
    },
    {
      num: "2",
      title: "Design",
      desc: "A full visual direction before we write a line of code. You see exactly what we're building and sign off on it.",
    },
    {
      num: "3",
      title: "Build",
      desc: "Hand-coded in Next.js with motion, performance, and detail at every layer. Live preview within 2 weeks.",
    },
    {
      num: "4",
      title: "Launch",
      desc: "We handle domain, hosting, and the full launch checklist. Then we stick around — you're not on your own.",
    },
  ];

  return (
    <section id="process" style={{ padding: isMobile ? "60px 0" : "100px 0" }}>
      <div className="page-shell" ref={ref}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? 40 : 60 }}>
          <h2 className="section-title section-title--medium" style={{ fontSize: isMobile ? "2.5rem" : "3.5rem" }}>
            How we work
          </h2>
          <p className="section-copy" style={{ marginTop: 12, fontSize: "0.95rem" }}>
            Four steps. No surprises. No disappearing acts.
          </p>
        </div>

        <div
          className={`reveal ${inView ? "visible" : ""}`}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
            gap: "24px",
          }}
        >
          {steps.map((step) => (
            <div
              key={step.num}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center"
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "var(--text)",
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  marginBottom: 20
                }}
              >
                {step.num}
              </div>
              <h3
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  marginBottom: 12,
                  color: "var(--text)"
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  color: "var(--text-soft)",
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
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
