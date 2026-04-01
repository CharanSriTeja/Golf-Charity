import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function Navbar({ page }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Home", id: "home", path: "/" },
    { label: "How It Works", id: "how-it-works", path: "/how-it-works" },
    { label: "Charities", id: "charities", path: "/charities" },
    { label: "Pricing", id: "pricing", path: "/pricing" },
  ];

  const handleNav = (path) => {
    navigate(path);
    window.scrollTo(0,0);
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
        .nav-auth-link {
          font-size: 14px; font-weight: 600; color: var(--ink);
          cursor: pointer; transition: color 0.2s;
        }
        .nav-auth-link:hover { color: var(--accent); }
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
            <div className="nav-logo" onClick={() => handleNav("/")}>
              🎯 Play<span>Give</span>Win
            </div>
            <ul className="nav-links">
              {links.map(l => (
                <li
                  key={l.id}
                  className={page === l.id ? "active" : ""}
                  onClick={() => handleNav(l.path)}
                >{l.label}</li>
              ))}
            </ul>
            <div className="nav-cta">
              {isAuthenticated ? (
                <>
                  <button className="nav-auth-link" onClick={() => handleNav("/dashboard")}>
                    Dashboard
                  </button>
                  <button className="nav-auth-link" onClick={() => { logout(); handleNav("/"); }}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button className="nav-auth-link" onClick={() => handleNav("/login")}>
                    Log in
                  </button>
                  <button className="btn-primary" style={{padding:"9px 20px",fontSize:"13px"}}
                    onClick={() => handleNav("/signup")}>
                    Sign up
                  </button>
                </>
              )}
            </div>
            <button className="hamburger" onClick={() => setMenuOpen(m => !m)}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>
      <ul className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {links.map(l => (
          <li key={l.id} onClick={() => handleNav(l.path)}>{l.label}</li>
        ))}
        {isAuthenticated ? (
          <>
            <li onClick={() => handleNav("/dashboard")} style={{color: "var(--accent)", fontWeight: 700}}>Dashboard</li>
            <li onClick={() => { logout(); handleNav("/"); }}>Logout</li>
          </>
        ) : (
          <>
            <li onClick={() => handleNav("/login")}>Log in</li>
            <li onClick={() => handleNav("/signup")} style={{color: "var(--accent)", fontWeight: 700}}>Sign up</li>
          </>
        )}
      </ul>
    </>
  );
}
