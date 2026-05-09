"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function WhoWeHelp() {
  const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: true });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const sync = () => setIsMobile(window.innerWidth < 768);
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  const demographics = [
    "Personal Brands",
    "Creative Agencies",
    "F&B Concepts",
    "Fitness & Wellness",
    "Real Estate",
    "Professional Services"
  ];

  return (
    <section id="who" style={{ padding: isMobile ? "80px 0" : "140px 0" }}>
      <div className="page-shell" ref={ref}>
        <div
          className={`reveal ${inView ? "visible" : ""}`}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "60px" : "80px",
            alignItems: "start",
          }}
        >
          {/* Left Column */}
          <div>
            <div className="section-kicker" style={{ color: "var(--accent)" }}>WHO WE HELP</div>
            <h2 className="section-title section-title--medium" style={{ marginTop: 24, fontSize: isMobile ? "2.5rem" : "3.5rem" }}>
              Built for<br/>brands with<br/>something<br/>to say.
            </h2>
            <p className="section-copy" style={{ marginTop: 24, maxWidth: 420 }}>
              We work with founders, studios, and growing brands who know that a
              generic website is worse than no website. The kind of people who'd
              rather have one exceptional thing than five mediocre ones.
            </p>
          </div>

          {/* Right Column */}
          <div style={{ display: "flex", flexDirection: "column", marginTop: isMobile ? 0 : 40 }}>
            {demographics.map((item, index) => (
              <div
                key={item}
                style={{
                  padding: "24px 0",
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  borderBottom: index === demographics.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: isMobile ? "1.2rem" : "1.4rem",
                  fontWeight: 600,
                  letterSpacing: "-0.01em"
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
