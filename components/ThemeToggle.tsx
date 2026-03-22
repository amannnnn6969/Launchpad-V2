"use client";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <div
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 200,
        background: "var(--surface)",
        border: "1px solid var(--border2)",
        borderRadius: "3rem",
        padding: "0.4rem",
        display: "flex",
        gap: "0.3rem",
        boxShadow: "0 4px 24px var(--accent-glow)",
      }}
    >
      {(["light", "dark"] as const).map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          style={{
            background: theme === t ? "var(--accent)" : "transparent",
            color: theme === t ? "#fff" : "var(--muted)",
            border: "none",
            borderRadius: "2rem",
            padding: "0.45rem 1rem",
            fontSize: "0.78rem",
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "Inter, sans-serif",
            transition: "background 0.25s, color 0.25s",
          }}
        >
          {t === "light" ? "☀ Light" : "☾ Dark"}
        </button>
      ))}
    </div>
  );
}
