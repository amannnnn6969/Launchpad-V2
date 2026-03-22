const items = [
  "Restaurants", "Boutique Stores", "Law Firms", "Gyms & Studios",
  "Real Estate", "Healthcare", "Salons & Spas", "Contractors",
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
      <div className="animate-marquee" style={{ display: "flex", gap: "3rem", whiteSpace: "nowrap" }}>
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "0.73rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--muted)",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <span style={{ width: 5, height: 5, background: "var(--accent)", borderRadius: "50%", display: "inline-block", flexShrink: 0 }} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
