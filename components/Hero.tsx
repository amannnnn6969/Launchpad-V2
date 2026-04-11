"use client";

import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
 import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const PHRASES = [
  "demand attention.",
  "convert visitors.",
  "outlast trends.",
  "reflect your craft.",
];

function useMagnet(strength = 0.4) {
  const ref = useRef<HTMLButtonElement>(null);
  const handleMouseMove = (e: ReactMouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 80) {
      el.style.transition = "transform 0.15s cubic-bezier(0.23,1,0.32,1)";
      el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    }
  };
  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.4s cubic-bezier(0.23,1,0.32,1)";
    el.style.transform = "translate(0,0)";
  };
  return { ref, handleMouseMove, handleMouseLeave };
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  useEffect(() => { themeRef.current = theme; }, [theme]);

  const [phraseIndex, setPhraseIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % PHRASES.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const viewMagnet = useMagnet(0.4);
  const startMagnet = useMagnet(0.4);

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
        // Update colors from theme
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
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        overflow: "hidden",
        paddingLeft: isMobile ? "1.5rem" : "clamp(2rem, 8vw, 9rem)",
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
          textAlign: "left",
          width: "100%",
          maxWidth: isMobile ? "100%" : 680,
          paddingTop: "80px",
          paddingBottom: "80px",
        }}
      >
        <h1
          className="animate-fade-up-2"
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: isMobile ? "clamp(2rem, 8vw, 3rem)" : "clamp(2.6rem, 5.8vw, 5.2rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.04em",
            marginBottom: isMobile ? "1.2rem" : "1.8rem",
            color: "var(--text)",
            wordBreak: "break-word",
            overflowWrap: "break-word",
          }}
        >
          We build
          <br />
          web experiences
          <br />
          that
          <br />
          <span
            style={{
              position: "relative",
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "bottom",
              lineHeight: 1.15,
              paddingBottom: "0.1em",
              maxWidth: "100%",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={PHRASES[phraseIndex]}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{
                  display: "inline-block",
                  color: "var(--accent)",
                }}
              >
                {PHRASES[phraseIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>

        <p
          className="animate-fade-up-3"
          style={{
            fontSize: isMobile ? "0.9rem" : "1.03rem",
            color: "var(--text2)",
            lineHeight: 1.75,
            maxWidth: 460,
            margin: isMobile ? "0 0 1.8rem" : "0 0 2.5rem",
          }}
        >
          Custom-coded in Next.js. Cinematic in motion. Built for brands that refuse to blend in.
        </p>

        <div
          className="animate-fade-up-4"
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "flex-start",
            alignItems: isMobile ? "stretch" : "center",
            flexDirection: isMobile ? "column" : "row",
            flexWrap: "wrap",
            width: isMobile ? "100%" : "auto",
          }}
        >
          <button
            ref={viewMagnet.ref}
            onMouseMove={viewMagnet.handleMouseMove}
            onMouseLeave={viewMagnet.handleMouseLeave}
            onClick={() => scrollTo("portfolio")}
            style={{
              background: "var(--accent)",
              color: "#fff",
              border: "none",
              padding: "0.85rem 2.2rem",
              borderRadius: "2rem",
              fontSize: "0.95rem",
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
              width: isMobile ? "100%" : "auto",
              maxWidth: isMobile ? "280px" : "none",
              willChange: "transform",
            }}
          >
            View selected work →
          </button>
          <button
            ref={startMagnet.ref}
            onMouseMove={startMagnet.handleMouseMove}
            onMouseLeave={startMagnet.handleMouseLeave}
            onClick={() => scrollTo("contact")}
            style={{
              background: "transparent",
              color: "var(--text)",
              border: "1.5px solid var(--border2)",
              padding: "0.85rem 2.2rem",
              borderRadius: "2rem",
              fontSize: "0.95rem",
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
              width: isMobile ? "100%" : "auto",
              maxWidth: isMobile ? "280px" : "none",
              willChange: "transform",
            }}
          >
            Start a project
          </button>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="animate-fade-up-5"
        style={{
          position: "absolute",
          bottom: "3.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          color: "var(--muted)",
          fontSize: "0.68rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        <div
          className="animate-scroll-pulse"
          style={{
            width: 1,
            height: 44,
            background: "linear-gradient(to bottom, var(--accent), transparent)",
          }}
        />
        scroll
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
          <span
            className="hero-status-dot"
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#22c55e",
              boxShadow: "0 0 6px #22c55e",
              display: "inline-block",
            }}
          />
          Currently taking projects
        </span>
        {!isMobile && <span>© 2025 Launchpad</span>}
      </div>
    </section>
  );
}
