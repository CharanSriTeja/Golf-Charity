import { useState, useEffect } from "react";

// ── GLOBAL STYLES ──────────────────────────────────────────────────────────
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #F9F6F1;
      --surface: #FFFFFF;
      --ink: #1A1A18;
      --muted: #6B6B60;
      --accent: #2D6A4F;
      --accent-light: #D8F3DC;
      --gold: #C9A84C;
      --gold-light: #FFF8E7;
      --border: #E8E4DC;
      --radius: 12px;
      --shadow: 0 2px 20px rgba(0,0,0,0.07);
    }

    html { scroll-behavior: smooth; }

    body {
      font-family: 'DM Sans', sans-serif;
      background: var(--bg);
      color: var(--ink);
      line-height: 1.6;
    }

    h1, h2, h3, h4 {
      font-family: 'Playfair Display', serif;
      line-height: 1.2;
    }

    a { text-decoration: none; color: inherit; }

    button {
      cursor: pointer;
      font-family: 'DM Sans', sans-serif;
      border: none;
      outline: none;
    }

    .btn-primary {
      background: var(--accent);
      color: #fff;
      padding: 12px 28px;
      border-radius: 50px;
      font-size: 15px;
      font-weight: 600;
      letter-spacing: 0.3px;
      transition: all 0.2s;
      display: inline-block;
      border: 2px solid var(--accent);
    }
    .btn-primary:hover { background: #1e4d38; border-color: #1e4d38; transform: translateY(-1px); }

    .btn-outline {
      background: transparent;
      color: var(--accent);
      padding: 12px 28px;
      border-radius: 50px;
      font-size: 15px;
      font-weight: 600;
      border: 2px solid var(--accent);
      transition: all 0.2s;
      display: inline-block;
    }
    .btn-outline:hover { background: var(--accent-light); transform: translateY(-1px); }

    .container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }

    .section { padding: 80px 0; }

    .section-label {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: var(--accent);
      margin-bottom: 12px;
    }

    .section-title {
      font-size: clamp(28px, 4vw, 42px);
      font-weight: 700;
      margin-bottom: 16px;
    }

    .section-sub {
      font-size: 17px;
      color: var(--muted);
      max-width: 560px;
      line-height: 1.7;
    }

    .tag {
      display: inline-block;
      background: var(--accent-light);
      color: var(--accent);
      font-size: 12px;
      font-weight: 600;
      padding: 4px 12px;
      border-radius: 50px;
      letter-spacing: 0.5px;
    }

    /* Fade-in animation */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .fade-up { animation: fadeUp 0.6s ease both; }
    .delay-1 { animation-delay: 0.1s; }
    .delay-2 { animation-delay: 0.2s; }
    .delay-3 { animation-delay: 0.3s; }
    .delay-4 { animation-delay: 0.4s; }
  `}</style>
);

// ── MOCK DATA ──────────────────────────────────────────────────────────────
const CHARITIES = [
  { id: 1, name: "Teach For India", category: "Education", desc: "Bridging the education gap by placing talented graduates in under-resourced schools.", impact: "12,000+ students impacted", pct: 40, color: "#E8F4FD", icon: "📚" },
  { id: 2, name: "Goonj", category: "Relief", desc: "Converting urban surplus into a development resource for rural India.", impact: "₹5Cr+ material distributed", pct: 35, color: "#FFF0F0", icon: "🤝" },
  { id: 3, name: "HelpAge India", category: "Elderly", desc: "Uplifting underprivileged elderly through healthcare, livelihood, and care programs.", impact: "3.2M+ elderly served", pct: 30, color: "#F0FFF4", icon: "❤️" },
  { id: 4, name: "iCall", category: "Mental Health", desc: "Providing affordable psycho-social support to students and professionals.", impact: "50,000+ counselling sessions", pct: 25, color: "#FFF8E7", icon: "🧠" },
  { id: 5, name: "Smile Foundation", category: "Children", desc: "Welfare of underprivileged children, youth, and women through education & healthcare.", impact: "1.5M+ lives touched", pct: 38, color: "#F5F0FF", icon: "😊" },
  { id: 6, name: "Akshaya Patra", category: "Hunger", desc: "Implementing mid-day meal programme to end classroom hunger across India.", impact: "2M+ meals daily", pct: 42, color: "#E8F8F0", icon: "🍱" },
];

const WINNERS = [
  { name: "Rahul M.", city: "Mumbai", prize: "₹50,000", month: "March 2026", charity: "Teach For India" },
  { name: "Priya S.", city: "Bangalore", prize: "₹25,000", month: "February 2026", charity: "Akshaya Patra" },
  { name: "Ankit R.", city: "Delhi", prize: "₹10,000", month: "January 2026", charity: "Goonj" },
];

// ── NAVBAR ─────────────────────────────────────────────────────────────────
function Navbar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Home", id: "home" },
    { label: "How It Works", id: "how-it-works" },
    { label: "Charities", id: "charities" },
    { label: "Pricing", id: "pricing" },
  ];

  return (
    <>
      <style>{`
        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          transition: all 0.3s;
          padding: 20px 0;
        }
        nav.scrolled {
          background: rgba(249,246,241,0.95);
          backdrop-filter: blur(12px);
          padding: 12px 0;
          box-shadow: 0 1px 24px rgba(0,0,0,0.07);
        }
        .nav-inner {
          display: flex; align-items: center; justify-content: space-between;
        }
        .nav-logo {
          font-family: 'Playfair Display', serif;
          font-size: 22px; font-weight: 900;
          color: var(--ink);
          display: flex; align-items: center; gap: 8px;
          cursor: pointer;
        }
        .nav-logo span { color: var(--accent); }
        .nav-links {
          display: flex; gap: 32px; list-style: none;
        }
        .nav-links li {
          font-size: 14px; font-weight: 500; color: var(--muted);
          cursor: pointer; transition: color 0.2s;
        }
        .nav-links li:hover, .nav-links li.active { color: var(--ink); }
        .nav-links li.active { font-weight: 600; }
        .nav-cta { display: flex; gap: 12px; align-items: center; }
        .hamburger {
          display: none; flex-direction: column; gap: 5px;
          background: none; padding: 4px; cursor: pointer;
        }
        .hamburger span {
          width: 22px; height: 2px; background: var(--ink);
          border-radius: 2px; transition: all 0.3s;
        }
        .mobile-menu {
          display: none;
          position: fixed; top: 64px; left: 0; right: 0;
          background: var(--surface); padding: 24px;
          box-shadow: var(--shadow); z-index: 99;
          flex-direction: column; gap: 16px;
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu li {
          list-style: none; font-size: 16px; font-weight: 500;
          padding: 8px 0; border-bottom: 1px solid var(--border);
          cursor: pointer; color: var(--muted);
        }
        @media (max-width: 768px) {
          .nav-links, .nav-cta { display: none; }
          .hamburger { display: flex; }
        }
      `}</style>
      <nav className={scrolled ? "scrolled" : ""}>
        <div className="container">
          <div className="nav-inner">
            <div className="nav-logo" onClick={() => { setPage("home"); window.scrollTo(0,0); }}>
              🎯 Play<span>Give</span>Win
            </div>
            <ul className="nav-links">
              {links.map(l => (
                <li
                  key={l.id}
                  className={page === l.id ? "active" : ""}
                  onClick={() => { setPage(l.id); window.scrollTo(0,0); setMenuOpen(false); }}
                >{l.label}</li>
              ))}
            </ul>
            <div className="nav-cta">
              <button className="btn-outline" style={{padding:"9px 20px",fontSize:"13px"}}
                onClick={() => { setPage("pricing"); window.scrollTo(0,0); }}>
                Subscribe
              </button>
            </div>
            <button className="hamburger" onClick={() => setMenuOpen(m => !m)}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>
      <ul className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {links.map(l => (
          <li key={l.id} onClick={() => { setPage(l.id); window.scrollTo(0,0); setMenuOpen(false); }}>{l.label}</li>
        ))}
      </ul>
    </>
  );
}

// ── HOME PAGE ──────────────────────────────────────────────────────────────
function HomePage({ setPage, setSelectedCharity }) {
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
          .hero-orb {
            position: absolute; border-radius: 50%;
            filter: blur(60px); opacity: 0.35; pointer-events: none;
          }
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
            <button className="btn-primary" onClick={() => { setPage("pricing"); window.scrollTo(0,0); }}>
              Start for ₹999/mo →
            </button>
            <button className="btn-outline" onClick={() => { setPage("how-it-works"); window.scrollTo(0,0); }}>
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
            <button className="btn-outline" onClick={() => { setPage("charities"); window.scrollTo(0,0); }}>
              View all →
            </button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:20}}>
            {CHARITIES.slice(0,3).map(c => (
              <CharityCard key={c.id} charity={c} onView={() => { setSelectedCharity(c); setPage("charity-detail"); window.scrollTo(0,0); }} />
            ))}
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
            {WINNERS.map((w,i) => (
              <div key={i} style={{
                padding:"28px 24px",
                border:"1px solid var(--border)",
                borderRadius:var_radius,
                background: i===0 ? "var(--gold-light)" : "var(--bg)",
                position:"relative"
              }}>
                {i===0 && <span className="tag" style={{position:"absolute",top:16,right:16,background:"var(--gold)",color:"#fff"}}>Latest</span>}
                <div style={{fontSize:32,marginBottom:10}}>🏅</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700}}>{w.name}</div>
                <div style={{color:"var(--muted)",fontSize:14,marginBottom:12}}>{w.city} · {w.month}</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:700,color:"var(--gold)",marginBottom:8}}>{w.prize}</div>
                <div style={{fontSize:13,color:"var(--muted)"}}>Charity: <span style={{color:"var(--accent)",fontWeight:600}}>{w.charity}</span></div>
              </div>
            ))}
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
            onClick={() => { setPage("pricing"); window.scrollTo(0,0); }}>
            Subscribe Now →
          </button>
        </div>
      </section>

      <Footer setPage={setPage} />
    </div>
  );
}

const var_radius = "var(--radius)";

// ── HOW IT WORKS PAGE ──────────────────────────────────────────────────────
function HowItWorksPage({ setPage }) {
  return (
    <div style={{paddingTop:80}}>
      <section className="section" style={{background:"linear-gradient(160deg,#f0faf4,var(--bg))"}}>
        <div className="container" style={{textAlign:"center"}}>
          <div className="section-label">The Full Picture</div>
          <h1 className="section-title fade-up" style={{fontSize:"clamp(36px,5vw,60px)"}}>How PlayGiveWin works</h1>
          <p className="section-sub fade-up delay-1" style={{margin:"0 auto"}}>
            From subscription to donation — a transparent, fair, and fun system.
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
                {i < arr.length-1 && <div style={{color:"var(--muted)",fontSize:20,padding:"0 8px"}}>→</div>}
              </div>
            ))}
          </div>

          {/* Scoring */}
          <SectionBlock
            icon="🎯" label="Scoring" title="How scoring works"
            desc="Each month we open a new contest with a set of match/event predictions. You earn points for accuracy."
          >
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:16,marginTop:24}}>
              {[["Exact score","5 pts"],["Correct result","3 pts"],["Correct margin","2 pts"],["Bonus streak","1–5 pts"]].map(([t,p]) => (
                <div key={t} style={{padding:"18px 20px",background:"var(--bg)",borderRadius:10,border:"1px solid var(--border)"}}>
                  <div style={{fontWeight:700,marginBottom:4}}>{t}</div>
                  <div style={{color:"var(--accent)",fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700}}>{p}</div>
                </div>
              ))}
            </div>
          </SectionBlock>

          {/* Draw */}
          <SectionBlock icon="🎲" label="Monthly Draw" title="The draw explained"
            desc="At the end of each month, final scores are tallied. Top 10 scorers automatically qualify for cash prizes. Ties are broken by submission time.">
            <ol style={{marginTop:20,paddingLeft:20,color:"var(--muted)",lineHeight:2.2,fontSize:15}}>
              <li>Contest closes on the last day of the month</li>
              <li>Scores are verified and published on our public leaderboard</li>
              <li>Prizes are transferred within 5 business days</li>
              <li>Charity donations are processed in the same cycle</li>
            </ol>
          </SectionBlock>

          {/* Prize Tiers */}
          <SectionBlock icon="🏆" label="Prize Tiers" title="What you can win">
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:16,marginTop:24}}>
              {[["🥇 1st","₹50,000","#FFF8E7","var(--gold)"],["🥈 2nd","₹25,000","#f8f8f8","#888"],["🥉 3rd","₹10,000","#fff3ee","#b86a3a"],["🎖️ 4–10th","₹2,500","var(--accent-light)","var(--accent)"]].map(([rank,prize,bg,col]) => (
                <div key={rank} style={{padding:"24px 20px",background:bg,borderRadius:12,textAlign:"center",border:"1px solid var(--border)"}}>
                  <div style={{fontSize:28,marginBottom:8}}>{rank.split(" ")[0]}</div>
                  <div style={{fontWeight:600,marginBottom:4}}>{rank.split(" ").slice(1).join(" ")}</div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:700,color:col}}>{prize}</div>
                </div>
              ))}
            </div>
          </SectionBlock>

          {/* Charity Model */}
          <SectionBlock icon="💚" label="Charity Model" title="How charity donations work"
            desc="When you subscribe, you choose a charity. Each month, a percentage of your subscription goes directly to your chosen charity.">
            <div style={{
              background:"var(--accent-light)",borderRadius:12,
              padding:28,marginTop:24,
              display:"grid",gridTemplateColumns:"1fr 1fr",gap:20
            }}>
              {[["Monthly ₹999","25–35% donated = ₹250–350"],["Yearly ₹9,999","35–42% donated = ₹3,500–4,200"],["100% transparent","Public donation reports monthly"],["Charity verified","All partners are FCRA registered"]].map(([t,d]) => (
                <div key={t}>
                  <div style={{fontWeight:700,color:"var(--accent)",marginBottom:4}}>{t}</div>
                  <div style={{fontSize:14,color:"var(--muted)"}}>{d}</div>
                </div>
              ))}
            </div>
          </SectionBlock>
        </div>
      </section>

      <section className="section" style={{background:"var(--ink)",textAlign:"center",color:"#fff"}}>
        <div className="container">
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:36,color:"#fff",marginBottom:16}}>Clear enough? Let's go.</h2>
          <button className="btn-primary" style={{fontSize:16,padding:"14px 36px"}} onClick={() => { setPage("pricing"); window.scrollTo(0,0); }}>Join Now →</button>
        </div>
      </section>

      <Footer setPage={setPage} />
    </div>
  );
}

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

// ── CHARITIES PAGE ─────────────────────────────────────────────────────────
function CharitiesPage({ setPage, setSelectedCharity }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(CHARITIES.map(c => c.category)))];
  const filtered = CHARITIES.filter(c =>
    (filter === "All" || c.category === filter) &&
    (c.name.toLowerCase().includes(search.toLowerCase()) || c.desc.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{paddingTop:80}}>
      <section className="section" style={{background:"linear-gradient(160deg,#f0faf4,var(--bg))",paddingBottom:40}}>
        <div className="container">
          <div className="section-label">Our Partners</div>
          <h1 className="section-title">Our charities</h1>
          <p className="section-sub">Every subscription supports one of these verified, impactful organisations.</p>
        </div>
      </section>

      <section style={{padding:"32px 0 60px"}}>
        <div className="container">
          <div style={{display:"flex",gap:16,marginBottom:32,flexWrap:"wrap",alignItems:"center"}}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search charities..."
              style={{
                flex:1, minWidth:200, padding:"12px 18px",
                borderRadius:50, border:"1px solid var(--border)",
                fontSize:14, background:"var(--surface)",
                fontFamily:"'DM Sans',sans-serif", outline:"none"
              }}
            />
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {categories.map(cat => (
                <button key={cat}
                  onClick={() => setFilter(cat)}
                  style={{
                    padding:"9px 18px", borderRadius:50, fontSize:13, fontWeight:500,
                    background: filter===cat ? "var(--accent)" : "var(--surface)",
                    color: filter===cat ? "#fff" : "var(--muted)",
                    border:"1px solid", borderColor: filter===cat ? "var(--accent)" : "var(--border)",
                    cursor:"pointer", transition:"all 0.2s"
                  }}>{cat}</button>
              ))}
            </div>
          </div>
          <div style={{marginBottom:16,fontSize:14,color:"var(--muted)"}}>
            Showing {filtered.length} of {CHARITIES.length} charities
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:20}}>
            {filtered.map(c => (
              <CharityCard key={c.id} charity={c}
                onView={() => { setSelectedCharity(c); setPage("charity-detail"); window.scrollTo(0,0); }} />
            ))}
            {filtered.length === 0 && (
              <div style={{gridColumn:"1/-1",textAlign:"center",padding:60,color:"var(--muted)"}}>
                No charities match your search.
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer setPage={setPage} />
    </div>
  );
}

function CharityCard({ charity: c, onView }) {
  return (
    <div style={{
      background:"var(--surface)", borderRadius:var_radius,
      border:"1px solid var(--border)", overflow:"hidden",
      transition:"box-shadow 0.2s, transform 0.2s",
      cursor:"pointer"
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow="var(--shadow)"; e.currentTarget.style.transform="translateY(-4px)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow="none"; e.currentTarget.style.transform="none"; }}
    >
      <div style={{background:c.color,height:100,display:"flex",alignItems:"center",justifyContent:"center",fontSize:48}}>
        {c.icon}
      </div>
      <div style={{padding:"20px 22px 22px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
          <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700}}>{c.name}</h3>
          <span className="tag">{c.category}</span>
        </div>
        <p style={{fontSize:14,color:"var(--muted)",lineHeight:1.6,marginBottom:16}}>{c.desc}</p>
        <div style={{
          display:"flex",justifyContent:"space-between",alignItems:"center",
          padding:"10px 14px",background:"var(--accent-light)",borderRadius:8,marginBottom:16
        }}>
          <span style={{fontSize:13,color:"var(--accent)",fontWeight:600}}>Donation %</span>
          <span style={{fontFamily:"'Playfair Display',serif",fontWeight:700,color:"var(--accent)",fontSize:18}}>{c.pct}%</span>
        </div>
        <div style={{fontSize:13,color:"var(--muted)",marginBottom:16}}>📊 {c.impact}</div>
        <div style={{display:"flex",gap:10}}>
          <button className="btn-primary" style={{flex:1,textAlign:"center",padding:"9px 0",fontSize:13}} onClick={onView}>
            Learn more
          </button>
          <button className="btn-outline" style={{flex:1,textAlign:"center",padding:"9px 0",fontSize:13}}>
            Donate
          </button>
        </div>
      </div>
    </div>
  );
}

// ── CHARITY DETAIL PAGE ────────────────────────────────────────────────────
function CharityDetailPage({ charity, setPage }) {
  if (!charity) {
    return (
      <div style={{paddingTop:120,textAlign:"center"}}>
        <p>No charity selected.</p>
        <button className="btn-primary" style={{marginTop:20}} onClick={() => { setPage("charities"); window.scrollTo(0,0); }}>
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
          }} onClick={() => { setPage("charities"); window.scrollTo(0,0); }}>
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
      <Footer setPage={setPage} />
    </div>
  );
}

// ── PRICING PAGE ───────────────────────────────────────────────────────────
function PricingPage({ setPage }) {
  const [billingYear, setBillingYear] = useState(false);

  const features = [
    "Monthly contest entry",
    "Choose your charity",
    "Public leaderboard access",
    "Monthly donation receipt",
    "Impact reports",
  ];
  const yearExtra = ["Priority draw entry (2x chances)", "Exclusive yearly winner badge", "Early access to special contests"];

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
      <Footer setPage={setPage} />
    </div>
  );
}

function PricingCard({ name, price, period, tag, features, cta, accent, note }) {
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
      <button style={{
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

function FAQItem({ q, a }) {
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

// ── FOOTER ─────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer style={{background:"var(--ink)",color:"#aaa",padding:"48px 0 28px"}}>
      <div className="container">
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:40,marginBottom:40}}>
          <div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:900,color:"#fff",marginBottom:12}}>
              🎯 PlayGiveWin
            </div>
            <p style={{fontSize:14,lineHeight:1.7,maxWidth:300}}>Play score prediction contests, win real prizes, and automatically support verified charities across India.</p>
          </div>
          <div>
            <div style={{color:"#fff",fontWeight:600,marginBottom:14,fontSize:13,letterSpacing:"1px",textTransform:"uppercase"}}>Pages</div>
            {[["Home","home"],["How It Works","how-it-works"],["Charities","charities"],["Pricing","pricing"]].map(([l,id]) => (
              <div key={id} style={{marginBottom:8}}>
                <span style={{cursor:"pointer",fontSize:14,transition:"color 0.2s"}}
                  onMouseEnter={e=>e.currentTarget.style.color="#fff"}
                  onMouseLeave={e=>e.currentTarget.style.color="#aaa"}
                  onClick={() => { setPage(id); window.scrollTo(0,0); }}>{l}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{color:"#fff",fontWeight:600,marginBottom:14,fontSize:13,letterSpacing:"1px",textTransform:"uppercase"}}>Legal</div>
            {["Privacy Policy","Terms of Use","Refund Policy","Cookie Policy"].map(l => (
              <div key={l} style={{marginBottom:8,fontSize:14,cursor:"pointer"}}>{l}</div>
            ))}
          </div>
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,0.08)",paddingTop:20,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
          <span style={{fontSize:13}}>© 2026 PlayGiveWin. All rights reserved.</span>
          <span style={{fontSize:13}}>Made with 💚 for India</span>
        </div>
      </div>
    </footer>
  );
}

// ── APP ROOT ───────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [selectedCharity, setSelectedCharity] = useState(null);

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage setPage={setPage} setSelectedCharity={setSelectedCharity} />;
      case "how-it-works": return <HowItWorksPage setPage={setPage} />;
      case "charities": return <CharitiesPage setPage={setPage} setSelectedCharity={setSelectedCharity} />;
      case "charity-detail": return <CharityDetailPage charity={selectedCharity} setPage={setPage} />;
      case "pricing": return <PricingPage setPage={setPage} />;
      default: return <HomePage setPage={setPage} setSelectedCharity={setSelectedCharity} />;
    }
  };

  return (
    <>
      <GlobalStyle />
      <Navbar page={page} setPage={setPage} />
      {renderPage()}
    </>
  );
}