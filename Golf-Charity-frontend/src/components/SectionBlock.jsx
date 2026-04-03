import React from "react";

export function SectionBlock({ icon, label, title, desc, children }) {
  return (
    <div style={{marginBottom:60,paddingBottom:60,borderBottom:"1px solid var(--border)"}}>
      <div className="section-label">{icon} {label}</div>
      <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:700,marginBottom:12}}>{title}</h3>
      {desc && <p style={{color:"var(--muted)",fontSize:16,maxWidth:600,lineHeight:1.7}}>{desc}</p>}
      {children}
    </div>
  );
}
