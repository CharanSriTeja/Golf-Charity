import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

function PricingCard({ name, price, period, tag, features, cta, accent, note, onSubscribe }) {
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
        }} 
        onMouseEnter={e=>e.currentTarget.style.opacity="0.9"} 
        onMouseLeave={e=>e.currentTarget.style.opacity="1"}
      >
        {cta}
      </button>
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

export function PricingPage() {
  const navigate = useNavigate();
  const [billingYear, setBillingYear] = useState(false);

  const features = [
    "Monthly contest entry",
    "Choose your charity",
    "Public leaderboard access",
    "Monthly donation receipt",
    "Impact reports",
  ];
  const yearExtra = ["Priority draw entry (2x chances)", "Exclusive yearly winner badge", "Early access to special contests"];

  const handleSubscribe = (plan) => {
    navigate(`/checkout?plan=${plan}`);
  };

  return (
    <div style={{paddingTop:80}}>
      <Navbar />
      
      <section className="section" style={{background:"linear-gradient(160deg,#f0faf4,var(--bg))",paddingBottom:48}}>
        <div className="container" style={{textAlign:"center"}}>
          <div className="section-label">Plans</div>
          <h1 className="section-title" style={{fontSize:"clamp(32px,5vw,56px)"}}>Simple, honest pricing</h1>
          <p className="section-sub" style={{margin:"0 auto 32px"}}>No hidden fees. Cancel anytime. Every rupee counts.</p>

          <div style={{
            display:"inline-flex",alignItems:"center",gap:12,
            background:"var(--surface)",padding:"6px 8px",
            borderRadius:50,border:"1px solid var(--border)"
          }}>
            <button onClick={() => setBillingYear(false)} style={{
              padding:"9px 22px",borderRadius:50,border:"none",
              background: !billingYear ? "var(--accent)" : "transparent",
              color: !billingYear ? "#fff" : "var(--muted)",
              fontWeight:600,fontSize:14,cursor:"pointer",transition:"all 0.2s"
            }}>Monthly</button>
            <button onClick={() => setBillingYear(true)} style={{
              padding:"9px 22px",borderRadius:50,border:"none",
              background: billingYear ? "var(--accent)" : "transparent",
              color: billingYear ? "#fff" : "var(--muted)",
              fontWeight:600,fontSize:14,cursor:"pointer",transition:"all 0.2s",
              display:"flex",alignItems:"center",gap:8
            }}>
              Yearly
              <span style={{
                background:"var(--gold)",color:"#fff",
                fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:50
              }}>Save 17%</span>
            </button>
          </div>
        </div>
      </section>

      <section style={{padding:"0 0 80px"}}>
        <div className="container">
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:28,maxWidth:740,margin:"0 auto"}}>
            {/* Monthly */}
            <PricingCard
              name="Monthly"
              price="Rs.999"
              period="/month"
              tag={null}
              features={features}
              cta="Subscribe Monthly"
              accent={false}
              onSubscribe={() => handleSubscribe('monthly')}
            />
            {/* Yearly */}
            <PricingCard
              name="Yearly"
              price="Rs.9,999"
              period="/year"
              tag="Best value"
              features={[...features,...yearExtra]}
              cta="Subscribe Yearly"
              accent={true}
              note="That&apos;s Rs.833/mo - save Rs.1,989"
              onSubscribe={() => handleSubscribe('yearly')}
            />
          </div>

          {/* FAQ */}
          <div style={{maxWidth:640,margin:"60px auto 0"}}>
            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:700,textAlign:"center",marginBottom:28}}>FAQ</h3>
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
      
      <Footer />
    </div>
  );
}
