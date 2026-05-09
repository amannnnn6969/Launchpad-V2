"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const verticals = [
  "AI products",
  "SaaS startups",
  "Creative agencies",
  "Founder-led brands",
  "Healthcare innovators",
  "Service businesses with taste",
];

const metrics = [
  { value: "2-4 weeks", label: "for launch-focused builds" },
  { value: "1 partner", label: "across brand, copy, design, and code" },
];

export default function WhoWeHelp() {
  const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: true });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const sync = () => setIsMobile(window.innerWidth < 768);
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  return (
    <section id="who" className="section-shell">
      <div
        ref={ref}
        className={`glass-panel reveal ${inView ? "visible" : ""}`}
        style={{
          padding: isMobile ? "26px 20px" : "42px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 0.95fr) minmax(0, 1.05fr)",
            gap: isMobile ? "26px" : "34px",
            alignItems: "start",
          }}
        >
          <div>
            <div className="section-kicker">Who we help</div>
            <h2 className="section-title section-title--medium" style={{ marginTop: 22 }}>
              Built for teams with something sharp to say.
            </h2>
            <p className="section-copy" style={{ marginTop: 18, maxWidth: 520 }}>
              We work with founders and growing brands who know a generic site costs more
              than it saves. If the business is ambitious, the site should carry that
              energy all the way through desktop and mobile.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))",
                gap: "14px",
                marginTop: 24,
              }}
            >
              {metrics.map((metric) => (
                <div
                  key={metric.value}
                  className="surface-card"
                  style={{ padding: "18px 18px 16px", background: "rgba(12,12,16,0.78)" }}
                >
                  <div
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      fontSize: "1.35rem",
                      fontWeight: 600,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {metric.value}
                  </div>
                  <div
                    style={{
                      marginTop: 6,
                      color: "var(--text-soft)",
                      fontSize: "0.9rem",
                      lineHeight: 1.55,
                    }}
                  >
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="surface-card"
            style={{
              padding: isMobile ? "22px" : "28px",
              background: "rgba(12,12,16,0.8)",
            }}
          >
            <div
              style={{
                color: "var(--muted)",
                fontSize: "0.78rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Typical clients
            </div>
            <div
              style={{
                display: "grid",
                gap: "12px",
              }}
            >
              {verticals.map((vertical) => (
                <div
                  key={vertical}
                  style={{
                    minHeight: 62,
                    borderRadius: 18,
                    border: "1px solid rgba(255,255,255,0.06)",
                    background: "rgba(255,255,255,0.03)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 18px",
                    gap: "14px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      fontSize: isMobile ? "1rem" : "1.12rem",
                      fontWeight: 500,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {vertical}
                  </span>
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 999,
                      background: "var(--hero-gradient)",
                      boxShadow: "0 0 14px var(--accent-glow)",
                      flexShrink: 0,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
