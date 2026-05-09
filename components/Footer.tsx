"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "Studio", id: "who" },
  { label: "Services", id: "services" },
  { label: "Work", id: "portfolio" },
  { label: "Process", id: "process" },
  { label: "Contact", id: "contact" },
];

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const sync = () => setIsMobile(window.innerWidth < 768);
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="section-shell" style={{ marginBottom: 24 }}>
      <div
        className="glass-panel"
        style={{
          padding: isMobile ? "24px 20px" : "28px 30px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            gap: "20px",
            alignItems: isMobile ? "flex-start" : "center",
          }}
        >
          <div style={{ maxWidth: 420 }}>
            <div
              style={{
                fontFamily: "Outfit, sans-serif",
                fontSize: "1.5rem",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                color: "var(--text)",
              }}
            >
              Launchpad
            </div>
            <p
              style={{
                color: "var(--text-soft)",
                fontSize: "0.92rem",
                lineHeight: 1.7,
                marginTop: 8,
              }}
            >
              Premium launch systems for ambitious internet brands.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "14px",
            }}
          >
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="button-secondary"
                style={{ minHeight: 42, padding: "0 16px" }}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            marginTop: 22,
            paddingTop: 18,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            gap: "10px",
            color: "var(--muted)",
            fontSize: "0.82rem",
          }}
        >
          <span>Copyright 2026 Launchpad</span>
          <span>Designed and coded with a premium dark-space system</span>
        </div>
      </div>
    </footer>
  );
}
