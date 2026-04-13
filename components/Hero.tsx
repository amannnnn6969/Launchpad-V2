"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, animate, useMotionValue, useMotionTemplate, useTransform, useSpring } from "framer-motion";
import { useTheme } from "./ThemeProvider";


const CHARS = "abcdefghijklmnopqrstuvwxyz";

function useScramble(target: string, trigger: boolean) {
  const [display, setDisplay] = React.useState(target);
  const frameRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    if (!trigger) return;
    let iteration = 0;
    const totalFrames = target.length * 2;

    const step = () => {
      setDisplay(
        target
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration / 3) return target[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      iteration++;
      if (iteration <= totalFrames) {
        frameRef.current = setTimeout(step, 65);
      } else {
        setDisplay(target);
      }
    };

    step();
    return () => { if (frameRef.current) clearTimeout(frameRef.current); };
  }, [target, trigger]);

  return display;
}

function ScrambleText({ phrases }: { phrases: string[] }) {
  const [index, setIndex] = React.useState(0);
  const [trigger, setTrigger] = React.useState(true);

  React.useEffect(() => {
    const id = setInterval(() => {
      setIndex(i => (i + 1) % phrases.length);
      setTrigger(false);
      setTimeout(() => setTrigger(true), 50);
    }, 3800);
    return () => clearInterval(id);
  }, [phrases]);

  const display = useScramble(phrases[index], trigger);

  return (
    <span style={{ color: "var(--accent)", display: "inline-block", minWidth: "100%", textAlign: "center" }}>
      {display}
    </span>
  );
}


export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  useEffect(() => { themeRef.current = theme; }, [theme]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Magnetic button 1 — smooth spring on both approach and release
  const vxRaw = useMotionValue(0);
  const vyRaw = useMotionValue(0);
  const vx = useSpring(vxRaw, { stiffness: 200, damping: 20, mass: 0.5 });
  const vy = useSpring(vyRaw, { stiffness: 200, damping: 20, mass: 0.5 });
  const vpx = useMotionValue(50);
  const vpy = useMotionValue(50);
  const vGlowX = useTransform(vpx, (v) => v + "%");
  const vGlowY = useTransform(vpy, (v) => v + "%");
  const vGlow = useMotionTemplate`radial-gradient(circle at ${vGlowX} ${vGlowY}, rgba(255,255,255,0.18), transparent 40%)`;

  // Magnetic button 2
  const sxRaw = useMotionValue(0);
  const syRaw = useMotionValue(0);
  const sx = useSpring(sxRaw, { stiffness: 200, damping: 20, mass: 0.5 });
  const sy = useSpring(syRaw, { stiffness: 200, damping: 20, mass: 0.5 });
  const spx = useMotionValue(50);
  const spy = useMotionValue(50);
  const sGlowX = useTransform(spx, (v) => v + "%");
  const sGlowY = useTransform(spy, (v) => v + "%");
  const sGlow = useMotionTemplate`radial-gradient(circle at ${sGlowX} ${sGlowY}, rgba(255,255,255,0.1), transparent 40%)`;

  useEffect(() => {
    let THREE: typeof import("three");
    let renderer: import("three").WebGLRenderer;
    let animId: number;

    (async () => {
      THREE = await import("three");
      const canvas = canvasRef.current;
      if (!canvas) return;

      const mobileViewport = window.innerWidth < 768;
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobileViewport ? 1 : 2));
      renderer.setSize(window.innerWidth, window.innerHeight);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.z = 5;

      const getColor = (dark: boolean, type: "main" | "ring2") => {
        if (type === "main") return dark ? 0x3d8bff : 0x1a5cff;
        return dark ? 0x6aaeff : 0x5580ff;
      };

      const isDark = () => themeRef.current === "dark";

      const mat = new THREE.MeshStandardMaterial({ color: getColor(isDark(), "main"), wireframe: true, opacity: 0.22, transparent: true });
      const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(1.6, 1), mat);
      scene.add(mesh);

      const mat2 = new THREE.MeshBasicMaterial({ color: getColor(isDark(), "main"), opacity: 0.13, transparent: true });
      const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.9, 0.014, 8, 80), mat2);
      ring1.rotation.x = Math.PI / 2.5;
      scene.add(ring1);

      const mat3 = new THREE.MeshBasicMaterial({ color: getColor(isDark(), "ring2"), opacity: 0.09, transparent: true });
      const ring2 = new THREE.Mesh(new THREE.TorusGeometry(4.0, 0.009, 8, 80), mat3);
      ring2.rotation.x = Math.PI / 3; ring2.rotation.z = 0.5;
      scene.add(ring2);

      const pmat = new THREE.PointsMaterial({ color: getColor(isDark(), "main"), size: 0.035, transparent: true, opacity: 0.45 });
      const pos = new Float32Array(200 * 3);
      for (let i = 0; i < 600; i++) pos[i] = (Math.random() - 0.5) * 16;
      const particles = new THREE.BufferGeometry();
      particles.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      scene.add(new THREE.Points(particles, pmat));

      const light = new THREE.PointLight(0x3d8bff, 2.5, 12);
      light.position.set(2, 2, 3);
      scene.add(light, new THREE.AmbientLight(0xffffff, 0.15));

      let mouseX = 0, mouseY = 0;
      const onMove = (e: globalThis.MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("mousemove", onMove);

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", onResize);

      const animate = () => {
        animId = requestAnimationFrame(animate);
        const dark = isDark();
        mat.color.setHex(getColor(dark, "main"));
        mat2.color.setHex(getColor(dark, "main"));
        mat3.color.setHex(getColor(dark, "ring2"));
        pmat.color.setHex(getColor(dark, "main"));

        mesh.rotation.x += 0.003;
        mesh.rotation.y += 0.005;
        camera.position.x += (mouseX * 0.6 - camera.position.x) * 0.04;
        camera.position.y += (mouseY * 0.4 - camera.position.y) * 0.04;
        camera.lookAt(scene.position);
        ring1.rotation.z += 0.0018;
        ring2.rotation.y += 0.0025;
        renderer.render(scene, camera);
      };
      animate();

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
      };
    })();

    return () => { if (animId) cancelAnimationFrame(animId); };
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        paddingTop: isMobile ? "70px" : "88px",
        paddingLeft: isMobile ? "1.5rem" : "2rem",
        paddingRight: isMobile ? "1.5rem" : "2rem",
      }}
    >
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, zIndex: 0 }} />

      {/* Film grain overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
          opacity: 0.035,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          width: "100%",
          maxWidth: isMobile ? "100%" : 680,
          margin: "auto",
          paddingBottom: isMobile ? "5rem" : "7rem",
        }}
      >
        <h1
          className="animate-fade-up-2"
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: isMobile ? "clamp(1.2rem, 5vw, 1.6rem)" : "clamp(2rem, 4.2vw, 4.2rem)",
            lineHeight: isMobile ? 1.08 : 1.0,
            letterSpacing: "-0.04em",
            marginBottom: isMobile ? "0.9rem" : "1.8rem",
            color: "var(--text)",
            wordBreak: "break-word",
            overflowWrap: "normal",
            textAlign: "center",
          }}
        >
          We build
          <br />
          web experiences
          <br />
          that
          <br />
          <ScrambleText phrases={["demand attention.", "convert visitors.", "outlast trends.", "reflect your craft."]} />
        </h1>

        <p
          className="animate-fade-up-3"
          style={{
            fontSize: isMobile ? "0.82rem" : "1.03rem",
            color: "var(--text2)",
            lineHeight: 1.75,
            maxWidth: 460,
            margin: isMobile ? "0 auto 1.4rem" : "0 auto 2.5rem",
          }}
        >
          Custom-coded in Next.js. Cinematic in motion. Built for brands that refuse to blend in.
        </p>

        <div
          className="animate-fade-up-4"
          style={{
            display: "flex",
            gap: isMobile ? "0.6rem" : "1rem",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: isMobile ? "column" : "row",
            flexWrap: "wrap",
            width: isMobile ? "100%" : "auto",
          }}
        >
          {/* Button 1 — View selected work */}
          <motion.button
            onClick={() => scrollTo("portfolio")}
            onPointerMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const ox = e.clientX - rect.left;
              const oy = e.clientY - rect.top;
              vxRaw.set(((ox - rect.width / 2) / rect.width) * 8);
              vyRaw.set(((oy - rect.height / 2) / rect.height) * 6);
              vpx.set((ox / rect.width) * 100);
              vpy.set((oy / rect.height) * 100);
            }}
            onPointerLeave={() => {
              vxRaw.set(0);
              vyRaw.set(0);
            }}
            whileTap={{ scale: 0.97 }}
            style={{
              x: vx,
              y: vy,
              position: "relative",
              overflow: "hidden",
              background: "var(--accent)",
              color: "#fff",
              border: "none",
              padding: isMobile ? "0.75rem 1.8rem" : "0.85rem 2.2rem",
              borderRadius: "2rem",
              fontSize: isMobile ? "0.85rem" : "0.95rem",
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
              width: isMobile ? "100%" : "auto",
              maxWidth: isMobile ? "320px" : "none",
              willChange: "transform",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <motion.span
              aria-hidden
              style={{ background: vGlow, position: "absolute", inset: 0, opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <span style={{ position: "relative", zIndex: 1 }}>View selected work →</span>
          </motion.button>

          {/* Button 2 — Start a project */}
          <motion.button
            onClick={() => scrollTo("contact")}
            onPointerMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const ox = e.clientX - rect.left;
              const oy = e.clientY - rect.top;
              sxRaw.set(((ox - rect.width / 2) / rect.width) * 8);
              syRaw.set(((oy - rect.height / 2) / rect.height) * 6);
              spx.set((ox / rect.width) * 100);
              spy.set((oy / rect.height) * 100);
            }}
            onPointerLeave={() => {
              sxRaw.set(0);
              syRaw.set(0);
            }}
            whileTap={{ scale: 0.97 }}
            style={{
              x: sx,
              y: sy,
              position: "relative",
              overflow: "hidden",
              background: "transparent",
              color: "var(--text)",
              border: "1.5px solid var(--border2)",
              padding: isMobile ? "0.75rem 1.8rem" : "0.85rem 2.2rem",
              borderRadius: "2rem",
              fontSize: isMobile ? "0.85rem" : "0.95rem",
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
              width: isMobile ? "100%" : "auto",
              maxWidth: isMobile ? "320px" : "none",
              willChange: "transform",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <motion.span
              aria-hidden
              style={{ background: sGlow, position: "absolute", inset: 0, opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <span style={{ position: "relative", zIndex: 1 }}>Start a project</span>
          </motion.button>
        </div>
      </div>

      {/* Bottom info strip */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 3,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: isMobile ? "0.9rem 1.5rem" : "1rem clamp(2rem, 8vw, 9rem)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "linear-gradient(to top, rgba(5,13,26,0.6), transparent)",
          fontFamily: "Inter, sans-serif",
          fontSize: "0.65rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--muted)",
        }}
      >
        {!isMobile && <span>Mumbai, India</span>}
        <span style={{ display: "flex", alignItems: "center", gap: "0.55rem", margin: isMobile ? "0 auto" : 0 }}>
          <span className="hero-status-dot" />
          Currently taking projects
        </span>
        {!isMobile && <span>© 2025 Launchpad</span>}
      </div>
    </section>
  );
}
