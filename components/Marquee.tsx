const items = [
  "Next.js 14", "·", "TypeScript", "·", "Framer Motion", "·", "Three.js", "·",
  "Tailwind CSS", "·", "Cinematic Design", "·", "Custom Coded", "·", "No Templates", "·",
];

export default function Marquee() {
  const doubled = [...items, ...items];
  return (
    <div
      style={{
        overflow: "hidden",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "0.9rem 0",
        background: "var(--marquee-bg)",
        transition: "background 0.5s",
      }}
    >
      <div className="animate-marquee" style={{ display: "flex", gap: "2.2rem", whiteSpace: "nowrap" }}>
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "0.73rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: item === "·" ? "var(--accent)" : "var(--muted)",
              display: "flex",
              alignItems: "center",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
