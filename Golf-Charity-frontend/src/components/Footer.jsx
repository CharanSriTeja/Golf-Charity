import { useNavigate } from "react-router-dom";

export function Footer() {
  const navigate = useNavigate();

  const handleNavClick = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <footer style={{background:"var(--ink)",color:"#aaa",padding:"48px 0 28px"}}>
      <div className="container">
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:40,marginBottom:40}}>
          <div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:900,color:"#fff",marginBottom:12}}>
              PlayGiveWin
            </div>
            <p style={{fontSize:14,lineHeight:1.7,maxWidth:300}}>Play score prediction contests, win real prizes, and automatically support verified charities across India.</p>
          </div>
          <div>
            <div style={{color:"#fff",fontWeight:600,marginBottom:14,fontSize:13,letterSpacing:"1px",textTransform:"uppercase"}}>Pages</div>
            {[["Home","/"],["How It Works","/how-it-works"],["Charities","/charities"],["Pricing","/pricing"]].map(([l,path]) => (
              <div key={path} style={{marginBottom:8}}>
                <span style={{cursor:"pointer",fontSize:14,transition:"color 0.2s"}}
                  onMouseEnter={e=>e.currentTarget.style.color="#fff"}
                  onMouseLeave={e=>e.currentTarget.style.color="#aaa"}
                  onClick={() => handleNavClick(path)}>{l}</span>
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
          <span style={{fontSize:13}}>Made with love for India</span>
        </div>
      </div>
    </footer>
  );
}
