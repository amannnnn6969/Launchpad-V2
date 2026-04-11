"use client";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Scroll to top"
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 500,
        width: 44,
        height: 44,
        borderRadius: "50%",
        border: "1px solid rgba(79,142,255,0.35)",
        background: hovered
          ? "rgba(79,142,255,0.25)"
          : "rgba(5,13,26,0.65)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? "translateY(-3px)" : "translateY(0)"
          : "translateY(12px)",
        transition: "opacity 0.35s ease, transform 0.35s ease, background 0.2s ease, border-color 0.2s ease",
        pointerEvents: visible ? "auto" : "none",
        boxShadow: hovered ? "0 0 20px rgba(79,142,255,0.35)" : "none",
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="rgba(79,142,255,0.9)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="3 10 8 5 13 10" />
      </svg>
    </button>
  );
}
