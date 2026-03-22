"use client";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";

const stats = [
  { num: "94%", desc: "of first impressions are design-related" },
  { num: "3s", desc: "before a visitor leaves a slow site" },
  { num: "2×", desc: "more leads with a modern site" },
  { num: "75%", desc: "judge credibility by web design" },
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
            Built for businesses killing it offline — but invisible online.
          </h2>
          <p style={{ color: "var(--text2)", lineHeight: 1.8, fontSize: "0.96rem", marginBottom: "1rem" }}>
            You&apos;ve built something real. Your customers love you. Your reviews are great. But your website looks like it&apos;s from 2009, and you&apos;re losing customers to competitors who have half your quality but twice your web presence.
          </p>
          <p style={{ color: "var(--text2)", lineHeight: 1.8, fontSize: "0.96rem" }}>
            We fix that. Fast. With websites that actually convert visitors into paying customers.
          </p>
        </RevealBlock>
        <RevealBlock delay={100}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {stats.map((s) => (
              <div key={s.num} style={{
                background: "var(--bg2)", border: "1px solid var(--border)",
                borderRadius: "1rem", padding: "1.2rem",
                transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px var(--accent-glow)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
              >
                <div style={{ fontFamily: "Syne, sans-serif", fontSize: isMobile ? "1.8rem" : "2.4rem", fontWeight: 800, color: "var(--accent)" }}>{s.num}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--muted)", marginTop: "0.3rem", lineHeight: 1.4 }}>{s.desc}</div>
              </div>
            ))}
          </div>
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
