"use client";
import { useInView } from "react-intersection-observer";

export default function CtaBanner() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "visible" : ""}`}
      style={{ background: "linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%)", borderRadius: "2rem", padding: "5rem 3rem", textAlign: "center", maxWidth: 1200, margin: "0 auto 6rem", position: "relative", overflow: "hidden" }}
    >
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontFamily: "Syne, sans-serif", fontSize: "14rem", fontWeight: 800, opacity: 0.07, letterSpacing: "-0.06em", pointerEvents: "none", whiteSpace: "nowrap", color: "#fff" }}>GROW</div>
      <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(1.7rem,3.5vw,2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "1rem", position: "relative", color: "#fff" }}>
        Your competitors are already online.<br />Let&apos;s make sure you win.
      </h2>
      <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.82)", marginBottom: "2rem", position: "relative" }}>Book a free 30-minute audit — we&apos;ll show you exactly how to grow online.</p>
      <button
        onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
        style={{ background: "#fff", color: "var(--accent)", border: "none", padding: "0.9rem 2.5rem", borderRadius: "2rem", fontSize: "0.97rem", fontWeight: 700, cursor: "pointer", fontFamily: "Inter, sans-serif", position: "relative", transition: "transform 0.2s, box-shadow 0.2s" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 28px rgba(255,255,255,0.3)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
      >
        Get my free audit →
      </button>
    </div>
  );
}
