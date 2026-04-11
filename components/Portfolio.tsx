"use client";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";

const featured = {
  title: "Meteoric Boost",
  subtitle: "Personal Brand Agency · Sydney, AU",
  desc: "A cinematic web presence for a 141K-follower personal brand agency. Dark, bold, and built to convert.",
  tags: ["Next.js 14", "Framer Motion", "Three.js", "Dark Cinematic"],
  label: "Featured Work",
  href: "#",
};

const comingSoon = [
  { title: "Next Project", status: "In Progress — 2025" },
  { title: "Next Project", status: "In Progress — 2025" },
];

function FeaturedCard({ isMobile, onHover }: { isMobile: boolean; onHover: (id: string | null) => void }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <a
      ref={ref}
      href={featured.href}
      className={`reveal ${inView ? "visible" : ""}`}
      style={{
        display: "block",
        textDecoration: "none",
        color: "inherit",
        borderRadius: "1.4rem",
        overflow: "hidden",
        border: "1px solid var(--border2)",
        position: "relative",
        background: "linear-gradient(135deg,#050d1a 0%,#0a1f45 55%,#1a3a8a 100%)",
        marginBottom: "2rem",
        transition: "transform 0.4s, box-shadow 0.4s, border-color 0.4s",
      }}
      onMouseEnter={(e) => {
        if (!isMobile) {
          (e.currentTarget as HTMLElement).style.transform = "translateY(-8px)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 24px 80px var(--accent-glow)";
          (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
          onHover("meteoric");
        }
      }}
      onMouseLeave={(e) => {
        if (!isMobile) {
          (e.currentTarget as HTMLElement).style.transform = "none";
          (e.currentTarget as HTMLElement).style.boxShadow = "none";
          (e.currentTarget as HTMLElement).style.borderColor = "var(--border2)";
          onHover(null);
        }
      }}
    >
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1.05fr 1fr",
        minHeight: isMobile ? "auto" : 420,
      }}>
        {/* Left: copy */}
        <div style={{
          padding: isMobile ? "2rem 1.6rem" : "3rem 3rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "1rem",
        }}>
          <span style={{
            display: "inline-block",
            alignSelf: "flex-start",
            fontSize: "0.68rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#4f8eff",
            border: "1px solid rgba(79,142,255,0.35)",
            background: "rgba(79,142,255,0.08)",
            padding: "0.32rem 0.85rem",
            borderRadius: "2rem",
          }}>
            ✦ {featured.label}
          </span>
          <h3 style={{
            fontFamily: "Syne, sans-serif",
            fontSize: isMobile ? "2rem" : "clamp(2.2rem, 3.4vw, 3rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: "#ffffff",
          }}>
            {featured.title}
          </h3>
          <p style={{
            fontSize: "0.82rem",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
          }}>
            {featured.subtitle}
          </p>
          <p style={{
            fontSize: "0.96rem",
            lineHeight: 1.7,
            color: "rgba(232,240,255,0.78)",
            maxWidth: 460,
          }}>
            {featured.desc}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.4rem" }}>
            {featured.tags.map((t) => (
              <span key={t} style={{
                fontSize: "0.7rem",
                letterSpacing: "0.06em",
                color: "rgba(232,240,255,0.7)",
                border: "1px solid rgba(255,255,255,0.14)",
                padding: "0.32rem 0.75rem",
                borderRadius: "2rem",
                background: "rgba(255,255,255,0.04)",
              }}>{t}</span>
            ))}
          </div>
          <span style={{
            marginTop: "0.8rem",
            fontSize: "0.85rem",
            color: "#4f8eff",
            fontWeight: 500,
            letterSpacing: "0.04em",
          }}>
            View case study →
          </span>
        </div>

        {/* Right: visual mock */}
        <div style={{
          position: "relative",
          background: "linear-gradient(160deg,#0a1f45 0%,#1a3a8a 100%)",
          borderLeft: isMobile ? "none" : "1px solid rgba(255,255,255,0.06)",
          borderTop: isMobile ? "1px solid rgba(255,255,255,0.06)" : "none",
          padding: isMobile ? "2rem 1.6rem" : "2.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}>
          {/* subtle grid backdrop */}
          <div aria-hidden style={{
            position: "absolute", inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(ellipse at center, #000 40%, transparent 75%)",
          }} />
          <svg viewBox="0 0 320 240" fill="none" style={{ width: "92%", position: "relative", zIndex: 1 }}>
            <rect x="10" y="10" width="300" height="220" rx="10" fill="rgba(5,13,26,0.7)" stroke="rgba(255,255,255,0.1)" />
            <rect x="22" y="24" width="60" height="6" rx="3" fill="rgba(79,142,255,0.85)" />
            <rect x="22" y="44" width="220" height="22" rx="4" fill="rgba(255,255,255,0.92)" />
            <rect x="22" y="74" width="180" height="22" rx="4" fill="rgba(255,255,255,0.92)" />
            <rect x="22" y="112" width="120" height="8" rx="3" fill="rgba(255,255,255,0.32)" />
            <rect x="22" y="126" width="160" height="8" rx="3" fill="rgba(255,255,255,0.22)" />
            <rect x="22" y="150" width="92" height="28" rx="14" fill="#4f8eff" />
            <rect x="22" y="194" width="88" height="32" rx="6" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.12)" />
            <rect x="118" y="194" width="88" height="32" rx="6" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.12)" />
            <rect x="214" y="194" width="88" height="32" rx="6" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.12)" />
          </svg>
        </div>
      </div>
    </a>
  );
}

function ComingSoonCard({ c, delay, isMobile }: { c: typeof comingSoon[0]; delay: number; isMobile: boolean }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <div ref={ref} className={`reveal ${inView ? "visible" : ""}`} style={{ transitionDelay: `${delay}ms`, opacity: 0.4 }}>
      <div style={{
        borderRadius: "1rem",
        overflow: "hidden",
        border: "1px dashed var(--border2)",
        position: "relative",
        aspectRatio: "4/3",
        background: `repeating-linear-gradient(135deg, var(--surface2) 0, var(--surface2) 10px, var(--bg2) 10px, var(--bg2) 20px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.7rem",
        padding: "1.5rem",
        textAlign: "center",
      }}>
        <span style={{
          fontSize: "0.62rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--accent)",
          border: "1px solid var(--border2)",
          background: "var(--accent-glow)",
          padding: "0.28rem 0.8rem",
          borderRadius: "2rem",
        }}>
          Coming Soon
        </span>
        <h3 style={{
          fontFamily: "Syne, sans-serif",
          fontSize: "1.05rem",
          fontWeight: 700,
          color: "var(--text)",
          letterSpacing: "-0.02em",
        }}>
          {c.title}
        </h3>
        <p style={{ fontSize: "0.78rem", color: "var(--muted)", letterSpacing: "0.04em" }}>
          {c.status}
        </p>
      </div>
      {isMobile && (
        <div style={{ padding: "0.8rem 0.2rem 0.4rem" }}>
          <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: "0.95rem", fontWeight: 700, color: "var(--text)" }}>{c.title}</h3>
          <p style={{ fontSize: "0.82rem", color: "var(--muted)", marginTop: "0.3rem" }}>{c.status}</p>
        </div>
      )}
    </div>
  );
}

export default function Portfolio() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          opacity: hoveredProject === "meteoric" ? 1 : 0,
          transition: "opacity 0.6s ease",
          background:
            "radial-gradient(ellipse at center, rgba(139,0,0,0.18) 0%, rgba(13,3,5,0.6) 60%, transparent 100%)",
        }}
      />
      <div id="portfolio" style={{
        background: "var(--surface)", border: "1px solid var(--border)",
        borderRadius: isMobile ? "1.2rem" : "2rem",
        padding: isMobile ? "3rem 1.5rem" : "5rem 3rem",
        maxWidth: 1200, margin: isMobile ? "0 1rem 2rem" : "0 auto 4rem",
        transition: "background 0.5s, border-color 0.5s",
        position: "relative",
        zIndex: 1,
      }}>
        <div ref={ref} className={`reveal ${inView ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: isMobile ? "1.8rem" : "clamp(1.9rem, 3.5vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text)" }}>Selected Work</h2>
          <p style={{ color: "var(--muted)", marginTop: "0.7rem" }}>A growing portfolio of digital experiences. Each one built from scratch.</p>
        </div>

        <FeaturedCard isMobile={isMobile} onHover={setHoveredProject} />

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: isMobile ? "1.5rem" : "1.4rem" }}>
          {comingSoon.map((c, i) => (
            <ComingSoonCard key={i} c={c} delay={i * 60} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </>
  );
}
