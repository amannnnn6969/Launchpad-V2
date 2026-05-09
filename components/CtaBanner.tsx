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
    <section id="contact" className="section-shell">
      <div
        ref={ref}
        className={`glass-panel reveal ${inView ? "visible" : ""}`}
        style={{
          padding: isMobile ? "34px 22px" : "56px 48px",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: isMobile ? 180 : 260,
            height: isMobile ? 180 : 260,
            borderRadius: 999,
            top: isMobile ? -24 : -40,
            left: isMobile ? -34 : 60,
            background: "rgba(139,92,246,0.2)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: isMobile ? 180 : 260,
            height: isMobile ? 180 : 260,
            borderRadius: 999,
            right: isMobile ? -26 : 80,
            bottom: isMobile ? -24 : -28,
            background: "rgba(59,130,246,0.18)",
            filter: "blur(80px)",
          }}
        />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto" }}>
          <div className="section-kicker">Next availability / limited slots</div>
          <h2 className="section-title section-title--medium" style={{ marginTop: 22 }}>
            Ready to launch with a <span className="gradient-text">future-facing edge</span>?
          </h2>
          <p className="section-copy" style={{ marginTop: 18 }}>
            Bring us the brief and the ambition. We will shape the system that makes
            the whole launch feel cleaner, sharper, and more premium.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "stretch" : "center",
              gap: "14px",
              justifyContent: "center",
              marginTop: 28,
            }}
          >
            <div
              className="surface-card"
              style={{
                minHeight: 54,
                minWidth: isMobile ? "100%" : 340,
                display: "flex",
                alignItems: "center",
                padding: "0 18px",
                background: "rgba(12,12,16,0.72)",
              }}
            >
              <span style={{ color: "var(--muted)", fontSize: "0.95rem" }}>you@company.com</span>
            </div>
            <button
              className="button-primary"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Start the conversation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
