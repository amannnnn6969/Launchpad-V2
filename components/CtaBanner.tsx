"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function CtaBanner() {
  const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: true });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const sync = () => setIsMobile(window.innerWidth < 768);
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  return (
    <section id="cta" style={{ padding: isMobile ? "0 20px 60px" : "0 40px 100px" }}>
      <div className="page-shell" ref={ref}>
        <div
          className={`reveal ${inView ? "visible" : ""}`}
          style={{
            position: "relative",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "24px",
            padding: isMobile ? "60px 24px" : "100px 40px",
            textAlign: "center",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          {/* Faint background text */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: isMobile ? "8rem" : "18rem",
              fontWeight: 900,
              fontFamily: "'Clash Display', sans-serif",
              color: "rgba(255,255,255,0.02)",
              pointerEvents: "none",
              whiteSpace: "nowrap",
              zIndex: 0,
              letterSpacing: "-0.05em"
            }}
          >
            LAUNCHPAD
          </div>

          <div style={{ position: "relative", zIndex: 1, maxWidth: 800 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "4px 12px",
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                fontFamily: "'Clash Display', sans-serif",
                fontWeight: 600,
                color: "var(--text-soft)",
                textTransform: "uppercase",
                marginBottom: 32
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />
              Next Availability — Limited Spots
            </div>

            <h2
              className="section-title section-title--medium"
              style={{
                fontSize: isMobile ? "2.5rem" : "4rem",
                marginBottom: 24,
                lineHeight: 1.1
              }}
            >
              Ready to build something <span style={{ color: "var(--accent)" }}>unforgettable?</span>
            </h2>

            <p className="section-copy" style={{ marginBottom: 40, fontSize: "1rem" }}>
              Let's talk about your project. No templates, no filler — just clean, cinematic work.
            </p>

            <button
              className="button-primary"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              style={{ padding: "16px 36px", fontSize: "1rem", borderRadius: 99 }}
            >
              Start a conversation →
            </button>
          </div>
          
          {/* Corner accents */}
          <div style={{ position: "absolute", top: 24, left: 24, width: 20, height: 20, borderTop: "2px solid rgba(255,255,255,0.1)", borderLeft: "2px solid rgba(255,255,255,0.1)" }} />
          <div style={{ position: "absolute", top: 24, right: 24, width: 20, height: 20, borderTop: "2px solid rgba(255,255,255,0.1)", borderRight: "2px solid rgba(255,255,255,0.1)" }} />
          <div style={{ position: "absolute", bottom: 24, left: 24, width: 20, height: 20, borderBottom: "2px solid rgba(255,255,255,0.1)", borderLeft: "2px solid rgba(255,255,255,0.1)" }} />
          <div style={{ position: "absolute", bottom: 24, right: 24, width: 20, height: 20, borderBottom: "2px solid rgba(255,255,255,0.1)", borderRight: "2px solid rgba(255,255,255,0.1)" }} />
        </div>
      </div>
    </section>
  );
}
