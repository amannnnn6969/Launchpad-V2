"use client";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";

const services = [
  { icon: "⚡", title: "Lightning-Fast Websites", desc: "Blazing performance, buttery animations, and mobile-first design. Your site will feel like a premium product.", tag: "Core service" },
  { icon: "🎯", title: "Conversion Optimization", desc: "We design with one goal: turning visitors into customers. Every button and headline is intentional.", tag: "Core service" },
  { icon: "🔍", title: "Local SEO Domination", desc: "Show up first when people search for what you do in your city. Google loves our sites.", tag: "Growth add-on" },
  { icon: "🛒", title: "E-commerce & Booking", desc: "Online stores, appointment booking, event ticketing — systems that make money while you sleep.", tag: "Growth add-on" },
  { icon: "✨", title: "Brand & Visual Identity", desc: "Logos, color systems, fonts — design language that makes you look like a nationally-known brand.", tag: "Add-on" },
  { icon: "🔧", title: "Care Plans & Support", desc: "We don't disappear after launch. Ongoing maintenance so your site always runs perfectly.", tag: "Ongoing" },
];

function ServiceCard({ s, delay, isMobile }: { s: typeof services[0]; delay: number; isMobile: boolean }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <div ref={ref} className={`reveal ${inView ? "visible" : ""}`} style={{ transitionDelay: `${delay}ms` }}>
      <div style={{
        background: "var(--surface2)", border: "1px solid var(--border)",
        borderRadius: "1.2rem", padding: isMobile ? "1.5rem" : "2rem",
        height: "100%", transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
      }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent2)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px var(--accent-glow)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
      >
        <span style={{ fontSize: "1.8rem", marginBottom: "1rem", display: "block" }}>{s.icon}</span>
        <div style={{ fontFamily: "Syne, sans-serif", fontSize: "1.08rem", fontWeight: 700, marginBottom: "0.6rem", color: "var(--text)" }}>{s.title}</div>
        <div style={{ color: "var(--text2)", fontSize: "0.87rem", lineHeight: 1.7 }}>{s.desc}</div>
        <span style={{ display: "inline-block", marginTop: "1rem", background: "var(--accent-glow)", color: "var(--accent)", fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.28rem 0.8rem", borderRadius: "2rem", border: "1px solid var(--border2)" }}>{s.tag}</span>
      </div>
    </div>
  );
}

export default function Services() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div id="services" style={{
      background: "var(--surface)", border: "1px solid var(--border)",
      borderRadius: isMobile ? "1.2rem" : "2rem",
      padding: isMobile ? "3rem 1.5rem" : "5rem 3rem",
      maxWidth: 1200, margin: isMobile ? "0 1rem 2rem" : "0 auto 4rem",
      transition: "background 0.5s, border-color 0.5s",
    }}>
      <div ref={ref} className={`reveal ${inView ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: isMobile ? "1.8rem" : "clamp(1.9rem, 3.5vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text)" }}>What we build for you</h2>
        <p style={{ color: "var(--muted)", marginTop: "0.7rem", fontSize: "0.95rem" }}>Everything you need to dominate your market online — nothing you don&apos;t.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "1.4rem" }}>
        {services.map((s, i) => <ServiceCard key={s.title} s={s} delay={i * 60} isMobile={isMobile} />)}
      </div>
    </div>
  );
}