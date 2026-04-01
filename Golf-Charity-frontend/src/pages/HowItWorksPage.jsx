import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

function SectionBlock({ icon, label, title, desc, children }) {
  return (
    <div style={{marginBottom:60,paddingBottom:60,borderBottom:"1px solid var(--border)"}}>
      <div className="section-label">{icon} {label}</div>
      <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:700,marginBottom:12}}>{title}</h3>
      {desc && <p style={{color:"var(--muted)",fontSize:16,maxWidth:600,lineHeight:1.7}}>{desc}</p>}
      {children}
    </div>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{borderBottom:"1px solid var(--border)",padding:"16px 0"}}>
      <div style={{
        display:"flex",justifyContent:"space-between",cursor:"pointer",
        fontWeight:600,fontSize:15,userSelect:"none"
      }} onClick={() => setOpen(o => !o)}>
        {q}
        <span style={{color:"var(--muted)",transition:"transform 0.2s",transform:open?"rotate(180deg)":"none",display:"inline-block"}}>v</span>
      </div>
      {open && <p style={{color:"var(--muted)",fontSize:14,lineHeight:1.7,marginTop:10}}>{a}</p>}
    </div>
  );
}

export function HowItWorksPage() {
  const navigate = useNavigate();

  const handleNavClick = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <div style={{paddingTop:80}}>
      <Navbar />
      
      <section className="section" style={{background:"linear-gradient(160deg,#f0faf4,var(--bg))"}}>
        <div className="container" style={{textAlign:"center"}}>
          <div className="section-label">The Full Picture</div>
          <h1 className="section-title fade-up" style={{fontSize:"clamp(36px,5vw,60px)"}}>How PlayGiveWin works</h1>
          <p className="section-sub fade-up delay-1" style={{margin:"0 auto"}}>
            From subscription to donation - a transparent, fair, and fun system.
          </p>
        </div>
      </section>

      {/* Flow Diagram */}
      <section className="section" style={{background:"var(--surface)"}}>
        <div className="container">
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:0,flexWrap:"wrap",marginBottom:60}}>
            {["Subscribe","Enter Scores","Monthly Draw","Win Prizes","Charity Donation"].map((s,i,arr) => (
              <div key={s} style={{display:"flex",alignItems:"center"}}>
                <div style={{
                  padding:"12px 20px",
                  background: i===0||i===4 ? "var(--accent)" : i===3 ? "var(--gold)" : "var(--bg)",
                  color: i===0||i===3||i===4 ? "#fff" : "var(--ink)",
                  borderRadius:50, fontWeight:600, fontSize:14,
                  border:"2px solid",
                  borderColor: i===0||i===4 ? "var(--accent)" : i===3 ? "var(--gold)" : "var(--border)",
                  whiteSpace:"nowrap"
                }}>{s}</div>
                {i < arr.length-1 && <div style={{color:"var(--muted)",fontSize:20,padding:"0 8px"}}>-&gt;</div>}
              </div>
            ))}
          </div>

          {/* Scoring */}
          <SectionBlock
            icon="Target" label="Scoring" title="How scoring works"
            desc="Each month we open a new contest with a set of match/event predictions. You earn points for accuracy."
          >
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:16,marginTop:24}}>
              {[["Exact score","5 pts"],["Correct result","3 pts"],["Correct margin","2 pts"],["Bonus streak","1-5 pts"]].map(([t,p]) => (
                <div key={t} style={{padding:"18px 20px",background:"var(--bg)",borderRadius:10,border:"1px solid var(--border)"}}>
                  <div style={{fontWeight:700,marginBottom:4}}>{t}</div>
                  <div style={{color:"var(--accent)",fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700}}>{p}</div>
                </div>
              ))}
            </div>
          </SectionBlock>

          {/* Draw */}
          <SectionBlock icon="Dice" label="Monthly Draw" title="The draw explained"
            desc="At the end of each month, final scores are tallied. Top 10 scorers automatically qualify for cash prizes. Ties are broken by submission time.">
            <ol style={{marginTop:20,paddingLeft:20,color:"var(--muted)",lineHeight:2.2,fontSize:15}}>
              <li>Contest closes on the last day of the month</li>
              <li>Scores are verified and published on our public leaderboard</li>
              <li>Prizes are transferred within 5 business days</li>
              <li>Charity donations are processed in the same cycle</li>
            </ol>
          </SectionBlock>

          {/* Prize Tiers */}
          <SectionBlock icon="Trophy" label="Prize Tiers" title="What you can win">
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:16,marginTop:24}}>
              {[["1st","Rs.50,000","#FFF8E7","var(--gold)"],["2nd","Rs.25,000","#f8f8f8","#888"],["3rd","Rs.10,000","#fff3ee","#b86a3a"],["4-10th","Rs.2,500","var(--accent-light)","var(--accent)"]].map(([rank,prize,bg,col]) => (
                <div key={rank} style={{padding:"24px 20px",background:bg,borderRadius:12,textAlign:"center",border:"1px solid var(--border)"}}>
                  <div style={{fontSize:28,marginBottom:8}}>Medal</div>
                  <div style={{fontWeight:600,marginBottom:4}}>{rank}</div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:700,color:col}}>{prize}</div>
                </div>
              ))}
            </div>
          </SectionBlock>

          {/* Charity Model */}
          <SectionBlock icon="Heart" label="Charity Model" title="How charity donations work"
            desc="When you subscribe, you choose a charity. Each month, a percentage of your subscription goes directly to your chosen charity.">
            <div style={{
              background:"var(--accent-light)",borderRadius:12,
              padding:28,marginTop:24,
              display:"grid",gridTemplateColumns:"1fr 1fr",gap:20
            }}>
              {[["Monthly Rs.999","25-35% donated = Rs.250-350"],["Yearly Rs.9,999","35-42% donated = Rs.3,500-4,200"],["100% transparent","Public donation reports monthly"],["Charity verified","All partners are FCRA registered"]].map(([t,d]) => (
                <div key={t}>
                  <div style={{fontWeight:700,color:"var(--accent)",marginBottom:4}}>{t}</div>
                  <div style={{fontSize:14,color:"var(--muted)"}}>{d}</div>
                </div>
              ))}
            </div>
          </SectionBlock>

          {/* FAQ */}
          <div style={{maxWidth:640,margin:"0 auto"}}>
            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:700,textAlign:"center",marginBottom:28}}>Frequently Asked Questions</h3>
            {[
              ["Can I cancel anytime?","Yes. Cancel before your next billing date and you won&apos;t be charged."],
              ["How is the donation processed?","Donations are transferred directly to charity accounts at the end of each month with a public report."],
              ["Is TDS deducted on prizes?","Prizes above Rs.10,000 are subject to TDS as per Indian tax law. We handle deductions and provide certificates."],
              ["Can I change my charity?","Yes, you can change your chosen charity once per billing cycle from your dashboard."],
            ].map(([q,a]) => (
              <FAQItem key={q} q={q} a={a} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{background:"var(--ink)",textAlign:"center",color:"#fff"}}>
        <div className="container">
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:36,color:"#fff",marginBottom:16}}>Clear enough? Let&apos;s go.</h2>
          <button className="btn-primary" style={{fontSize:16,padding:"14px 36px"}} onClick={() => handleNavClick("/pricing")}>Join Now</button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
