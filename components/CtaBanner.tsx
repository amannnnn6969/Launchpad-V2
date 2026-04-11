"use client";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";

export default function CtaBanner() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "visible" : ""}`}
      style={{
        position: "relative",
        borderRadius: isMobile ? "1.2rem" : "2rem",
        padding: isMobile ? "3.5rem 1.5rem" : "6rem 3rem",
        textAlign: "center",
        maxWidth: 1200,
        margin: isMobile ? "0 1rem 3rem" : "0 auto 6rem",
        overflow: "hidden",
        background: "var(--surface)",
        border: "1px solid var(--border2)",
      }}
    >
      {/* Animated radial glow that pulses */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 50% 50%, rgba(79,142,255,0.12) 0%, rgba(79,142,255,0.04) 40%, transparent 70%)",
        animation: "ctaPulse 4s ease-in-out infinite",
      }} />

      {/* Animated grid lines */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(79,142,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(79,142,255,0.05) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        maskImage: "radial-gradient(ellipse at center, #000 30%, transparent 75%)",
      }} />

      {/* Giant watermark */}
      <div aria-hidden style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        fontFamily: "Syne, sans-serif",
        fontSize: isMobile ? "5rem" : "14rem",
        fontWeight: 800, letterSpacing: "-0.06em",
        color: "var(--accent)", opacity: 0.04,
        pointerEvents: "none", whiteSpace: "nowrap", userSelect: "none",
      }}>LAUNCH</div>

      {/* Corner accent lines */}
      <div aria-hidden style={{ position: "absolute", top: 24, left: 24, width: 40, height: 40, borderTop: "2px solid var(--accent2)", borderLeft: "2px solid var(--accent2)", borderRadius: "4px 0 0 0", opacity: 0.4 }} />
      <div aria-hidden style={{ position: "absolute", top: 24, right: 24, width: 40, height: 40, borderTop: "2px solid var(--accent2)", borderRight: "2px solid var(--accent2)", borderRadius: "0 4px 0 0", opacity: 0.4 }} />
      <div aria-hidden style={{ position: "absolute", bottom: 24, left: 24, width: 40, height: 40, borderBottom: "2px solid var(--accent2)", borderLeft: "2px solid var(--accent2)", borderRadius: "0 0 0 4px", opacity: 0.4 }} />
      <div aria-hidden style={{ position: "absolute", bottom: 24, right: 24, width: 40, height: 40, borderBottom: "2px solid var(--accent2)", borderRight: "2px solid var(--accent2)", borderRadius: "0 0 4px 0", opacity: 0.4 }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1.2rem", fontFamily: "Inter, sans-serif" }}>
          ✦ Next availability — limited spots
        </p>
        <h2 style={{
          fontFamily: "Syne, sans-serif",
          fontSize: isMobile ? "clamp(1.6rem, 5vw, 2rem)" : "clamp(2rem, 3.5vw, 3rem)",
          fontWeight: 800, letterSpacing: "-0.03em",
          marginBottom: "1rem", color: "var(--text)",
        }}>
          Ready to build something<br />
          <span style={{ color: "var(--accent)" }}>unforgettable?</span>
        </h2>
        <p style={{ fontSize: isMobile ? "0.9rem" : "1rem", color: "var(--text2)", marginBottom: isMobile ? "1.8rem" : "2.2rem", lineHeight: 1.6 }}>
          Let&apos;s talk about your project. No templates, no filler — just clean, cinematic work.
        </p>
        <button
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          style={{
            background: "var(--accent)", color: "#fff", border: "none",
            padding: "0.95rem 2.8rem", borderRadius: "2rem",
            fontSize: "0.97rem", fontWeight: 600, cursor: "pointer",
            fontFamily: "Inter, sans-serif", position: "relative",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(79,142,255,0.5)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
        >
          Start a conversation →
        </button>
      </div>
    </div>
  );
}
