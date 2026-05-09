"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "Solutions", id: "services" },
  { label: "Process", id: "services" },
  { label: "Case studies", id: "portfolio" },
  { label: "Insights", id: "portfolio" },
];

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sync = () => setIsMobile(window.innerWidth < 720);
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        paddingTop: 18,
      }}
    >
      <div className="page-shell">
        <div
          style={{
            minHeight: 58,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 18,
            padding: "0 18px",
            borderRadius: 0,
            background: "rgba(7,7,10,0.94)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <button
            onClick={() => scrollTo("hero")}
            style={{
              border: 0,
              background: "transparent",
              color: "var(--text)",
              cursor: "pointer",
              fontFamily: "Outfit, sans-serif",
              fontWeight: 800,
              fontSize: "1rem",
            }}
          >
            Launchpad
          </button>

          {!isMobile && (
            <div style={{ display: "flex", gap: 30, alignItems: "center" }}>
              {links.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.id)}
                  style={{
                    border: 0,
                    background: "transparent",
                    color: "var(--muted)",
                    cursor: "pointer",
                    fontSize: "0.66rem",
                    fontWeight: 700,
                    letterSpacing: "0.13em",
                    textTransform: "uppercase",
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          )}

          {isMobile ? (
            <button
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Open menu"
              style={{
                border: "1px solid rgba(255,255,255,0.12)",
                background: "transparent",
                color: "var(--text)",
                borderRadius: 6,
                width: 38,
                height: 34,
                cursor: "pointer",
              }}
            >
              =
            </button>
          ) : (
            <button
              className="button-primary"
              onClick={() => scrollTo("contact")}
              style={{ minHeight: 34, padding: "0 18px", borderRadius: 999, fontSize: "0.68rem" }}
            >
              Get started
            </button>
          )}
        </div>

        {isMobile && menuOpen && (
          <div
            style={{
              display: "grid",
              gap: 8,
              padding: 12,
              background: "#07070a",
              border: "1px solid rgba(255,255,255,0.12)",
              borderTop: 0,
            }}
          >
            {links.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.id)}
                style={{
                  minHeight: 42,
                  border: 0,
                  background: "rgba(255,255,255,0.04)",
                  color: "var(--text)",
                  textTransform: "uppercase",
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                }}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
