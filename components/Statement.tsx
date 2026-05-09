"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Statement() {
  const { ref, inView } = useInView({ threshold: 0.25, triggerOnce: true });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const sync = () => setIsMobile(window.innerWidth < 768);
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  return (
    <section className="section-shell">
      <div
        ref={ref}
        className={`glass-panel reveal ${inView ? "visible" : ""}`}
        style={{
          padding: isMobile ? "28px 22px" : "46px 54px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: "var(--muted)",
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            fontSize: "0.76rem",
          }}
        >
          Positioning statement
        </p>
        <h2
          style={{
            marginTop: 16,
            fontFamily: "'Clash Display', sans-serif",
            fontWeight: 500,
            fontSize: isMobile ? "1.8rem" : "clamp(2.2rem, 4vw, 3.4rem)",
            lineHeight: 1.08,
            letterSpacing: "-0.04em",
            color: "var(--text-soft)",
          }}
        >
          Most websites{" "}
          <span className="gradient-text" style={{ fontWeight: 700 }}>
            apologize
          </span>{" "}
          for the brand behind them.
          <br />
          Yours should feel like a signal.
        </h2>
      </div>
    </section>
  );
}
