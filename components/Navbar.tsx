"use client";
import { useEffect, useState } from "react";

const links = ["Studio", "Services", "Work", "Process", "Contact"];
const ids = ["who", "services", "portfolio", "process", "contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onScroll();
    onResize();
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: isMobile ? "1rem 1.5rem" : "1.3rem 3rem",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        background: scrolled ? "var(--nav-bg)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        boxShadow: scrolled ? "0 2px 20px var(--accent-glow)" : "none",
        opacity: scrolled ? 1 : 0.85,
        transition: "background 0.4s ease, border-color 0.4s ease, box-shadow 0.3s ease, opacity 0.3s ease",
      }}>
        <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.3rem", letterSpacing: "-0.03em", color: "var(--text)" }}>
          Launch<span style={{ color: "var(--accent)" }}>pad</span>
        </div>

        {!isMobile && (
          <ul style={{ listStyle: "none", display: "flex", gap: "2.5rem" }}>
            {links.map((l, i) => (
              <li key={l}>
                <button onClick={() => scrollTo(ids[i])} style={{ background: "none", border: "none", color: "var(--muted)", fontSize: "0.82rem", letterSpacing: "0.07em", textTransform: "uppercase", cursor: "pointer", fontFamily: "Inter, sans-serif", transition: "color 0.2s" }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--accent)")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--muted)")}
                >{l}</button>
              </li>
            ))}
          </ul>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {!isMobile && (
            <button onClick={() => scrollTo("contact")} style={{ background: "var(--accent)", color: "#fff", border: "none", padding: "0.55rem 1.4rem", borderRadius: "2rem", fontSize: "0.82rem", fontWeight: 500, cursor: "pointer", fontFamily: "Inter, sans-serif", letterSpacing: "0.04em", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px var(--accent-glow)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
            >Work with us →</button>
          )}

          {isMobile && (
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: "5px", padding: "4px", zIndex: 101, position: "relative" }}>
              {[0, 1, 2].map((i) => (
                <span key={i} style={{
                  display: "block", width: 24, height: 2,
                  background: "var(--text)", borderRadius: 2,
                  transition: "transform 0.3s, opacity 0.3s",
                  transform: menuOpen
                    ? i === 0 ? "translateY(7px) rotate(45deg)"
                    : i === 2 ? "translateY(-7px) rotate(-45deg)" : "none"
                    : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }} />
              ))}
            </button>
          )}
        </div>
      </nav>

      {isMobile && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 99,
          background: "var(--bg)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: "2rem",
          transition: "opacity 0.35s, transform 0.35s",
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? "translateY(0)" : "translateY(-16px)",
          pointerEvents: menuOpen ? "all" : "none",
        }}>
          {links.map((l, i) => (
            <button key={l} onClick={() => scrollTo(ids[i])} style={{
              background: "none", border: "none",
              color: "var(--text)", fontSize: "2.2rem",
              fontFamily: "Syne, sans-serif", fontWeight: 800,
              cursor: "pointer", letterSpacing: "-0.03em",
            }}>{l}</button>
          ))}
          <button onClick={() => scrollTo("contact")} style={{
            background: "var(--accent)", color: "#fff", border: "none",
            padding: "0.9rem 2.4rem", borderRadius: "2rem",
            fontSize: "1rem", fontWeight: 600,
            cursor: "pointer", fontFamily: "Inter, sans-serif", marginTop: "1rem",
          }}>Work with us →</button>
        </div>
      )}
    </>
  );
}
