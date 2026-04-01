import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { PricingCard } from "../components/PricingCard";
import { FAQItem } from "../components/FAQItem";

export function PricingPage() {
  const [billingYear, setBillingYear] = useState(false);
  const navigate = useNavigate();

  const features = [
    "Monthly contest entry",
    "Choose your charity",
    "Public leaderboard access",
    "Monthly donation receipt",
    "Impact reports",
  ];
  const yearExtra = ["Priority draw entry (2x chances)", "Exclusive yearly winner badge", "Early access to special contests"];

  const handleSubscribe = () => {
    navigate("/checkout");
    window.scrollTo(0, 0);
  };

  return (
    <div style={{paddingTop:80}}>
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
              price="₹999"
              period="/month"
              tag={null}
              features={features}
              cta="Subscribe Monthly"
              accent={false}
              onSubscribe={handleSubscribe}
            />
            {/* Yearly */}
            <PricingCard
              name="Yearly"
              price="₹9,999"
              period="/year"
              tag="Best value"
              features={[...features,...yearExtra]}
              cta="Subscribe Yearly"
              accent={true}
              note="That's ₹833/mo — save ₹1,989"
              onSubscribe={handleSubscribe}
            />
          </div>

          {/* FAQ */}
          <div style={{maxWidth:640,margin:"60px auto 0"}}>
            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:700,textAlign:"center",marginBottom:28}}>FAQ</h3>
            {[
              ["Can I cancel anytime?","Yes. Cancel before your next billing date and you won't be charged."],
              ["How is the donation processed?","Donations are transferred directly to charity accounts at the end of each month with a public report."],
              ["Is TDS deducted on prizes?","Prizes above ₹10,000 are subject to TDS as per Indian tax law. We handle deductions and provide certificates."],
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
