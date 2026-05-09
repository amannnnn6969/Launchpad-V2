"use client";

import { useEffect, useState } from "react";

const services = [
  {
    title: "Brand Systems",
    desc: "Identity direction that feels expensive, sharp, and inevitable.",
    icon: "rocket",
    className: "service-card service-card--wide",
  },
  {
    title: "Web Experiences",
    desc: "Frictionless premium sites with motion and depth.",
    icon: "compass",
    className: "service-card",
  },
  {
    title: "Motion Language",
    desc: "Interactive reveals, kinetic type, and digital-rich transitions.",
    icon: "grid",
    className: "service-card",
  },
  {
    title: "Storytelling",
    desc: "Pitch decks and landing pages with product-grade clarity.",
    icon: "frame",
    className: "service-card service-card--wide service-card--image",
  },
  {
    title: "Conversion UX",
    desc: "Pages tuned for trust and response.",
    icon: "chart",
    className: "service-card service-card--small",
  },
];

function Icon({ name }: { name: string }) {
  const glyphs: Record<string, string> = {
    rocket: "↗",
    compass: "A",
    grid: "▦",
    frame: "▣",
    chart: "◫",
  };

  return <span className="service-icon">{glyphs[name]}</span>;
}

export default function Services() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const sync = () => setIsMobile(window.innerWidth < 720);
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  return (
    <section id="services" style={{ padding: isMobile ? "36px 0 58px" : "42px 0 74px" }}>
      <div className="page-shell">
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
          <div className="section-kicker" style={{ marginInline: "auto" }}>
            Core stack
          </div>
          <h2 className="section-title section-title--medium" style={{ marginTop: 18 }}>
            A modular creative stack built for modern launch cycles
          </h2>
          <p className="section-copy" style={{ marginTop: 12, fontSize: "0.9rem" }}>
            All feel like the same premium product.
          </p>
        </div>

        <div className="services-bento">
          {services.map((service) => (
            <article key={service.title} className={service.className}>
              <div>
                <Icon name={service.icon} />
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
              {service.title === "Storytelling" && <div className="service-thumb" aria-hidden />}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
