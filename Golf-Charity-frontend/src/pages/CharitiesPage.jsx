import React, { useState, useEffect } from "react";
import { Footer } from "../components/Footer";
import { CharityCard } from "../components/CharityCard";
import { charitiesAPI } from "../api/charities";

export function CharitiesPage() {
  const [charities, setCharities] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    charitiesAPI.getAll()
      .then(res => setCharities(res.data.charities || []))
      .catch(console.error);
  }, []);

  const categories = ["All", ...Array.from(new Set(charities.map(c => c.category).filter(Boolean)))];
  const filtered = charities.filter(c =>
    (filter === "All" || c.category === filter) &&
    (
      (c.name && c.name.toLowerCase().includes(search.toLowerCase())) || 
      (c.desc && c.desc.toLowerCase().includes(search.toLowerCase()))
    )
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
            Showing {filtered.length} of {charities.length} charities
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:20}}>
            {filtered.map(c => (
              <CharityCard key={c._id || c.id} charity={c} />
            ))}
            {filtered.length === 0 && (
              <div style={{gridColumn:"1/-1",textAlign:"center",padding:60,color:"var(--muted)"}}>
                {charities.length === 0 ? "Loading charities from server..." : "No charities match your search."}
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
