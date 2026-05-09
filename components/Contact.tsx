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
    borderRadius: 18,
    border: "1px solid var(--border)",
    background: "rgba(255,255,255,0.03)",
    color: "var(--text)",
    padding: "15px 16px",
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    color: "var(--muted)",
    fontSize: "0.74rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    marginBottom: 8,
  };

  return (
    <section id="contact" className="section-shell">
      <div
        ref={ref}
        className={`glass-panel reveal ${inView ? "visible" : ""}`}
        style={{ padding: isMobile ? "26px 20px" : "42px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 0.9fr) minmax(0, 1.1fr)",
            gap: isMobile ? "24px" : "30px",
          }}
        >
          <div>
            <div className="section-kicker">Contact</div>
            <h2 className="section-title section-title--medium" style={{ marginTop: 22 }}>
              Bring the brief, the taste, and the deadline.
            </h2>
            <p className="section-copy" style={{ marginTop: 18, maxWidth: 460 }}>
              Tell us what you are launching and what needs to feel different. We will
              tell you plainly if we are the right fit.
            </p>

            <div
              style={{
                display: "grid",
                gap: "14px",
                marginTop: 26,
              }}
            >
              {[
                "launchpadwebagency@gmail.com",
                "Working globally from India",
                "Launch-focused web and brand systems",
              ].map((item) => (
                <div
                  key={item}
                  className="surface-card"
                  style={{
                    minHeight: 62,
                    padding: "0 18px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    background: "rgba(12,12,16,0.8)",
                  }}
                >
                  <span
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: 999,
                      background: "var(--hero-gradient)",
                      boxShadow: "0 0 14px var(--accent-glow)",
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ color: "var(--text-soft)", fontSize: "0.92rem" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="surface-card"
            style={{
              padding: isMobile ? "20px" : "24px",
              background: "rgba(12,12,16,0.92)",
            }}
          >
            {submitted ? (
              <div
                style={{
                  minHeight: 280,
                  display: "grid",
                  placeItems: "center",
                  textAlign: "center",
                  color: "var(--text)",
                }}
              >
                <div>
                  <div className="section-kicker">Message sent</div>
                  <p className="section-copy" style={{ marginTop: 18 }}>
                    We will get back to you within 24 hours.
                  </p>
                </div>
              </div>
            ) : (
              <div style={{ display: "grid", gap: "16px" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                    gap: "14px",
                  }}
                >
                  <div>
                    <label style={labelStyle}>Your name</label>
                    <input
                      style={inputStyle}
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Business name</label>
                    <input
                      style={inputStyle}
                      name="business"
                      value={form.business}
                      onChange={handleChange}
                      placeholder="Business name"
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Email</label>
                  <input
                    type="email"
                    style={inputStyle}
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                  />
                </div>

                <div>
                  <label style={labelStyle}>Industry</label>
                  <select
                    name="industry"
                    value={form.industry}
                    onChange={handleChange}
                    style={inputStyle}
                  >
                    <option value="">Select your industry</option>
                    {industries.map((industry) => (
                      <option key={industry}>{industry}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Project brief</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="What are you launching, and what should the site make people feel?"
                    style={{ ...inputStyle, minHeight: 150, resize: "vertical" }}
                  />
                </div>

                <button
                  className="button-primary"
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{
                    width: isMobile ? "100%" : "fit-content",
                    opacity: loading ? 0.75 : 1,
                  }}
                >
                  {loading ? "Sending..." : "Send inquiry"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
