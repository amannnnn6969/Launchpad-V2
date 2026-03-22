"use client";
import { useEffect, useState } from "react";

const links = ["About", "Services", "Work", "Process", "Contact"];
const ids = ["who", "services", "portfolio", "process", "contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.3rem 3rem",
        backdropFilter: "blur(16px)",
        background: "var(--nav-bg)",
        borderBottom: "1px solid var(--border)",
        transition: "background 0.5s, border-color 0.5s, box-shadow 0.3s",
        boxShadow: scrolled ? "0 2px 20px var(--accent-glow)" : "none",
      }}
    >
      {/* Logo */}
      <div
        style={{
          fontFamily: "Syne, sans-serif",
          fontWeight: 800,
          fontSize: "1.3rem",
          letterSpacing: "-0.03em",
          color: "var(--text)",
        }}
      >
        Launch<span style={{ color: "var(--accent)" }}>Pad</span>
      </div>

      {/* Links */}
      <ul style={{ listStyle: "none", display: "flex", gap: "2.5rem" }}>
        {links.map((l, i) => (
          <li key={l}>
            <button
              onClick={() => scrollTo(ids[i])}
              style={{
                background: "none",
                border: "none",
                color: "var(--muted)",
                fontSize: "0.82rem",
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "var(--accent)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "var(--muted)")
              }
            >
              {l}
            </button>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={() => scrollTo("contact")}
        style={{
          background: "var(--accent)",
          color: "#fff",
          border: "none",
          padding: "0.55rem 1.4rem",
          borderRadius: "2rem",
          fontSize: "0.82rem",
          fontWeight: 500,
          cursor: "pointer",
          fontFamily: "Inter, sans-serif",
          letterSpacing: "0.04em",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px var(--accent-glow)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLElement).style.boxShadow = "none";
        }}
      >
        Get a free audit →
      </button>
    </nav>
  );
}
