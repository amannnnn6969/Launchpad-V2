"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const industries = [
  "AI",
  "SaaS",
  "Fintech",
  "Healthcare",
  "Creative agency",
  "DTC",
  "Professional services",
  "Other",
];

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: true });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [form, setForm] = useState({
    name: "",
    business: "",
    email: "",
    industry: "",
    message: "",
  });

  useEffect(() => {
    const sync = () => setIsMobile(window.innerWidth < 768);
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await fetch("https://formspree.io/f/meerboed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
    } catch {
      alert("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.03)",
    color: "var(--text)",
    padding: "16px",
    outline: "none",
    fontSize: "0.95rem"
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    color: "var(--text-soft)",
    fontSize: "0.75rem",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    marginBottom: 8,
    fontFamily: "'Clash Display', sans-serif"
  };

  return (
    <section id="contact" style={{ padding: isMobile ? "60px 0" : "100px 0" }}>
      <div className="page-shell" ref={ref}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? 40 : 60 }}>
          <h2 className="section-title section-title--medium" style={{ fontSize: isMobile ? "2.5rem" : "3.5rem" }}>
            Let's talk
          </h2>
          <p className="section-copy" style={{ marginTop: 12, fontSize: "0.95rem" }}>
            No pitch, no pressure. Tell us about your project and we'll tell you honestly if we're the right fit.
          </p>
        </div>

        <div
          className={`reveal ${inView ? "visible" : ""}`}
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "24px",
            padding: isMobile ? "32px 24px" : "64px",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1.5fr",
            gap: isMobile ? "48px" : "80px",
          }}
        >
          {/* Left Column */}
          <div>
            <h3 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: "1.5rem", fontWeight: 700, marginBottom: 16 }}>
              Start a conversation
            </h3>
            <p style={{ color: "var(--text-soft)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: 32 }}>
              We'll review your details and get back to you within 24 hours to schedule a quick intro call.
            </p>

            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--text)", fontSize: "0.95rem" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />
                launchpadwebagency@gmail.com
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--text)", fontSize: "0.95rem" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />
                Mumbai, India — working with clients globally
              </li>
            </ul>
          </div>

          {/* Right Column: Form */}
          <div>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <h3 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: "1.5rem", fontWeight: 700, marginBottom: 16 }}>Message sent</h3>
                <p style={{ color: "var(--text-soft)", fontSize: "0.95rem" }}>We will get back to you within 24 hours.</p>
              </div>
            ) : (
              <div style={{ display: "grid", gap: "24px" }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "24px" }}>
                  <div>
                    <label style={labelStyle}>Your name</label>
                    <input style={inputStyle} name="name" value={form.name} onChange={handleChange} placeholder="Your name" />
                  </div>
                  <div>
                    <label style={labelStyle}>Business name</label>
                    <input style={inputStyle} name="business" value={form.business} onChange={handleChange} placeholder="Your business" />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Email</label>
                  <input type="email" style={inputStyle} name="email" value={form.email} onChange={handleChange} placeholder="you@business.com" />
                </div>

                <div>
                  <label style={labelStyle}>Industry</label>
                  <select name="industry" value={form.industry} onChange={handleChange} style={{ ...inputStyle, appearance: "none" }}>
                    <option value="" style={{ background: "#0a0a0a", color: "white" }}>Select your industry...</option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry} style={{ background: "#0a0a0a", color: "white" }}>{industry}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Tell us about your business</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="What do you do, who are your customers, and what's your biggest online challenge?"
                    style={{ ...inputStyle, minHeight: 120, resize: "vertical" }}
                  />
                </div>

                <button
                  className="button-primary"
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{ width: "fit-content", opacity: loading ? 0.75 : 1, padding: "0 32px", borderRadius: 6 }}
                >
                  {loading ? "Sending..." : "Send message →"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
