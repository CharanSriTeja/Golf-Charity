export const GlobalStyle = () => (
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
