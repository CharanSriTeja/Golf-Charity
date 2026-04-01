import React from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";

export function CharityDetailPage({ charity }) {
  const navigate = useNavigate();

  if (!charity) {
    return (
      <div style={{paddingTop:120,textAlign:"center"}}>
        <p>No charity selected.</p>
        <button className="btn-primary" style={{marginTop:20}} onClick={() => { navigate("/charities"); window.scrollTo(0,0); }}>
          Browse charities
        </button>
      </div>
    );
  }

  const events = [
    { date: "Apr 15, 2026", title: "Fundraising Gala", desc: "Annual fundraising event in Mumbai" },
    { date: "May 3, 2026", title: "Volunteer Drive", desc: "Community volunteering day across 5 cities" },
    { date: "Jun 1, 2026", title: "Impact Report Release", desc: "Quarterly report on program outcomes" },
  ];

  return (
    <div style={{paddingTop:80}}>
      <div style={{
        background:`linear-gradient(160deg, ${charity.color} 0%, var(--bg) 100%)`,
        padding:"60px 0 40px"
      }}>
        <div className="container">
          <button style={{
            background:"none",border:"none",color:"var(--muted)",
            fontSize:14,cursor:"pointer",marginBottom:20,display:"flex",alignItems:"center",gap:6
          }} onClick={() => { navigate("/charities"); window.scrollTo(0,0); }}>
            ← Back to charities
          </button>
          <div style={{display:"flex",alignItems:"center",gap:20,marginBottom:16}}>
            <div style={{
              width:72,height:72,background:"var(--surface)",
              borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:36,boxShadow:"var(--shadow)"
            }}>{charity.icon}</div>
            <div>
              <span className="tag">{charity.category}</span>
              <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,4vw,48px)",fontWeight:700,marginTop:6}}>
                {charity.name}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{paddingTop:48,paddingBottom:80}}>
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:40,alignItems:"start"}}>
          <div>
            {/* About */}
            <div style={{marginBottom:40}}>
              <div className="section-label">About</div>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:700,marginBottom:14}}>What they do</h2>
              <p style={{color:"var(--muted)",lineHeight:1.8,fontSize:16}}>{charity.desc} Their work spans multiple states across India, focusing on sustainable impact and community-led development.</p>
            </div>

            {/* Impact Stats */}
            <div style={{marginBottom:40}}>
              <div className="section-label">Impact</div>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:700,marginBottom:20}}>Impact stats</h2>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                {[[charity.impact,"Primary metric"],["FCRA Registered","Legal status"],["10+ years","Active since"],["₹2Cr+ annual","Budget scale"]].map(([v,l]) => (
                  <div key={l} style={{
                    padding:"20px",background:"var(--surface)",
                    borderRadius:10,border:"1px solid var(--border)"
                  }}>
                    <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:18,marginBottom:4}}>{v}</div>
                    <div style={{fontSize:13,color:"var(--muted)"}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Events */}
            <div>
              <div className="section-label">Events</div>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:700,marginBottom:20}}>Upcoming events</h2>
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                {events.map(ev => (
                  <div key={ev.title} style={{
                    display:"flex",gap:16,padding:"16px 18px",
                    background:"var(--surface)",borderRadius:10,border:"1px solid var(--border)"
                  }}>
                    <div style={{
                      minWidth:52,height:52,background:"var(--accent-light)",
                      borderRadius:8,display:"flex",flexDirection:"column",
                      alignItems:"center",justifyContent:"center",
                      fontSize:11,fontWeight:700,color:"var(--accent)",lineHeight:1.3,
                      textAlign:"center",padding:4
                    }}>
                      {ev.date.split(",")[0].split(" ")[0]}<br/>
                      <span style={{fontSize:15}}>{ev.date.split(" ")[1]?.replace(",","")}</span>
                    </div>
                    <div>
                      <div style={{fontWeight:600,marginBottom:3}}>{ev.title}</div>
                      <div style={{fontSize:13,color:"var(--muted)"}}>{ev.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{position:"sticky",top:100}}>
            <div style={{
              background:"var(--surface)",borderRadius:16,
              padding:28,border:"1px solid var(--border)",
              boxShadow:"var(--shadow)"
            }}>
              <div style={{
                background:"var(--accent-light)",borderRadius:12,
                padding:"20px",textAlign:"center",marginBottom:24
              }}>
                <div style={{fontSize:13,color:"var(--accent)",fontWeight:600,marginBottom:6}}>Donation % of your subscription</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:48,fontWeight:700,color:"var(--accent)"}}>{charity.pct}%</div>
              </div>
              <button className="btn-primary" style={{width:"100%",textAlign:"center",marginBottom:12,padding:"13px 0",fontSize:15}}>
                Choose this charity
              </button>
              <button className="btn-outline" style={{width:"100%",textAlign:"center",padding:"13px 0",fontSize:15}}>
                One-time donation
              </button>
              <div style={{marginTop:20,fontSize:13,color:"var(--muted)",textAlign:"center",lineHeight:1.6}}>
                All donations verified & receipts issued under 80G of IT Act.
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
