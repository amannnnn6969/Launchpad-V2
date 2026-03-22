"use client";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <div style={{
      position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 200,
      background: "var(--surface)", border: "1px solid var(--border2)",
      borderRadius: "3rem", padding: "0.3rem",
      display: "flex", gap: "0.2rem",
      boxShadow: "0 4px 24px var(--accent-glow)",
    }}>
      {(["light", "dark"] as const).map((t) => (
        <button key={t} onClick={() => setTheme(t)} style={{
          background: theme === t ? "var(--accent)" : "transparent",
          color: theme === t ? "#fff" : "var(--muted)",
          border: "none", borderRadius: "2rem",
          padding: "0.4rem 0.7rem",
          fontSize: "1rem", cursor: "pointer",
          transition: "background 0.25s, color 0.25s",
        }}>
          {t === "light" ? "☀️" : "🌙"}
        </button>
      ))}
    </div>
  );
}
