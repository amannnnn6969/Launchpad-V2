'use client';

const links = [
  { label: "About", id: "who" },
  { label: "Services", id: "services" },
  { label: "Work", id: "portfolio" },
  { label: "Contact", id: "contact" },
];

export default function Footer() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "2.5rem 3rem", maxWidth: 1200, margin: "0 auto", transition: "border-color 0.5s" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.3rem", letterSpacing: "-0.03em", color: "var(--text)" }}>
          Launch<span style={{ color: "var(--accent)" }}>Pad</span>
        </div>
        <div style={{ display: "flex", gap: "2rem" }}>
          {links.map((l) => (
            <button key={l.id} onClick={() => scrollTo(l.id)} style={{ background: "none", border: "none", color: "var(--muted)", fontSize: "0.82rem", cursor: "pointer", fontFamily: "Inter, sans-serif", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--accent)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--muted)")}
            >{l.label}</button>
          ))}
        </div>
        <p style={{ color: "var(--muted)", fontSize: "0.82rem" }}>© 2026 Launchpad. Making local legends go global.</p>
      </div>
    </footer>
  );
}
