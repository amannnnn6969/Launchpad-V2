"use client";

import { useEffect, useState } from "react";

const projects = [
  {
    title: "Orbit Finance",
    desc: "Autonomous liquidity management for the decentralized future.",
    tag: "Fintech",
    imageClass: "project-image",
  },
  {
    title: "Nexa AI",
    desc: "Next-generation retail engine optimized for ultra-high conversion.",
    tag: "E-Commerce",
    imageClass: "project-image project-image--two",
  },
  {
    title: "Pulse Studio",
    desc: "AI-driven diagnostics platform for precision medical monitoring.",
    tag: "Healthcare",
    imageClass: "project-image project-image--three",
  },
];

export default function Portfolio() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const sync = () => setIsMobile(window.innerWidth < 720);
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  return (
    <section
      id="portfolio"
      style={{
        padding: isMobile ? "50px 0 70px" : "64px 0 90px",
        background: "rgba(255,255,255,0.018)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="page-shell">
        <div className="portfolio-head">
          <div>
            <p className="portfolio-kicker">Selected works</p>
            <h2 className="section-title section-title--medium">
              Case studies framed like product launches, not static screenshots.
            </h2>
            <p className="section-copy" style={{ marginTop: 14, maxWidth: 660 }}>
              Use rich atmospheres, high-contrast overlays, and metadata chips to make
              every project feel like a premium artifact.
            </p>
          </div>
          <button className="portfolio-link">View All Projects {'->'}</button>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <article key={project.title} className="project-card">
              <div className={project.imageClass}>
                <span>{project.tag}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
              <button>View case study {'->'}</button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
