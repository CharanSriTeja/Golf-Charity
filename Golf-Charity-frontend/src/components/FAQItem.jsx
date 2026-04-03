import React, { useState } from "react";

export function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{borderBottom:"1px solid var(--border)",padding:"16px 0"}}>
      <div style={{
        display:"flex",justifyContent:"space-between",cursor:"pointer",
        fontWeight:600,fontSize:15,userSelect:"none"
      }} onClick={() => setOpen(o => !o)}>
        {q}
        <span style={{color:"var(--muted)",transition:"transform 0.2s",transform:open?"rotate(180deg)":"none",display:"inline-block"}}>↓</span>
      </div>
      {open && <p style={{color:"var(--muted)",fontSize:14,lineHeight:1.7,marginTop:10}}>{a}</p>}
    </div>
  );
}
