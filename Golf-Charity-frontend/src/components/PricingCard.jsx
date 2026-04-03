import React from "react";

export function PricingCard({ name, price, period, tag, features, cta, accent, note, onSubscribe }) {
  return (
    <div style={{
      background: accent ? "var(--accent)" : "var(--surface)",
      color: accent ? "#fff" : "var(--ink)",
      borderRadius:20,
      padding:"36px 30px",
      border: accent ? "none" : "1px solid var(--border)",
      boxShadow: accent ? "0 8px 48px rgba(45,106,79,0.25)" : "var(--shadow)",
      position:"relative"
    }}>
      {tag && (
        <div style={{
          position:"absolute",top:-14,left:"50%",transform:"translateX(-50%)",
          background:"var(--gold)",color:"#fff",
          padding:"4px 18px",borderRadius:50,
          fontSize:12,fontWeight:700,whiteSpace:"nowrap"
        }}>{tag}</div>
      )}
      <div style={{marginBottom:4,fontWeight:600,fontSize:15,opacity:accent?0.8:1}}>{name}</div>
      <div style={{display:"flex",alignItems:"flex-end",gap:4,marginBottom:note?6:24}}>
        <span style={{fontFamily:"'Playfair Display',serif",fontSize:52,fontWeight:900,lineHeight:1}}>{price}</span>
        <span style={{fontSize:14,opacity:0.6,paddingBottom:8}}>{period}</span>
      </div>
      {note && <div style={{fontSize:13,opacity:0.7,marginBottom:24}}>{note}</div>}
      <ul style={{listStyle:"none",marginBottom:28,display:"flex",flexDirection:"column",gap:10}}>
        {features.map(f => (
          <li key={f} style={{display:"flex",alignItems:"flex-start",gap:8,fontSize:14,opacity:accent?0.9:1}}>
            <span style={{color: accent?"#a8d5b8":"var(--accent)",fontWeight:700,marginTop:1}}>✓</span>
            {f}
          </li>
        ))}
      </ul>
      <button 
        onClick={onSubscribe}
        style={{
          width:"100%",padding:"14px 0",borderRadius:50,
          background: accent ? "#fff" : "var(--accent)",
          color: accent ? "var(--accent)" : "#fff",
          fontWeight:700,fontSize:15,border:"none",cursor:"pointer",
          transition:"opacity 0.2s"
        }} onMouseEnter={e=>e.currentTarget.style.opacity="0.9"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
        {cta}
      </button>
    </div>
  );
}
