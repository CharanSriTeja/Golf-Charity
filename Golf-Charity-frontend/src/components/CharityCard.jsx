import React from "react";
import { useNavigate } from "react-router-dom";

export function CharityCard({ charity: c }) {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/charities/${c.id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div style={{
      background: "var(--surface)", borderRadius: "var(--radius)",
      border: "1px solid var(--border)", overflow: "hidden",
      transition: "box-shadow 0.2s, transform 0.2s",
      cursor: "pointer"
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = "var(--shadow)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
    >
      <div style={{ background: c.color, height: 100, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48 }}>
        {c.icon}
      </div>
      <div style={{ padding: "20px 22px 22px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700 }}>{c.name}</h3>
          <span className="tag">{c.category}</span>
        </div>
        <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6, marginBottom: 16 }}>{c.desc}</p>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "10px 14px", background: "var(--accent-light)", borderRadius: 8, marginBottom: 16
        }}>
          <span style={{ fontSize: 13, color: "var(--accent)", fontWeight: 600 }}>Donation %</span>
          <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, color: "var(--accent)", fontSize: 18 }}>{c.pct}%</span>
        </div>
        <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 16 }}>📊 {c.impact}</div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn-primary" style={{ flex: 1, textAlign: "center", padding: "9px 0", fontSize: 13 }} onClick={handleView}>
            Learn more
          </button>
          <button onClick={() => navigate("/signup")} className="btn-outline" style={{ flex: 1, textAlign: "center", padding: "9px 0", fontSize: 13 }}>
            Donate
          </button>
        </div>
      </div>
    </div>
  );
}
