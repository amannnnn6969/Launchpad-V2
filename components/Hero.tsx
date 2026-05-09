"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const sync = () => setIsMobile(window.innerWidth < 720);
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      style={{
        padding: isMobile ? "38px 0 50px" : "44px 0 62px",
        textAlign: "center",
      }}
    >
      <div className="page-shell">
        <div className="section-kicker" style={{ marginInline: "auto" }}>
          Innovation and impact
        </div>

        <h1
          style={{
            margin: "24px auto 0",
            maxWidth: 760,
            fontFamily: "Outfit, sans-serif",
            fontSize: isMobile ? "3rem" : "clamp(4.2rem, 8vw, 5.8rem)",
            lineHeight: 0.95,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "var(--text)",
          }}
        >
          Launchpad
          <br />
          Builds digital presence
          <br />
          <span className="gradient-text">that feels like a product from the future</span>
        </h1>

        <p
          className="section-copy"
          style={{
            maxWidth: 540,
            margin: "26px auto 0",
            fontSize: isMobile ? "0.92rem" : "0.98rem",
            lineHeight: 1.8,
          }}
        >
          We design launch-ready brand systems, motion-rich web experiences, immersive
          web, and conversion UX designed as one launch engine. Inevitable from day one.
        </p>

        <div
          style={{
            marginTop: 30,
            display: "flex",
            justifyContent: "center",
            gap: 14,
            flexWrap: "wrap",
          }}
        >
          <button className="button-primary" onClick={() => scrollTo("contact")}>
            Book a strategy call
          </button>
          <button className="button-secondary" onClick={() => scrollTo("portfolio")}>
            See our work
          </button>
        </div>

        <div className="hero-visual" aria-hidden />
      </div>
    </section>
  );
}
