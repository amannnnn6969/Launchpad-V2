"use client";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { MagneticText } from "@/components/ui/morphing-cursor";

export default function Statement() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      ref={ref}
      className={`reveal ${inView ? "visible" : ""}`}
      style={{
        padding: isMobile ? "4rem 1.5rem" : "7rem 3rem",
        maxWidth: 1200,
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <MagneticText
        text="Most websites apologize for their brand."
        hoverText="Yours shouldn't."
        circleSize={isMobile ? 280 : 520}
        style={{
          fontFamily: "Cormorant Garamond, serif",
          fontStyle: "italic",
          fontWeight: 300,
          color: "var(--muted)",
          fontSize: isMobile ? "clamp(1.4rem, 5vw, 2rem)" : "clamp(1.8rem, 3.5vw, 3.2rem)",
          lineHeight: 1.2,
          letterSpacing: "-0.01em",
        }}
        innerStyle={{
          fontFamily: "Syne, sans-serif",
          fontStyle: "normal",
          fontWeight: 800,
          fontSize: isMobile ? "1.4rem" : "2.2rem",
          letterSpacing: "-0.03em",
          textAlign: "center",
          lineHeight: 1.1,
        }}
      />
    </section>
  );
}
