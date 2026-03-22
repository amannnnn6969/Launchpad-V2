"use client";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const industries = [
  "Restaurant / Food & Beverage", "Retail / Boutique Store", "Law Firm / Legal Services",
  "Healthcare / Clinic", "Gym / Fitness Studio", "Real Estate",
  "Salon / Spa / Beauty", "Construction / Contractors", "Other",
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const inputStyle: React.CSSProperties = {
    background: "var(--surface2)", border: "1px solid var(--border)",
    borderRadius: "0.7rem", padding: "0.8rem 1rem",
    fontSize: "0.9rem", color: "var(--text)", fontFamily: "Inter, sans-serif",
    outline: "none", width: "100%", transition: "border-color 0.2s, box-shadow 0.2s",
  };
  const labelStyle: React.CSSProperties = {
    fontSize: "0.75rem", letterSpacing: "0.06em",
    textTransform: "uppercase", color: "var(--muted)",
    marginBottom: "0.4rem", display: "block",
  };

  return (
    <div id="contact" style={{
      background: "var(--surface)", border: "1px solid var(--border)",
      borderRadius: isMobile ? "1.2rem" : "2rem",
      padding: isMobile ? "3rem 1.5rem" : "5rem 3rem",
      maxWidth: 1200, margin: isMobile ? "0 1rem 2rem" : "0 auto 4rem",
      transition: "background 0.5s",
    }}>
      <div ref={ref} className={`reveal ${inView ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: isMobile ? "1.8rem" : "clamp(1.9rem,3.5vw,2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text)" }}>Let&apos;s talk</h2>
        <p style={{ color: "var(--muted)", marginTop: "0.7rem" }}>Tell us about your business — we&apos;ll show you exactly how we&apos;d grow it online.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.4fr", gap: isMobile ? "2rem" : "4rem", alignItems: "start" }}>
        {/* Info */}
        <div className={`reveal ${inView ? "visible" : ""}`}>
          <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: "1.3rem", fontWeight: 800, color: "var(--text)", marginBottom: "1rem" }}>Get your free audit</h3>
          <p style={{ color: "var(--text2)", lineHeight: 1.8, fontSize: "0.92rem", marginBottom: "1.5rem" }}>No pitch, no pressure. We&apos;ll look at your current online presence and give you an honest breakdown of what&apos;s working and what isn&apos;t.</p>
          {[["📧", "launchpadwebagency@gmail.com"], ["📞", "+91 99952 69743"], ["📍", "Dubai, UAE — serving clients nationwide"]].map(([icon, text]) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1rem", color: "var(--text2)", fontSize: "0.88rem" }}>
              <div style={{ width: 34, height: 34, background: "var(--accent-glow)", border: "1px solid var(--border2)", borderRadius: "0.6rem", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.95rem", flexShrink: 0 }}>{icon}</div>
              {text}
            </div>
          ))}
        </div>

        {/* Form */}
        <div className={`reveal ${inView ? "visible" : ""}`} style={{ transitionDelay: "100ms" }}>
          {submitted ? (
            <div style={{ background: "var(--accent-glow)", border: "1px solid var(--border2)", borderRadius: "1rem", padding: "2rem", textAlign: "center", color: "var(--accent)", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.1rem" }}>
              🎉 Message sent! We&apos;ll be in touch within 24 hours.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* Always single column on mobile, 2-col on desktop */}
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1rem" }}>
                <div><label style={labelStyle}>Your name</label><input style={inputStyle} placeholder="Rahul Sharma" /></div>
                <div><label style={labelStyle}>Business name</label><input style={inputStyle} placeholder="Sharma & Co." /></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1rem" }}>
                <div><label style={labelStyle}>Email</label><input type="email" style={inputStyle} placeholder="rahul@business.com" /></div>
                <div><label style={labelStyle}>Phone</label><input type="tel" style={inputStyle} placeholder="+91 98765 43210" /></div>
              </div>
              <div>
                <label style={labelStyle}>Industry</label>
                <select style={{ ...inputStyle, cursor: "pointer" }}>
                  <option value="">Select your industry...</option>
                  {industries.map((ind) => <option key={ind}>{ind}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Tell us about your business</label>
                <textarea style={{ ...inputStyle, minHeight: 110, resize: "vertical" }} placeholder="What do you do, who are your customers, and what's your biggest online challenge?" />
              </div>
              <button onClick={() => setSubmitted(true)} style={{ background: "var(--accent)", color: "#fff", border: "none", padding: "0.9rem 2.4rem", borderRadius: "2rem", fontSize: "0.95rem", fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif", alignSelf: isMobile ? "stretch" : "flex-start", marginTop: "0.5rem", transition: "transform 0.2s, box-shadow 0.2s", textAlign: "center" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 28px var(--accent-glow)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
              >Send message →</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
