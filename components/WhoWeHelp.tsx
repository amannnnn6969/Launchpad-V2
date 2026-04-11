"use client";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";

const verticals = [
  "Personal Brands",
  "Creative Agencies",
  "F&B Concepts",
  "Fitness & Wellness",
  "Real Estate",
  "Professional Services",
];

export default function WhoWeHelp() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section id="who" style={{ padding: isMobile ? "4rem 1.5rem" : "7rem 3rem", maxWidth: 1200, margin: "0 auto" }}>
      <p ref={ref} className={`reveal ${inView ? "visible" : ""}`}
        style={{ fontSize: "0.73rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1rem" }}>
        Who we help
      </p>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "2rem" : "3.5rem", alignItems: "center", marginTop: "2rem" }}>
        <RevealBlock delay={0}>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: isMobile ? "1.8rem" : "clamp(1.9rem, 3.5vw, 3rem)", fontWeight: 800, lineHeight: 1.12, letterSpacing: "-0.03em", marginBottom: "1.2rem", color: "var(--text)" }}>
            Built for brands with something to say.
          </h2>
          <p style={{ color: "var(--text2)", lineHeight: 1.8, fontSize: "0.96rem" }}>
            We work with founders, studios, and growing brands who know that a generic website is worse than no website. The kind of people who&apos;d rather have one exceptional thing than five mediocre ones.
          </p>
        </RevealBlock>
        <RevealBlock delay={100}>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.2rem", padding: 0, margin: 0 }}>
            {verticals.map((v) => (
              <li key={v} style={{
                fontFamily: "Syne, sans-serif",
                fontSize: isMobile ? "1.2rem" : "1.6rem",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "var(--text)",
                padding: "0.85rem 0",
                borderBottom: "1px solid var(--border)",
                transition: "color 0.3s, padding-left 0.3s",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; (e.currentTarget as HTMLElement).style.paddingLeft = "0.6rem"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; (e.currentTarget as HTMLElement).style.paddingLeft = "0"; }}
              >{v}</li>
            ))}
          </ul>
        </RevealBlock>
      </div>
    </section>
  );
}

function RevealBlock({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <div ref={ref} className={`reveal ${inView ? "visible" : ""}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
