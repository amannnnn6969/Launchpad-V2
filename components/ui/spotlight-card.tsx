"use client";

import type { CSSProperties, PointerEvent, ReactNode } from "react";
import { useRef } from "react";

interface GlowCardProps {
  children?: ReactNode;
  className?: string;
  glowColor?: "ice" | "sky" | "blue" | "cobalt" | "indigo";
  customSize?: boolean;
  style?: CSSProperties;
}

const glowColorMap = {
  ice: { base: 194, spread: 12 },
  sky: { base: 202, spread: 14 },
  blue: { base: 210, spread: 16 },
  cobalt: { base: 220, spread: 14 },
  indigo: { base: 230, spread: 12 }
} as const;

const glowStyles = `
  [data-glow-card] {
    transform:
      perspective(1200px)
      rotateX(calc(var(--rx, 0) * 1deg))
      rotateY(calc(var(--ry, 0) * 1deg))
      translate3d(0, calc(var(--lift, 0) * 1px), 0)
      scale(calc(1 + (var(--active, 0) * 0.012)));
    transform-style: preserve-3d;
    will-change: transform;
  }
  [data-glow-card]::before,
  [data-glow-card]::after {
    pointer-events: none;
    content: "";
    position: absolute;
    inset: calc(var(--border-size) * -1);
    border: var(--border-size) solid transparent;
    border-radius: inherit;
    background-attachment: fixed;
    background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
    background-repeat: no-repeat;
    background-position: 50% 50%;
    mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
    mask-clip: padding-box, border-box;
    mask-composite: intersect;
    opacity: var(--active, 0);
    transition: opacity 220ms ease;
  }
  [data-glow-card]::before {
    background-image: radial-gradient(
      calc(var(--spotlight-size) * 0.8) calc(var(--spotlight-size) * 0.8) at
      calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
      hsl(var(--hue, 210) 92% 67% / 0.95),
      transparent 100%
    );
    filter: brightness(1.55);
  }
  [data-glow-card]::after {
    background-image: radial-gradient(
      calc(var(--spotlight-size) * 0.45) calc(var(--spotlight-size) * 0.45) at
      calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
      hsl(var(--hue, 210) 100% 92% / 0.9),
      transparent 100%
    );
  }
  [data-glow-card] [data-glow-card-inner] {
    position: absolute;
    inset: 0;
    opacity: calc(var(--active, 0) * var(--outer, 1));
    will-change: filter;
    border-radius: inherit;
    pointer-events: none;
    border: none;
    transition: opacity 220ms ease;
  }
  [data-glow-card] [data-glow-card-content] {
    position: relative;
    z-index: 2;
    transform:
      translate3d(
        calc(var(--ry, 0) * -0.45px),
        calc(var(--rx, 0) * 0.45px),
        calc(16px + (var(--active, 0) * 14px))
      );
    transform-style: preserve-3d;
    transition: transform 180ms ease;
  }
`;

function GlowCard({ children, className, glowColor = "blue", style }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { base, spread } = glowColorMap[glowColor];

  const getInlineStyles = (): CSSProperties & Record<string, string | number> => ({
    "--base": base,
    "--spread": spread,
    "--x": 120,
    "--y": 120,
    "--xp": 0.5,
    "--yp": 0.5,
    "--rx": 0,
    "--ry": 0,
    "--lift": 0,
    "--active": 0,
    "--radius": 22,
    "--border": 1.5,
    "--backdrop": "rgba(16, 31, 58, 0.85)",
    "--backup-border": "rgba(79, 142, 255, 0.18)",
    "--size": 220,
    "--outer": 1,
    "--border-size": "calc(var(--border, 1.5) * 1px)",
    "--spotlight-size": "calc(var(--size, 220) * 1px)",
    "--hue": "calc(var(--base) + ((var(--xp, 0.5) - 0.5) * var(--spread, 0)))",
    backgroundImage: "radial-gradient(var(--spotlight-size) var(--spotlight-size) at calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px), hsl(var(--hue, 210) 96% 72% / calc(var(--active, 0) * 0.14)), transparent)",
    backgroundColor: "var(--backdrop)",
    border: "var(--border-size) solid var(--backup-border)",
    position: "relative",
    touchAction: "none",
    borderRadius: "1.2rem",
    boxShadow: "0 22px 45px -28px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.03)",
    transition: "transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease",
    overflow: "hidden",
    ...style,
  });

  const syncPointer = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const px = x / rect.width - 0.5;
    const py = y / rect.height - 0.5;
    if (!cardRef.current) return;
    cardRef.current.style.setProperty("--x", x.toFixed(2));
    cardRef.current.style.setProperty("--xp", (x / rect.width).toFixed(3));
    cardRef.current.style.setProperty("--y", y.toFixed(2));
    cardRef.current.style.setProperty("--yp", (y / rect.height).toFixed(3));
    cardRef.current.style.setProperty("--rx", (-py * 8).toFixed(2));
    cardRef.current.style.setProperty("--ry", (px * 10).toFixed(2));
    cardRef.current.style.setProperty("--lift", "-4");
    cardRef.current.style.setProperty("--active", "1");
    cardRef.current.style.boxShadow = "0 30px 55px -30px rgba(0,0,0,0.95), 0 0 0 1px rgba(79,142,255,0.12), inset 0 1px 0 rgba(255,255,255,0.05)";
  };

  const resetPointer = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty("--rx", "0");
    cardRef.current.style.setProperty("--ry", "0");
    cardRef.current.style.setProperty("--lift", "0");
    cardRef.current.style.setProperty("--active", "0");
    cardRef.current.style.boxShadow = "0 22px 45px -28px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.03)";
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: glowStyles }} />
      <div
        ref={cardRef}
        data-glow-card
        style={getInlineStyles()}
        onPointerMove={syncPointer}
        onPointerEnter={syncPointer}
        onPointerLeave={resetPointer}
        className={className}
      >
        <div data-glow-card-inner />
        <div data-glow-card-content>{children}</div>
      </div>
    </>
  );
}

export { GlowCard };
