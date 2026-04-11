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
      style={{ background: "linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%)", borderRadius: isMobile ? "1.2rem" : "2rem", padding: isMobile ? "3rem 1.5rem" : "5rem 3rem", textAlign: "center", maxWidth: 1200, margin: isMobile ? "0 1rem 3rem" : "0 auto 6rem", position: "relative", overflow: "hidden" }}
    >
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontFamily: "Syne, sans-serif", fontSize: isMobile ? "5rem" : "14rem", fontWeight: 800, opacity: 0.07, letterSpacing: "-0.06em", pointerEvents: "none", whiteSpace: "nowrap", color: "#fff" }}>BUILD</div>
      <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: isMobile ? "clamp(1.4rem, 5vw, 1.8rem)" : "clamp(1.7rem,3.5vw,2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "1rem", position: "relative", color: "#fff" }}>
        Ready to build something unforgettable?
      </h2>
      <p style={{ fontSize: isMobile ? "0.9rem" : "1rem", color: "rgba(255,255,255,0.82)", marginBottom: isMobile ? "1.6rem" : "2rem", position: "relative", lineHeight: 1.6 }}>Let&apos;s talk about your project. No templates, no filler — just clean, cinematic work.</p>
      <button
        onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
        style={{ background: "#fff", color: "var(--accent)", border: "none", padding: "0.9rem 2.5rem", borderRadius: "2rem", fontSize: "0.97rem", fontWeight: 700, cursor: "pointer", fontFamily: "Inter, sans-serif", position: "relative", transition: "transform 0.2s, box-shadow 0.2s" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 28px rgba(255,255,255,0.3)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
      >
        Start a conversation →
      </button>
    </div>
  );
}
