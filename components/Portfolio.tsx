"use client";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";

const projects = [
  { title: "Spice Garden Restaurant", desc: "Full rebrand + online ordering", industry: "Restaurant", gradient: "linear-gradient(135deg,#0f2d6b 0%,#1a5cff 100%)" },
  { title: "Sharma & Associates", desc: "Law firm site with client portal", industry: "Law Firm", gradient: "linear-gradient(135deg,#0a2240 0%,#0d6efd 100%)" },
  { title: "FitZone Gym", desc: "Membership + class booking system", industry: "Fitness", gradient: "linear-gradient(135deg,#061830 0%,#2563eb 100%)" },
  { title: "Luxe Stays Realty", desc: "Property listings + lead capture", industry: "Real Estate", gradient: "linear-gradient(135deg,#0c2a5a 0%,#3d8bff 100%)" },
  { title: "Glow Beauty Studio", desc: "Salon booking + gift cards", industry: "Beauty", gradient: "linear-gradient(135deg,#08183a 0%,#1d4ed8 100%)" },
  { title: "BuildRight Contractors", desc: "Portfolio + quote request system", industry: "Construction", gradient: "linear-gradient(135deg,#0a1f45 0%,#4f7fe8 100%)" },
];

function ProjectCard({ p, delay, isMobile }: { p: typeof projects[0]; delay: number; isMobile: boolean }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <div ref={ref} className={`reveal ${inView ? "visible" : ""}`} style={{ transitionDelay: `${delay}ms` }}>
      {/* Image card */}
      <div style={{
        borderRadius: "1rem", overflow: "hidden",
        border: "1px solid var(--border)", position: "relative",
        aspectRatio: "4/3", transition: "transform 0.3s, box-shadow 0.3s",
      }}
        onMouseEnter={(e) => {
          if (!isMobile) {
            (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px var(--accent-glow)";
            const overlay = (e.currentTarget as HTMLElement).querySelector(".overlay") as HTMLElement;
            if (overlay) overlay.style.opacity = "1";
          }
        }}
        onMouseLeave={(e) => {
          if (!isMobile) {
            (e.currentTarget as HTMLElement).style.transform = "none";
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
            const overlay = (e.currentTarget as HTMLElement).querySelector(".overlay") as HTMLElement;
            if (overlay) overlay.style.opacity = "0";
          }
        }}
      >
        <div style={{ width: "100%", height: "100%", background: p.gradient, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
          <svg viewBox="0 0 280 200" fill="none" style={{ width: "75%", opacity: 0.9 }}>
            <rect x="20" y="10" width="240" height="12" rx="4" fill="rgba(255,255,255,0.15)" />
            <rect x="20" y="35" width="160" height="24" rx="4" fill="rgba(255,255,255,0.88)" />
            <rect x="20" y="68" width="120" height="7" rx="3" fill="rgba(255,255,255,0.3)" />
            <rect x="20" y="82" width="100" height="7" rx="3" fill="rgba(255,255,255,0.2)" />
            <rect x="20" y="102" width="76" height="24" rx="12" fill="rgba(255,255,255,0.88)" />
            <rect x="20" y="140" width="72" height="48" rx="6" fill="rgba(255,255,255,0.1)" />
            <rect x="104" y="140" width="72" height="48" rx="6" fill="rgba(255,255,255,0.1)" />
            <rect x="188" y="140" width="72" height="48" rx="6" fill="rgba(255,255,255,0.1)" />
          </svg>
        </div>
        {/* Desktop hover overlay */}
        {!isMobile && (
          <div className="overlay" style={{ position: "absolute", inset: 0, background: "rgba(10,22,40,0.85)", opacity: 0, transition: "opacity 0.3s", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.5rem", padding: "1.5rem", textAlign: "center" }}>
            <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: "1rem", fontWeight: 700, color: "#fff" }}>{p.title}</h3>
            <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.65)" }}>{p.desc}</p>
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent2)", border: "1px solid var(--accent2)", padding: "0.2rem 0.7rem", borderRadius: "2rem", marginTop: "0.3rem" }}>{p.industry}</span>
          </div>
        )}
      </div>
      {/* Mobile: show info below card */}
      {isMobile && (
        <div style={{ padding: "0.8rem 0.2rem 0.4rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: "0.95rem", fontWeight: 700, color: "var(--text)" }}>{p.title}</h3>
            <span style={{ fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)", border: "1px solid var(--border2)", padding: "0.18rem 0.6rem", borderRadius: "2rem", whiteSpace: "nowrap", marginLeft: "0.5rem" }}>{p.industry}</span>
          </div>
          <p style={{ fontSize: "0.82rem", color: "var(--muted)", marginTop: "0.3rem" }}>{p.desc}</p>
        </div>
      )}
    </div>
  );
}

export default function Portfolio() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div id="portfolio" style={{
      background: "var(--surface)", border: "1px solid var(--border)",
      borderRadius: isMobile ? "1.2rem" : "2rem",
      padding: isMobile ? "3rem 1.5rem" : "5rem 3rem",
      maxWidth: 1200, margin: isMobile ? "0 1rem 2rem" : "0 auto 4rem",
      transition: "background 0.5s, border-color 0.5s",
    }}>
      <div ref={ref} className={`reveal ${inView ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: isMobile ? "1.8rem" : "clamp(1.9rem, 3.5vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text)" }}>Our work</h2>
        <p style={{ color: "var(--muted)", marginTop: "0.7rem" }}>Real websites, real results — for real local businesses.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: isMobile ? "1.5rem" : "1.4rem" }}>
        {projects.map((p, i) => <ProjectCard key={p.title} p={p} delay={i * 60} isMobile={isMobile} />)}
      </div>
    </div>
  );
}
