"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MorphingText } from "@/components/ui/liquid-text";
import { HeroShapes } from "@/components/ui/shape-landing-hero";
import { HoverButton } from "@/components/ui/hover-button";

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const sync = () => setIsMobile(window.innerWidth < 720);
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1567ff]/[0.05] via-transparent to-[#533626]/[0.05] blur-3xl" />

      {/* Floating shapes background */}
      <HeroShapes />

      {/* Content */}
      <div className="relative z-10 page-shell" style={{ textAlign: "center" }}>
        {/* Badge / Kicker */}
        <motion.div
          custom={0}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-md mb-8 md:mb-12"
          style={{
            background: "rgba(21, 103, 255, 0.08)",
            border: "1px solid rgba(21, 103, 255, 0.25)",
            marginTop: 80,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "999px",
              background: "#1567ff",
              boxShadow: "0 0 16px rgba(21, 103, 255, 0.5)",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase" as const,
              color: "var(--text-soft)",
            }}
          >
            Innovation and impact
          </span>
        </motion.div>

        <motion.div
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
        >
          <h1
            className="section-title"
            style={{
              margin: "24px auto 0",
              maxWidth: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.1em",
            }}
          >
            <span style={{ fontWeight: 700, letterSpacing: "-0.04em", fontSize: isMobile ? "3.5rem" : "clamp(4.5rem, 9vw, 7.5rem)" }}>
              Launch<span className="gradient-text">pad</span>
            </span>
            <span style={{ fontWeight: 700, letterSpacing: "-0.02em", fontSize: isMobile ? "2rem" : "clamp(2.8rem, 6vw, 4.5rem)" }}>Builds digital presence</span>
          </h1>

          <div
            style={{
              fontFamily: "'Clash Display', sans-serif",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "0.4em",
              fontSize: isMobile ? "1.6rem" : "clamp(2rem, 4vw, 2.8rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            <span
              className="gradient-text"
              style={{
                display: "inline-flex",
                gap: "0.18em",
                justifyContent: "center",
                letterSpacing: "-0.015em",
                whiteSpace: "nowrap",
              }}
            >
              <span>that</span>
              <span>feels</span>
            </span>
            <MorphingText
              texts={["unforgettable", "cinematic", "magnetic", "iconic", "timeless"]}
              className="!relative !h-[1.4em] !pb-[0.1em] !w-[9ch] sm:!w-[12ch] md:!w-[14ch] !max-w-none !leading-[1.1] !mx-auto"
            />
          </div>
        </motion.div>

        <motion.p
          custom={2}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="section-copy"
          style={{
            maxWidth: 540,
            margin: "26px auto 0",
            fontSize: isMobile ? "0.92rem" : "0.98rem",
            lineHeight: 1.8,
          }}
        >
          We design fast, modern websites that make brands look premium and convert better.
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          style={{
            marginTop: 30,
            display: "flex",
            justifyContent: "center",
            gap: 14,
            flexWrap: "wrap" as const,
          }}
        >
          <button className="button-primary" onClick={() => scrollTo("contact")}>
            Book a strategy call
          </button>
          <HoverButton onClick={() => scrollTo("portfolio")}>
            See our work
          </HoverButton>
        </motion.div>
      </div>

      {/* Fade edges */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/80 pointer-events-none" />
    </section>
  );
}
