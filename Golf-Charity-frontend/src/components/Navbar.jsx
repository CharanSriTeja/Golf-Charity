import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Home", path: "/" },
    { label: "How It Works", path: "/how-it-works" },
    { label: "Charities", path: "/charities" },
    { label: "Pricing", path: "/pricing" },
  ];

  const handleNavClick = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
    setMenuOpen(false);
  };

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
            <div className="nav-logo" onClick={() => handleNavClick("/")}>
              PlayGiveWin
            </div>
            <ul className="nav-links">
              {links.map(l => (
                <li
                  key={l.path}
                  className={location.pathname === l.path ? "active" : ""}
                  onClick={() => handleNavClick(l.path)}
                >{l.label}</li>
              ))}
            </ul>
            <div className="nav-cta">
              <Link to="/login" style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "var(--muted)",
                transition: "color 0.2s"
              }}>
                Sign In
              </Link>
              <Link to="/signup" className="btn-primary" style={{padding:"9px 20px",fontSize:"13px"}}>
                Sign Up
              </Link>
            </div>
            <button className="hamburger" onClick={() => setMenuOpen(m => !m)}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>
      <ul className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {links.map(l => (
          <li key={l.path} onClick={() => handleNavClick(l.path)}>{l.label}</li>
        ))}
        <li style={{ borderBottom: "none", paddingTop: "16px", display: "flex", gap: "12px" }}>
          <Link to="/login" className="btn-outline" style={{ padding: "10px 24px", fontSize: "14px", flex: 1, textAlign: "center" }} onClick={() => setMenuOpen(false)}>
            Sign In
          </Link>
          <Link to="/signup" className="btn-primary" style={{ padding: "10px 24px", fontSize: "14px", flex: 1, textAlign: "center" }} onClick={() => setMenuOpen(false)}>
            Sign Up
          </Link>
        </li>
      </ul>
    </>
  );
}
