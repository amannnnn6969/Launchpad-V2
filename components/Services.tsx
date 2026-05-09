"use client";

import { useEffect, useState } from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export default function Services() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const sync = () => setIsMobile(window.innerWidth < 768);
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  const services = [
    {
      num: "01",
      title: "Custom Web Development",
      desc: "Hand-coded in Next.js 14. No templates, no shortcuts. Every interaction is intentional, every pixel earns its place."
    },
    {
      num: "02",
      title: "Motion & Interaction Design",
      desc: "Framer Motion animations and Three.js experiences that make visitors stop scrolling and start feeling something."
    },
    {
      num: "03",
      title: "SEO & Performance",
      desc: "Built to rank and built to load. Core Web Vitals optimized from the ground up, not bolted on after."
    },
    {
      num: "04",
      title: "E-commerce & Booking Systems",
      desc: "Revenue infrastructure that runs while you sleep — stores, bookings, memberships, all seamlessly integrated."
    },
    {
      num: "05",
      title: "Brand & Visual Identity",
      desc: "Typography systems, colour palettes, design language. We build brands that look like they belong on billboards."
    },
    {
      num: "06",
      title: "Ongoing Partnership",
      desc: "We don't disappear post-launch. Monthly retainers for studios and brands that want a technical partner, not a vendor."
    }
  ];

  return (
    <section id="services" style={{ padding: isMobile ? "0px" : "0px", overflow: "hidden" }}>
      <ContainerScroll
        titleComponent={
          <h2 className="section-title section-title--medium" style={{ fontSize: isMobile ? "2.5rem" : "3.5rem" }}>
            What we do
          </h2>
        }
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: "24px",
            height: "100%",
            overflowY: "auto",
            padding: "8px"
          }}
        >
          {services.map((service) => (
            <div
              key={service.num}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                minHeight: "260px"
              }}
            >
              <div
                style={{
                  color: "var(--accent)",
                  fontSize: "0.85rem",
                  fontFamily: "'Clash Display', sans-serif",
                  fontWeight: 600,
                  marginBottom: 16
                }}
              >
                {service.num}
              </div>
              <h3
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  marginBottom: 16,
                  color: "var(--text)"
                }}
              >
                {service.title}
              </h3>
              <p style={{ color: "var(--text-soft)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </ContainerScroll>
    </section>
  );
}
