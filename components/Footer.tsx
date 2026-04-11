'use client';
import { useState, useEffect } from "react";

const links = [
  { label: "Studio", id: "who" },
  { label: "Services", id: "services" },
  { label: "Work", id: "portfolio" },
  { label: "Contact", id: "contact" },
];

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: isMobile ? "2rem 1.5rem" : "2.5rem 3rem", maxWidth: 1200, margin: "0 auto", transition: "border-color 0.5s" }}>
      <div className="footer-inner" style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "center" : "flex-start", textAlign: isMobile ? "center" : "left", flexWrap: "wrap", gap: isMobile ? "1.2rem" : "1.6rem", marginBottom: "1.8rem" }}>
        <div style={{ maxWidth: 420 }}>
          <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.3rem", letterSpacing: "-0.03em", color: "var(--text)", marginBottom: "0.6rem" }}>
            Launch<span style={{ color: "var(--accent)" }}>pad</span>
          </div>
          <p style={{ color: "var(--muted)", fontSize: "0.86rem", lineHeight: 1.6 }}>
            Launchpad — Custom web experiences for brands with a point of view.
          </p>
        </div>
        <div style={{ display: "flex", gap: isMobile ? "1.3rem" : "2rem", flexWrap: "wrap", justifyContent: "center" }}>
          {links.map((l) => (
            <button key={l.id} onClick={() => scrollTo(l.id)} style={{ background: "none", border: "none", color: "var(--muted)", fontSize: "0.82rem", cursor: "pointer", fontFamily: "Inter, sans-serif", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--accent)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--muted)")}
            >{l.label}</button>
          ))}
        </div>
      </div>
      <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.4rem", display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: "center", textAlign: "center", flexWrap: "wrap", gap: isMobile ? "0.8rem" : "0.6rem" }}>
        <p style={{ color: "var(--muted)", fontSize: "0.78rem" }}>© 2026 Launchpad — Custom web experiences for brands with a point of view.</p>
        <p style={{ color: "var(--muted)", fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>Designed &amp; coded in-house</p>
      </div>
    </footer>
  );
}
