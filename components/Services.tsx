"use client";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";

const services = [
  { num: "01", title: "Custom Web Development", desc: "Hand-coded in Next.js 14. No templates, no shortcuts. Every interaction is intentional, every pixel earns its place." },
  { num: "02", title: "Motion & Interaction Design", desc: "Framer Motion animations and Three.js experiences that make visitors stop scrolling and start feeling something." },
  { num: "03", title: "SEO & Performance", desc: "Built to rank and built to load. Core Web Vitals-optimised from the ground up, not bolted on after." },
  { num: "04", title: "E-commerce & Booking Systems", desc: "Revenue infrastructure that runs while you sleep — stores, bookings, memberships, all seamlessly integrated." },
  { num: "05", title: "Brand & Visual Identity", desc: "Typography systems, colour palettes, design language. We build brands that look like they belong on billboards." },
  { num: "06", title: "Ongoing Partnership", desc: "We don't disappear post-launch. Monthly retainers for studios and brands that want a technical partner, not a vendor." },
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
        <span style={{ fontFamily: "Syne, sans-serif", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.12em", color: "var(--accent)", marginBottom: "1rem", display: "block" }}>{s.num}</span>
        <div style={{ fontFamily: "Syne, sans-serif", fontSize: "1.08rem", fontWeight: 700, marginBottom: "0.6rem", color: "var(--text)" }}>{s.title}</div>
        <div style={{ color: "var(--text2)", fontSize: "0.87rem", lineHeight: 1.7 }}>{s.desc}</div>
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
        <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: isMobile ? "1.8rem" : "clamp(1.9rem, 3.5vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text)" }}>What we do</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "1.4rem" }}>
        {services.map((s, i) => <ServiceCard key={s.title} s={s} delay={i * 60} isMobile={isMobile} />)}
      </div>
    </div>
  );
}