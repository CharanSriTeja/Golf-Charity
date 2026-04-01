import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { CharityCard } from "../components/CharityCard";
import { charitiesAPI } from "../api/charities";

export function CharitiesPage() {
  const navigate = useNavigate();
  const [charities, setCharities] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharities = async () => {
      try {
        const response = await charitiesAPI.getAll();
        if (response.data?.charities) {
          setCharities(response.data.charities);
          // Extract unique categories
          const cats = ["All", ...new Set(response.data.charities.map(c => c.category).filter(Boolean))];
          setCategories(cats);
        }
      } catch (error) {
        console.error("Error fetching charities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharities();
  }, []);

  const filtered = charities.filter(c =>
    (filter === "All" || c.category === filter) &&
    (c.name?.toLowerCase().includes(search.toLowerCase()) || 
     c.description?.toLowerCase().includes(search.toLowerCase()))
  );

  const handleCharityView = (charity) => {
    navigate(`/charities/${charity._id || charity.id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div style={{paddingTop:80}}>
      <Navbar />
      
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
          
          {loading ? (
            <div style={{textAlign:"center",padding:60,color:"var(--muted)"}}>Loading charities...</div>
          ) : (
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:20}}>
              {filtered.map(c => (
                <CharityCard key={c._id || c.id} charity={c} onView={() => handleCharityView(c)} />
              ))}
              {filtered.length === 0 && (
                <div style={{gridColumn:"1/-1",textAlign:"center",padding:60,color:"var(--muted)"}}>
                  No charities match your search.
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
