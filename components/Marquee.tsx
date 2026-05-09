const items = [
  "AI",
  "SaaS",
  "Fintech",
  "Healthcare",
  "Creative studios",
  "DTC",
  "Motion systems",
  "Custom coded",
  "No templates",
  "Launch support",
];

export default function Marquee() {
  const doubled = [...items, ...items];

  return (
    <section className="section-shell">
      <div
        className="glass-panel"
        style={{
          padding: "18px 0",
          borderRadius: 24,
          background: "rgba(12,12,16,0.74)",
        }}
      >
        <div
          className="animate-marquee"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            whiteSpace: "nowrap",
          }}
        >
          {doubled.map((item, index) => (
            <span
              key={`${item}-${index}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "18px",
                fontSize: "0.82rem",
                color: "var(--text-soft)",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
              }}
            >
              <span>{item}</span>
              <span style={{ color: "var(--accent)" }}>+</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
