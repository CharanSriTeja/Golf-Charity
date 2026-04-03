import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { CharityCard } from "../components/CharityCard";
import { charitiesAPI } from "../api/charities";
import { drawsAPI } from "../api/draws";

export function HomePage({ setSelectedCharity }) {
  const navigate = useNavigate();
  const [charities, setCharities] = useState([]);
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    charitiesAPI.getAll()
      .then(res => setCharities(res.data.charities || []))
      .catch(console.error);
    
    drawsAPI.getHistory()
      .then(res => {
        const historyData = res.data.draws || res.data || [];
        // Extract winners from history draws
        const extractedWinners = historyData.flatMap(draw => draw.winners || []);
        setWinners(extractedWinners);
      })
      .catch(console.error);
  }, []);

  const handleNav = (path) => {
    navigate(path);
    window.scrollTo(0,0);
  };

  return (
    <div style={{paddingTop: 80}}>

      {/* Hero */}
      <section style={{
        minHeight: "92vh", display: "flex", alignItems: "center",
        background: "linear-gradient(160deg, #f0faf4 0%, #F9F6F1 50%, #FFF8E7 100%)",
        position: "relative", overflow: "hidden"
      }}>
        <style>{`
          .hero-badge {
            display: inline-flex; align-items: center; gap: 8px;
            background: var(--surface); border: 1px solid var(--border);
            padding: 8px 16px; border-radius: 50px;
            font-size: 13px; font-weight: 500; color: var(--muted);
            margin-bottom: 28px; box-shadow: var(--shadow);
          }
          .hero-title {
            font-size: clamp(48px, 7vw, 88px);
            font-weight: 900; line-height: 1.0;
            margin-bottom: 24px;
          }
          .hero-title em { font-style: italic; color: var(--accent); }
          .hero-sub {
            font-size: 18px; color: var(--muted); max-width: 520px;
            line-height: 1.75; margin-bottom: 36px;
          }
          .hero-actions { display: flex; gap: 16px; flex-wrap: wrap; }
          .hero-stats {
            display: flex; gap: 40px; margin-top: 56px; flex-wrap: wrap;
          }
          .hero-stat-num {
            font-family: 'Playfair Display', serif;
            font-size: 32px; font-weight: 700; color: var(--ink);
          }
          .hero-stat-label { font-size: 13px; color: var(--muted); margin-top: 2px; }
        `}</style>
        <div style={{
          position:"absolute",top:"-80px",right:"-80px",
          width:"500px",height:"500px",
          background:"radial-gradient(circle, #D8F3DC, transparent)",
          borderRadius:"50%", opacity:0.6
        }}/>
        <div style={{
          position:"absolute",bottom:"-60px",left:"10%",
          width:"300px",height:"300px",
          background:"radial-gradient(circle, #FFF8E7, transparent)",
          borderRadius:"50%", opacity:0.8
        }}/>
        <div className="container">
          <div className="fade-up">
            <div className="hero-badge">
              <span>🏆</span> India's first play-to-give platform
            </div>
          </div>
          <h1 className="hero-title fade-up delay-1">
            Play.<br /><em>Win.</em><br />Give.
          </h1>
          <p className="hero-sub fade-up delay-2">
            Enter monthly score-prediction contests, win real cash prizes,
            and automatically donate a portion to the charity of your choice.
            Everyone benefits.
          </p>
          <div className="hero-actions fade-up delay-3">
            <button className="btn-primary" onClick={() => handleNav("/pricing")}>
              Start for ₹999/mo →
            </button>
            <button className="btn-outline" onClick={() => handleNav("/how-it-works")}>
              See how it works
            </button>
          </div>
          <div className="hero-stats fade-up delay-4">
            {[["₹12L+","Prizes awarded"],["6","Partner charities"],["2,400+","Active players"]].map(([n,l]) => (
              <div key={l}>
                <div className="hero-stat-num">{n}</div>
                <div className="hero-stat-label">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works — 3 Steps */}
      <section className="section" style={{background: "var(--surface)"}}>
        <div className="container">
          <div style={{textAlign:"center", marginBottom: 56}}>
            <div className="section-label">The Process</div>
            <h2 className="section-title">Three simple steps</h2>
            <p className="section-sub" style={{margin:"0 auto"}}>No complicated rules. Just subscribe, play, and make an impact.</p>
          </div>
          <style>{`
            .steps-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
              gap: 28px;
            }
            .step-card {
              padding: 36px 28px;
              border: 1px solid var(--border);
              border-radius: var(--radius);
              position: relative;
              transition: box-shadow 0.2s, transform 0.2s;
            }
            .step-card:hover { box-shadow: var(--shadow); transform: translateY(-4px); }
            .step-num {
              font-family: 'Playfair Display', serif;
              font-size: 64px; font-weight: 900;
              color: var(--border); line-height: 1;
              margin-bottom: 16px;
            }
            .step-title { font-size: 20px; font-weight: 700; margin-bottom: 10px; }
            .step-desc { font-size: 15px; color: var(--muted); line-height: 1.7; }
          `}</style>
          <div className="steps-grid">
            {[
              ["01","Subscribe","Pick a monthly or yearly plan to unlock your contest entry and pick your chosen charity.","🔑"],
              ["02","Predict & Score","Each month, predict match/event scores. Points are tallied on our transparent scoring system.","🎯"],
              ["03","Win & Give","Top scorers win cash prizes. 30–42% of all subscription revenue goes directly to charities.","🏆"],
            ].map(([n,t,d,ic]) => (
              <div className="step-card" key={n}>
                <div className="step-num">{n}</div>
                <div style={{fontSize:28, marginBottom:10}}>{ic}</div>
                <div className="step-title">{t}</div>
                <div className="step-desc">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prize Explanation */}
      <section className="section" style={{background:"var(--gold-light)"}}>
        <div className="container">
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"center"}}>
            <div>
              <div className="section-label" style={{color:"var(--gold)"}}>Prize Pool</div>
              <h2 className="section-title">Real money,<br/>every month</h2>
              <p className="section-sub">Every subscription contributes to the monthly prize pool. The top scorers take home real cash — no gimmicks.</p>
              <div style={{display:"flex",flexDirection:"column",gap:12,marginTop:28}}>
                {[["🥇 1st Place","₹50,000"],["🥈 2nd Place","₹25,000"],["🥉 3rd Place","₹10,000"],["🎖️ 4th–10th","₹2,500 each"]].map(([t,p]) => (
                  <div key={t} style={{
                    display:"flex",justifyContent:"space-between",alignItems:"center",
                    padding:"14px 20px", background:"var(--surface)",
                    borderRadius:10, border:"1px solid var(--border)"
                  }}>
                    <span style={{fontWeight:500}}>{t}</span>
                    <span style={{fontFamily:"'Playfair Display',serif",fontWeight:700,color:"var(--gold)",fontSize:18}}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{
              background:"var(--surface)", borderRadius:16, padding:40,
              boxShadow:"0 4px 40px rgba(0,0,0,0.08)", textAlign:"center"
            }}>
              <div style={{fontSize:60, marginBottom:16}}>🏆</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:48,fontWeight:900,color:"var(--gold)"}}>₹1,07,500</div>
              <div style={{color:"var(--muted)",marginTop:8,marginBottom:24}}>Total monthly prize pool</div>
              <div style={{background:"var(--accent-light)",borderRadius:10,padding:"16px 20px"}}>
                <div style={{fontSize:13,color:"var(--accent)",fontWeight:600,marginBottom:4}}>🌱 Charity Contribution</div>
                <div style={{fontSize:28,fontFamily:"'Playfair Display',serif",fontWeight:700,color:"var(--accent)"}}>₹3,00,000+</div>
                <div style={{fontSize:13,color:"var(--muted)",marginTop:4}}>donated to charities this month</div>
              </div>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){.prize-grid{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* Charity Impact */}
      <section className="section" style={{background:"var(--accent)",color:"#fff"}}>
        <div className="container" style={{textAlign:"center"}}>
          <div className="section-label" style={{color:"#a8d5b8"}}>Our Impact</div>
          <h2 className="section-title" style={{color:"#fff",marginBottom:16}}>Play fuels real change</h2>
          <p style={{color:"#b7dfc5",fontSize:17,maxWidth:520,margin:"0 auto 48px"}}>
            Every rupee you subscribe sends a portion to life-changing causes across India.
          </p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:24}}>
            {[["₹45L+","Donated to date"],["6","Active charities"],["18,000+","Lives impacted"],["40%","Max donation %"]].map(([n,l]) => (
              <div key={l} style={{
                background:"rgba(255,255,255,0.1)", borderRadius:12,
                padding:"28px 20px", backdropFilter:"blur(8px)",
                border:"1px solid rgba(255,255,255,0.15)"
              }}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:40,fontWeight:700,marginBottom:6}}>{n}</div>
                <div style={{color:"#b7dfc5",fontSize:14}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Charities */}
      <section className="section">
        <div className="container">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:40,flexWrap:"wrap",gap:16}}>
            <div>
              <div className="section-label">Partners</div>
              <h2 className="section-title">Featured charities</h2>
            </div>
            <button className="btn-outline" onClick={() => handleNav("/charities")}>
              View all →
            </button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:20}}>
            {charities.length > 0 ? charities.slice(0,3).map(c => (
              <CharityCard key={c._id || c.id} charity={c} />
            )) : <div style={{color:"var(--muted)"}}>Loading live charities...</div>}
          </div>
        </div>
      </section>

      {/* Latest Winners */}
      <section className="section" style={{background:"var(--surface)"}}>
        <div className="container">
          <div style={{textAlign:"center",marginBottom:48}}>
            <div className="section-label">Wall of Fame</div>
            <h2 className="section-title">Latest winners</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:20}}>
            {winners.length > 0 ? winners.slice(0,3).map((w,i) => (
              <div key={i} style={{
                padding:"28px 24px",
                border:"1px solid var(--border)",
                borderRadius:"var(--radius)",
                background: i===0 ? "var(--gold-light)" : "var(--bg)",
                position:"relative"
              }}>
                {i===0 && <span className="tag" style={{position:"absolute",top:16,right:16,background:"var(--gold)",color:"#fff"}}>Latest</span>}
                <div style={{fontSize:32,marginBottom:10}}>🏅</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700}}>{w.name || w.user?.name || "Player"}</div>
                <div style={{color:"var(--muted)",fontSize:14,marginBottom:12}}>{w.city || "India"} · {w.month || "Recent Draw"}</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:700,color:"var(--gold)",marginBottom:8}}>₹{w.prize || "2,500"}</div>
                <div style={{fontSize:13,color:"var(--muted)"}}>Charity: <span style={{color:"var(--accent)",fontWeight:600}}>{w.charity || "Partner Charity"}</span></div>
              </div>
            )) : (
              <div style={{color:"var(--muted)", textAlign:"center", gridColumn:"1/-1"}}>
                Waiting for the first draw results to be published!
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Subscribe */}
      <section className="section" style={{background:"var(--ink)",color:"#fff",textAlign:"center"}}>
        <div className="container">
          <div style={{fontSize:48,marginBottom:20}}>🎯</div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,4vw,48px)",color:"#fff",marginBottom:16}}>
            Ready to play for good?
          </h2>
          <p style={{color:"#aaa",fontSize:17,maxWidth:480,margin:"0 auto 36px",lineHeight:1.7}}>
            Join 2,400+ players making an impact every month. Start for just ₹999.
          </p>
          <button className="btn-primary" style={{fontSize:16,padding:"14px 36px"}}
            onClick={() => handleNav("/pricing")}>
            Subscribe Now →
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
