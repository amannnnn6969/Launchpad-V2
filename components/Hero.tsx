"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  useEffect(() => { themeRef.current = theme; }, [theme]);

  useEffect(() => {
    let THREE: typeof import("three");
    let renderer: import("three").WebGLRenderer;
    let animId: number;

    (async () => {
      THREE = await import("three");
      const canvas = canvasRef.current;
      if (!canvas) return;

      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
      const onMove = (e: MouseEvent) => {
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
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 820, padding: "0 2rem" }}>
        <p className="animate-fade-up-1" style={{ fontSize: "0.76rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1.5rem" }}>
          ✦ Web Agency for Local Businesses
        </p>

        <h1
          className="animate-fade-up-2"
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2.8rem, 7.5vw, 6rem)",
            lineHeight: 1.02,
            letterSpacing: "-0.04em",
            marginBottom: "1.8rem",
            color: "var(--text)",
          }}
        >
          You&apos;re great locally.
          <br />
          Let&apos;s make you{" "}
          <em
            style={{
              color: "var(--accent)",
              fontStyle: "normal",
              position: "relative",
              display: "inline-block",
            }}
          >
            unstoppable
            <span
              style={{
                position: "absolute",
                bottom: 3,
                left: 0,
                right: 0,
                height: 3,
                background: "var(--accent)",
                borderRadius: 2,
                opacity: 0.5,
                display: "block",
              }}
            />
          </em>{" "}
          online.
        </h1>

        <p
          className="animate-fade-up-3"
          style={{
            fontSize: "1.03rem",
            color: "var(--text2)",
            lineHeight: 1.75,
            maxWidth: 520,
            margin: "0 auto 2.5rem",
          }}
        >
          We build jaw-dropping, high-converting websites for businesses that
          have mastered their craft — and deserve a digital presence that
          matches.
        </p>

        <div className="animate-fade-up-4" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button
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
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 28px var(--accent-glow)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            See our work ↗
          </button>
          <button
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
              transition: "border-color 0.2s, background 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
              (e.currentTarget as HTMLElement).style.background = "var(--accent-glow)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border2)";
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            Book a free call
          </button>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="animate-fade-up-5"
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
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
    </section>
  );
}
