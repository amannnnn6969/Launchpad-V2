"use client";
import { useInView } from "react-intersection-observer";
import { useState, useEffect, useRef } from "react";

const steps = [
  { num: 1, title: "Free Audit", desc: "We review your online presence and show you exactly what's costing you customers." },
  { num: 2, title: "Strategy Call", desc: "We align on goals, timeline, and budget. No pushy sales — just honest conversation." },
  { num: 3, title: "We Build", desc: "You'll see a live preview within 2 weeks to review and give feedback." },
  { num: 4, title: "You Launch", desc: "Go live and start seeing results. We handle domain, hosting, and the full launch checklist." },
];

export default function Process() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section id="process" style={{ padding: isMobile ? "4rem 1.5rem" : "7rem 3rem", maxWidth: 1200, margin: "0 auto" }}>
      <div ref={ref} className={`reveal ${inView ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: isMobile ? "2.5rem" : "4rem" }}>
        <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: isMobile ? "1.8rem" : "clamp(1.9rem,3.5vw,2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text)" }}>Simple process, stunning results</h2>
        <p style={{ color: "var(--muted)", marginTop: "0.7rem", fontSize: isMobile ? "0.9rem" : "1rem" }}>From first call to live site in weeks — not months.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4,1fr)", gap: isMobile ? "1.2rem" : "1.5rem", position: "relative" }}>
        <div style={{ display: isMobile ? "none" : "block", position: "absolute", top: "2.4rem", left: "12%", right: "12%", height: 1, background: "linear-gradient(to right,transparent,var(--accent),transparent)" }} />
        {steps.map((s, i) => <StepCard key={s.num} s={s} delay={i * 80} />)}
      </div>
    </section>
  );
}

function StepCard({ s, delay }: { s: typeof steps[0]; delay: number }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowX, setGlowX] = useState(50);
  const [glowY, setGlowY] = useState(50);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setRotateX((y - 0.5) * -16);
    setRotateY((x - 0.5) * 16);
    setGlowX(x * 100);
    setGlowY(y * 100);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => setIsHovered(true);

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "visible" : ""}`}
      style={{ transitionDelay: `${delay}ms`, perspective: "800px" }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{
          textAlign: "center",
          padding: "1.8rem 1.2rem",
          borderRadius: "1.2rem",
          border: `1px solid ${isHovered ? "var(--accent2)" : "var(--border)"}`,
          background: "var(--surface2)",
          position: "relative",
          overflow: "hidden",
          cursor: "default",
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: isHovered
            ? "transform 0.1s ease, border-color 0.3s ease, box-shadow 0.3s ease"
            : "transform 0.5s cubic-bezier(0.23,1,0.32,1), border-color 0.3s ease, box-shadow 0.3s ease",
          boxShadow: isHovered ? "0 16px 48px var(--accent-glow)" : "none",
          willChange: "transform",
        }}
      >
        {/* Spotlight glow that follows cursor */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s ease",
            background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(79,142,255,0.18) 0%, transparent 65%)`,
          }}
        />
        <div style={{
          width: 46, height: 46, borderRadius: "50%",
          background: isHovered ? "var(--accent)" : "var(--surface)",
          border: "2px solid var(--accent)",
          color: isHovered ? "#fff" : "var(--accent)",
          fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.05rem",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 1.2rem",
          boxShadow: isHovered ? "0 0 0 6px var(--accent-glow), 0 0 20px var(--accent-glow)" : "0 0 0 6px var(--accent-glow)",
          transition: "all 0.3s ease",
          position: "relative", zIndex: 1,
        }}>{s.num}</div>
        <h3 style={{
          fontFamily: "Syne, sans-serif", fontSize: "1rem", fontWeight: 700,
          marginBottom: "0.5rem",
          color: isHovered ? "var(--text)" : "var(--text)",
          position: "relative", zIndex: 1,
        }}>{s.title}</h3>
        <p style={{
          color: "var(--muted)", fontSize: "0.82rem", lineHeight: 1.65,
          position: "relative", zIndex: 1,
        }}>{s.desc}</p>
      </div>
    </div>
  );
}
