"use client";

import { useEffect, useState } from "react";

const projects = [
  {
    title: "Orbit Finance",
    desc: "Autonomous liquidity management for the decentralized future.",
    tag: "Fintech",
    imageClass: "project-image",
  },
  {
    title: "Nexa AI",
    desc: "Next-generation retail engine optimized for ultra-high conversion.",
    tag: "E-Commerce",
    imageClass: "project-image project-image--two",
  },
  {
    title: "Pulse Studio",
    desc: "AI-driven diagnostics platform for precision medical monitoring.",
    tag: "Healthcare",
    imageClass: "project-image project-image--three",
  },
];

export default function Portfolio() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const sync = () => setIsMobile(window.innerWidth < 768);
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  const projects = [
    {
      title: "Meteoric Boost",
      tag: "FEATURED WORK",
      desc: "PERSONAL BRAND AGENCY - SYDNEY, AU\n\nA cinematic web presence for a 140k-follower personal brand agency. Dark, bold, and built to convert.",
      tech: ["Next.js 14", "Framer Motion", "Three.js", "Dark Cinematic"],
      featured: true
    },
    {
      title: "Next Project",
      tag: "COMING SOON",
      desc: "In Progress — 2025",
      featured: false
    },
    {
      title: "Next Project",
      tag: "COMING SOON",
      desc: "In Progress — 2025",
      featured: false
    }
  ];

  return (
    <section id="portfolio" style={{ padding: isMobile ? "60px 0" : "100px 0" }}>
      <div className="page-shell">
        <div style={{ textAlign: "center", marginBottom: isMobile ? 40 : 60 }}>
          <h2 className="section-title section-title--medium" style={{ fontSize: isMobile ? "2.5rem" : "3.5rem" }}>
            Selected Work
          </h2>
          <p className="section-copy" style={{ marginTop: 12, fontSize: "0.95rem" }}>
            A growing portfolio of digital experiences. Each one built from scratch.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: "24px",
          }}
        >
          {projects.map((project, idx) => (
            <div
              key={idx}
              style={{
                gridColumn: project.featured && !isMobile ? "1 / -1" : "auto",
                background: project.featured ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.01)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px",
                display: "grid",
                gridTemplateColumns: project.featured && !isMobile ? "1fr 1fr" : "1fr",
                overflow: "hidden"
              }}
            >
              {/* Content Side */}
              <div style={{ padding: project.featured ? "48px" : "32px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: project.featured ? "flex-start" : "center", textAlign: project.featured ? "left" : "center", borderRight: project.featured && !isMobile ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "4px 12px",
                    borderRadius: "99px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.1em",
                    fontFamily: "'Clash Display', sans-serif",
                    fontWeight: 600,
                    marginBottom: 24,
                    color: "var(--text-soft)"
                  }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: project.featured ? "var(--accent)" : "rgba(255,255,255,0.3)" }} />
                  {project.tag}
                </div>
                
                <h3
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontSize: project.featured ? (isMobile ? "2.5rem" : "3.5rem") : "1.5rem",
                    fontWeight: 700,
                    marginBottom: project.featured ? 16 : 8,
                    lineHeight: 1.1,
                    whiteSpace: "pre-wrap"
                  }}
                >
                  {project.title}
                </h3>
                
                <p style={{ color: "var(--text-soft)", fontSize: "0.95rem", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                  {project.desc}
                </p>

                {project.featured && project.tech && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: 32 }}>
                    {project.tech.map((t) => (
                      <span key={t} style={{ fontSize: "0.75rem", padding: "6px 14px", borderRadius: "99px", border: "1px solid rgba(255,255,255,0.15)", color: "var(--text)" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {project.featured && (
                  <button style={{ marginTop: 32, fontSize: "0.9rem", color: "var(--accent)", display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", cursor: "pointer", fontWeight: 500 }}>
                    View case study <span style={{ transition: "transform 0.2s" }}>→</span>
                  </button>
                )}
              </div>

              {/* Image Side (only for featured) */}
              {project.featured && (
                <div style={{ background: "linear-gradient(to bottom right, #1b2c67, #031855)", minHeight: isMobile ? 300 : 400, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
                   {/* Mockup visual */}
                   <div style={{ width: "100%", maxWidth: 400, aspectRatio: "4/3", background: "rgba(12,12,16,0.5)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "20px", display: "flex", flexDirection: "column", gap: "16px", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}>
                     <div style={{ width: "20%", height: "8px", background: "var(--accent)", borderRadius: "4px" }} />
                     <div style={{ width: "100%", height: "24px", background: "rgba(255,255,255,0.9)", borderRadius: "4px" }} />
                     <div style={{ width: "80%", height: "16px", background: "rgba(255,255,255,0.7)", borderRadius: "4px" }} />
                     <div style={{ width: "40%", height: "8px", background: "rgba(255,255,255,0.4)", borderRadius: "4px" }} />
                     <div style={{ width: "30%", height: "32px", background: "var(--accent)", borderRadius: "16px", marginTop: "16px" }} />
                     <div style={{ display: "flex", gap: "12px", marginTop: "auto" }}>
                       <div style={{ flex: 1, height: "40px", background: "rgba(255,255,255,0.05)", borderRadius: "4px" }} />
                       <div style={{ flex: 1, height: "40px", background: "rgba(255,255,255,0.05)", borderRadius: "4px" }} />
                       <div style={{ flex: 1, height: "40px", background: "rgba(255,255,255,0.05)", borderRadius: "4px" }} />
                     </div>
                   </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
